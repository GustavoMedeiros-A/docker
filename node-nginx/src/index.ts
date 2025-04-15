import express from "express"
import mysql from 'mysql2'
import { getRandomValues } from "node:crypto";

const app = express()
const port = 3000;

const names = ["Gustavo", "Wesley", "Rafael", "Mario", "Luigi"]

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
})

connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      return;
    }
    console.log('Conectado ao MySQL!');
  });


app.get("/", (_, res) => {
    const randomName = names[Math.floor(Math.random() * 5)];

    connection.query(`INSERT INTO people(name) VALUES(?)`, [randomName], (err) => {
        if (err) {
          return res.status(500).send('Erro ao inserir no banco');
        }
        connection.query(`SELECT name FROM people`, (err, results) => {
            if(err) {
                return res.status(500).send('Erro ao buscar nomes');
            }
            const list = (results as any[])
                .map(row => `<li>${row.name}</li>`)
                .join('');

            res.send(`<h1>Full Cycle Rocks!</h1><ul>${list}</ul>`);
        })
    })
})

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
  });