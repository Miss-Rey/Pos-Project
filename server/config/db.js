import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pos',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

const sqlFiles = [
  'customers.sql',
  'employees.sql',
  'inventory.sql',
  'sales.sql',
  'settings.sql',
  'users.sql'
];

const loadSchema = () => {
  try {
    const sqlScripts = sqlFiles.map(file => {
      const filePath = path.join(__dirname, 'database', file);
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      } else {
        console.warn(`⚠️ Missing SQL file: ${filePath}`);
        return '';
      }
    });
    return sqlScripts.join('\n');
  } catch (err) {
    console.error('❌ Error reading SQL files:', err);
    throw err;
  }
};

const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    try {
      const [tables] = await connection.query("SHOW TABLES LIKE 'users'");
      if (tables.length === 0) {
        console.log('🔄 Initializing database schema...');
        for (const table of sqlFiles.map(f => f.replace('.sql', ''))) {
          const schemaPath = path.join(__dirname, 'database', `${table}.sql`);
          if (fs.existsSync(schemaPath)) {
            const schema = fs.readFileSync(schemaPath, 'utf8');
            await connection.query(schema);
            console.log(`✅ ${table} table created`);
          } else {
            console.warn(`⚠️ Missing SQL file for table: ${table}`);
          }
        }
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('❌ Database initialization failed:', err);
    throw err;
  }
};

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    return false;
  }
};

export { pool, initializeDatabase, testConnection };
