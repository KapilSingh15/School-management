const sql = require('mssql');

const config = {
    user: 'schooldata', 
    password: 'Sandesh#1234',
    server: '103.211.202.216',
    database: 'schooldata',

    options: {
        encrypt: false, 
        trustServerCertificate: true, 
        enableArithAbort: true 
    }
};

async function connectToDatabase() {
    try {
        // Attempt to connect to the database
        let pool = await sql.connect(config);
        console.log('Database connected successfully');
        return pool; 
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}
connectToDatabase();
module.exports = { sql, config, connectToDatabase };
