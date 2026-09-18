import 'dotenv/config';
import express from 'express'; 
import {Pool} from 'pg';
import {Router} from 'express';
import pool from "../models/dbConnection.js"

const router = Router();

// const pool = new Pool({
//     connectionString: process.env.DB_CONNECTION_STRING,
//     ssl: { rejectUnauthorized: false }
// });

router.get('/aggregate/income/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) as total FROM monthly_income WHERE user_id = $1`,
            [user_id]
        );
        res.status(200).json({ total: result.rows[0].total });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch total income" });
    }
});

router.get('/aggregate/expences/:user_id', async (req, res)=>{
    const {user_id} = req.params;
    try{
        const result = await pool.query(
            `SELECT COALESCE(SUM(amount),0) as total FROM monthly_expences WHERE user_id = $1`,[user_id]
        );
        res.status(200).json({total:result.rows[0].total});
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Failed to fetch total income"})
    }
});

router.get('/aggregate/jar_category/:user_id', async (req,res)=>{
    const {user_id} = req.params;
    
    try{
        const result = await pool.query(
            `SELECT * FROM jar_category where user_id = $1`,[user_id]
        );
        res.status(200).json({goals:result.rows})
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch Jar categories"});
    }
})

router.get('/aggregate/saving/:user_id', async(req,res)=>{
    const {user_id} = req.params;
    try{
        const result = await pool.query(
            `SELECT COALESCE(SUM(saving),0) as  saving from monthly_savings where user_id = $1`,[user_id]
        );

        const saving = result.rows[0].saving;
        res.status(200).json(saving);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Cann't fetch the saving"});
    }

})

router.get('/aggregate/leaderboard', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT us.user_id, us.avatar_url, us.nick_name, COALESCE(SUM(ms.saving), 0) AS total_savings
            FROM users AS us
            LEFT JOIN monthly_savings AS ms ON us.user_id = ms.user_id
            GROUP BY us.user_id, us.nick_name
            ORDER BY total_savings DESC
        `);
        res.status(200).json({ leaderboard: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});



export default router