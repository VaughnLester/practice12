import sql from "mysql2/promise"

const db = sql.createPool({
    host: "sql5.freesqldatabase.com",
    user: "sql5820138",
    password: "y6ly8SwB53",
    database: "sql5820138",
    port: 3306,
    connectionLimit: false,
    queueLimit: 0
})

export {db}