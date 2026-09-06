import dotenv from 'dotenv';
dotenv.config();
import {Pool} from 'pg';



export const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

// export default pool;