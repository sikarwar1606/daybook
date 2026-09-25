import 'dotenv/config';
import express from "express";
import {Router} from "express";
import pool from "../models/dbConnection.js"
const router = Router();
const lastSync = new Map();
const LOCK = 24*60*60*1000;

router.post('/setData/savings', async (req, res) => {
    const { user_id, month, saving } = req.body;

    const last = lastSync.get(user_id);
    if(last && Date.now() - last< LOCK){
        return res.status(429).json({error:"Already synced. Try again later"});
    }
    try {
        const result = await pool.query(
            `INSERT INTO monthly_savings (user_id, month, saving)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id, month)
             DO UPDATE SET
               saving = EXCLUDED.saving,
               updated_at = NOW()
             WHERE monthly_savings != EXCLUDED.saving,
             RETURNING *`,
            [user_id, month, saving]
        );
        lastSync.set(user_id, Date.now()); // Lock for 24 hours
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});  




export default router