import {Router} from "express"
import 'dotenv/config'
import {Pool} from 'pg';

const router = Router();
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

router.post('/jar/category', async (req, res)=>{
    const {user_id, category_name, jar_limit, rj_category_id} = req.body;
    try{
        const result = await pool.query(
            `INSERT INTO jar_category(user_id, category_name, jar_limit, rj_category_id)
            values ($1,$2,$3, $4)
            ON CONFLICT (user_id, category_name) DO NOTHING
            RETURNING *`,
            [user_id, category_name, jar_limit, rj_category_id]
        );
        res.status(200).json(result.rows[0]);
    }catch (err){
        console.error(err);
        res.status(500).json({error:"Failed to add Jar"})
    }
});


router.delete('/jar/category/:category_id', async (req, res) => {
    const { category_id } = req.params;
    try {
        await pool.query(`DELETE FROM jar_category WHERE category_id = $1`, [category_id]);
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete category" });
    }
});

export default router