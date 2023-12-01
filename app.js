const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
const port = 8080;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

async function getTodosFromDb() {
    try {
        const result = await pool.query('SELECT * FROM todos');
        return result.rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

app.get('/todos', async (req, res) => {
    try {
        const todos = await getTodosFromDb();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving todos');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
