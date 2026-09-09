import {Router} from 'express';
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import {OAuth2Client} from 'google-auth-library';
const router = Router()

//Importing the middlewares
import {authMiddleware} from '../middlewares/auth.js'



import {pool} from '../models/dbConnection.js'//Loading the DB connection
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);


router.post('/google', async (req, res) => {
  const { credential } = await req.body; // this is the Google ID token (a JWT from Google)

  if (!credential) {
    return res.status(400).json({ error: 'Missing Google credential' });
  }else{
    console.log(credential)
  }

  try {
    // ---- verify the token is genuinely issued by Google for OUR app ----
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // payload contains: sub (Google's unique user id), email, name, picture, etc.

    const { sub: googleId, email, name, picture } = payload;

    // ---- find existing user, or create a new one ----
    let result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);

    let user;
    if (result.rows.length > 0) {
      user = result.rows[0];
    } else {
      const insertResult = await pool.query(
        'INSERT INTO users (google_id, username, email, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [googleId, name, email, picture]
      );
      user = insertResult.rows[0];
    }

    // ---- issue OUR OWN session token (don't reuse Google's token) ----
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '365d' });

    res.json({
      user: { id: user.id, username: user.username, email: user.email, avatarUrl: user.avatar_url },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Google authentication failed' });
  }
});

// ---------- 4. PROTECTED ROUTE: get current logged-in user ----------
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, avatar_url, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

