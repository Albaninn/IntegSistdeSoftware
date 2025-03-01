const express = require('express');
const mysql = require("mysql");

const app = express();
const port = 3000;
const conection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "positivo",
        database: "users"
    }
)

// Rota raiz que retorna "Hello World"
app.get('/', (req, resp) => {
  const message = 'Hello World';
  resp.send(message)
})

app.get('/responseisjson', (req, res) => {
    res.json({
      name: 'Lucas',
      lastName: 'Albano',
      age: 23
    })
  })

  app.get('/plus', (req, res) => {
    const numberOne = parseInt(req.query.numberOne)
    const numberTwo = parseInt(req.query.numberTwo)
  
    const result = numberOne + numberTwo
  
    res.json({
      numberOne,
      numberTwo,
      result
    });
  });
  
app.get("/user", (req, res) => {
    const query = `SELECT * From user WHERE name = "${req.query.name}"`;

    conection.query(query, (err,result,fields)=>{
        if (err) throw err;

        res.json(result)
    })
})

app.listen(port, () => {console.log('api is up')})