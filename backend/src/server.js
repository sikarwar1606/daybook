import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js'
import income from './routes/handleIncome.js'
import expences from './routes/handleExpences.js'
import jar from './routes/handleJar.js'
import getIncome from './routes/getAllData.js'
import setData from './routes/setAllData.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', income)
app.use('/api', expences)
app.use('/api', getIncome)
app.use('/api', setData)
app.use('/api', jar)


// ---------- 5. START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
