const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 80;

// PostgreSQL connection settings
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Function to get data from the database
async function getDataFromDb() {
    try {
        const result = await pool.query('SELECT * FROM your_table'); // Replace 'your_table' with your table name
        return result.rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// API endpoint
app.get('/data', async (req, res) => {
    try {
        const data = await getDataFromDb();
        res.json(data);
    } catch (err) {
        res.status(500).send('Error retrieving data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
