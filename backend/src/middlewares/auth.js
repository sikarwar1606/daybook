import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;


export const authMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization; // expects "Bearer <token>"
  console.log('Authorization header:', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // throws if invalid/expired
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

