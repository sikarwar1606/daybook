import {Router} from "express"
import 'dotenv/config'
import {Pool} from 'pg';

const router = Router();
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

router.post('/expences/category', async (req, res)=>{
    const {user_id, name} = req.body;
    try{
        const result = await pool.query(
            `INSERT INTO expences_categories(user_id, name)
            values ($1,$2)
            ON CONFLICT (user_id, name) DO NOTHING
            RETURNING *`,
            [user_id, name]
        );
        res.status(200).json(result.rows[0]);
    }catch (err){
        console.error(err);
        res.status(500).json({error:"Failed to add category"})
    }
});


router.delete('/expences/category/:category_id', async (req, res) => {
    const { category_id } = req.params;
    try {
        await pool.query(`DELETE FROM expences_categories WHERE category_id = $1`, [category_id]);
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete category" });
    }
});

router.post('/expences', async(req, res)=>{
    const {user_id, expences} = req.body;

    try{
        await pool.query(`DELETE FROM monthly_expences WHERE user_id = $1`, [user_id]);
        const insertPromises = expences
        .filter(entry => entry.amount !== "" && entry.amount != null)
        .map(entry => pool.query(
            `INSERT INTO monthly_expences(user_id, category_id, amount)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [user_id, entry.category_id, entry.amount]
            )
        )   
        const results = await Promise.all(insertPromises);
        res.status(200).json(results.map(r=>r.rows[0]));
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to save expences"})
    }

    
})


router.get('/expences/:user_id', async(req,res)=>{
    const {user_id} = req.params;

    try{
        const result = await pool.query(
            `SELECT c.category_id, c.name, COALESCE(m.amount, 0) 
            AS amount FROM expences_categories c
            LEFT JOIN monthly_expences m
            ON c.category_id = m.category_id 
            AND m.user_id = c.user_id
            WHERE c.user_id = $1
            ORDER BY c.created_at`,
            [user_id]
        );

        res.status(200).json({income:result.rows})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to fetch income"});
    }
})

export default router