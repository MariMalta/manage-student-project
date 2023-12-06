const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

require('./swagger')(app);

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'node_crud_api'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

/**
 * @swagger
 * /estudantes:
 *   post:
 *     description: Adiciona um novo estudante
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro interno do servidor
 */

// app.post('/estudantes', (req, res) => {
//   const { name, age, id, firstGrade, secondGrade, professorName, classNumber } = req.body; 

//   const query = 'INSERT INTO student (name, age, id, firstGrade, secondGrade, professorName, classNumber) VALUES (?, ?, ?, ?, ?, ?, ?)';
//   db.query(query, [name, age, id, firstGrade, secondGrade, professorName, classNumber], (err, result) => {
//     if (err) {
//       console.error('Erro ao adicionar estudante: ' + err);
//       res.status(500).json({ error: 'Erro ao adicionar estudante' });
//       return;
//     }
//     res.status(201).json({ message: 'Estudante adicionado com sucesso' });
//   });
// });

app.post('/estudantes', (req, res) => {
  const { id, name, age, firstGrade, secondGrade, professorName, classNumber } = req.body;

  const query = 'SELECT * FROM student WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erro no banco de dados' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'ID já está em uso' });
    }

    const insertQuery = 'INSERT INTO student (id, name, age, firstGrade, secondGrade, professorName, classNumber) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [id, name, age, firstGrade, secondGrade, professorName, classNumber];

    db.query(insertQuery, values, (insertError, insertResults) => {
      if (insertError) {
        return res.status(500).json({ error: 'Erro ao inserir o estudante no banco de dados' });
      }

      res.status(201).json({ message: 'Estudante adicionado com sucesso' });
    });
  });
});


/**
 * @swagger
 * /estudantes:
 *   get:
 *     description: Retorna a lista de estudantes
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *         description: Estudantes não encontrados
 *       500:
 *         description: Erro interno do servidor
 */

app.get('/estudantes', (req, res) => {
  const query = 'SELECT * FROM student';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar estudantes: ' + err);
      res.status(500).json({ error: 'Erro ao buscar estudantes' });
      return;
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /estudantes/{id}:
 *   put:
 *     description: Atualiza as informações de um estudante com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               firstGrade:
 *                 type: number
 *               secondGrade:
 *                 type: number
 *               professorName:
 *                 type: string
 *               classNumber:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 *       404:
 *         description: Estudante não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

app.put('/estudantes/:id', (req, res) => {
  const { id } = req.params;
  const {name, age, firstGrade, secondGrade, professorName, classNumber} = req.body;
  console.log(req.body);
  const query = 'UPDATE student SET name = ?, age = ?, firstGrade = ?, secondGrade = ?, professorName = ?, classNumber = ? WHERE id = ?';
  db.query(query, [name, age, firstGrade, secondGrade, professorName, classNumber, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar estudante: ' + err);
      res.status(500).json({ error: 'Erro ao atualizar estudante' });
      return;
    }
    res.status(200).json({ message: 'Estudante atualizado com sucesso' });
  });
});

/**
 * @swagger
 * /estudantes/{id}:
 *   delete:
 *     description: Exclui um estudante com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do estudante a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudante excluído com sucesso
 *       404:
 *         description: Estudante não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

app.delete('/estudantes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM student WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar estudante: ' + err);
      res.status(500).json({ error: 'Erro ao deletar estudante' });
      return;
    }
    res.status(200).json({ message: 'Estudante deletado com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});