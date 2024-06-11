const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Importe o módulo mysql2

const app = express();
const port = 3080;

// Crie uma conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'fba-mysqldb.mysql.database.azure.com', // Altere para o host do seu banco de dados
  user: 'azuresqlpserver',      // Altere para o usuário do seu banco de dados
  password: 'pel&Rq3R,rR&FhbTj!QY', // Altere para a senha do seu banco de dados
  database: 'users', // Altere para o nome do seu banco de dados
  port: 3306,
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

app.use(cors()); // Habilita o CORS
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários: ', err);
      res.status(500).send('Erro ao buscar usuários');
      return;
    }
    res.json(results);
  });
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  const query = 'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)';
  connection.query(query, [user.first_name, user.last_name, user.email], (err, results) => {
    if (err) {
      console.error('Erro ao adicionar usuário: ', err);
      res.status(500).send('Erro ao adicionar usuário');
      return;
    }
    res.json("Usuário adicionado");
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
