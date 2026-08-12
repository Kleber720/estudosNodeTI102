const mysql = require("mysql2/promise"); // acessar as bibliotecas
 
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "estudonode",
    port: Number(process.env.DB_PORT || 3306),
 
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: 0
});
 
module.exports = pool; //exportando arquivo