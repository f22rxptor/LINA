import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initDB() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'Lina_baby';
  const port = process.env.DB_PORT || 3307;

  try {
    console.log(`📡 Connecting to MySQL server at ${host}:${port} as ${user}...`);
    // Connect without specifying a database first to create it
    const connection = await mysql.createConnection({ host, port, user, password });

    console.log(`🔧 Creating database '${database}' if it doesn't exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    
    console.log(`📁 Switching to database '${database}'...`);
    await connection.query(`USE \`${database}\`;`);

    console.log(`📝 Creating 'users' table...`);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log(`📝 Creating 'predictions' table...`);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS predictions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        age FLOAT,
        bmi FLOAT,
        bp_systolic FLOAT,
        fasting_glucose FLOAT,
        family_history VARCHAR(10),
        activity_level VARCHAR(10),
        risk VARCHAR(50),
        probability FLOAT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✅ Database initialization completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Failed to initialize database:');
    console.error(error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 TIP: Your MySQL username or password might be incorrect. Update DB_USER and DB_PASSWORD in your .env file.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 TIP: Is MySQL running on your computer? Start your MySQL server (like XAMPP, WAMP, or MySQL Service) and try again.');
    }
  }
}

initDB();
