import { createPool } from 'mysql2/promise';
 
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234567891011',
    database: 'cadastro',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
 
export default pool;