const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

// Configuração de banco de dados vulnerável
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

// Endpoint vulnerável a SQL Injection
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  // VULNERABILIDADE: SQL Injection
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint vulnerável a XSS
app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  // VULNERABILIDADE: XSS - sem sanitização
  res.send(`<div>Comentário: ${comment}</div>`);
});

// Informações sensíveis expostas
app.get('/debug', (req, res) => {
  res.json({
    env: process.env,
    config: db.config
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
