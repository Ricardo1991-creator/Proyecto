/* const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const mysql = require("mysql");

const app = express();

//COSAS QUE USA APP

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONEXION A LA BASE DE DATOS

const connection = mysql.createConnection({
  host: "localhost",
  user: "ricardopuig",
  password: "pekepuig",
  database: "proyectoMonedas",
});

//REALIZANDO CONEXION

connection.connect((error) => {
  if (error) throw error;
  console.log("DATABASE BIEN");
});

//CONEXION A LA API

 const PORT = 8080;

app.listen(PORT, () => console.log("API UP"));
 */
