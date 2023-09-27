const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")
require('dotenv').config()

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "pass05",
    database: "firstdb"
})
app.use(cors())
app.use(express.json())

app.post('/api/add', (req, res) => {
    const { q1, q2, q3 }= req.body;

    db.query('INSERT INTO ans (Q1, Q2, Q3) VALUES (?, ?, ?)', [q1, q2, q3], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send("Inserted Successfully!")
    })
})
app.get('/api/get', (req, res) => {
    db.query('SELECT Q1, Q2, Q3 FROM ans', (err, result) => {
        if (err) console.log(err)
        const data = JSON.parse(JSON.stringify(result))
        res.send(data)
    })
})

app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`))