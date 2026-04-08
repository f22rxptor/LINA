import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// create a connection pool that can be used throughout the application
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Lina_baby',
  port: Number(process.env.DB_PORT) || 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// helper for simple queries
export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
