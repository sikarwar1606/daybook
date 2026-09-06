// ============================================================
// PERN AUTH - single-file backend (Google Sign-In)
// Everything lives here for now: DB connection, routes, JWT logic.
//
// Flow: Frontend gets an ID token from Google
//       -> sends it to POST /api/auth/google
//       -> we verify that token really came from Google
//       -> we find or create a user with that email
//       -> we issue OUR OWN JWT so the frontend can stay "logged in"
//       -> /me is a protected route that reads that JWT
// ============================================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);


// ---------- 5. START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
