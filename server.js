require("dotenv").config();

const express = require("express");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//middlewares
const isUser = require("./middlewares/isUser");
const isAdmin = require("./middlewares/isAdmin");
const bookingExist = require("./middlewares/bookingExist");

//User controllers
const newUser = require("./controllers/users/newUser");
const validateUser = require("./controllers/users/validateUser");
const loginUser = require("./controllers/users/loginUser");
const getUser = require("./controllers/users/getUser");
const deleteUser = require("./controllers/users/deleteUser");
const resetPassword = require("./controllers/users/resetPassword");
const editPassword = require("./controllers/users/editPassword");
const recoveryUSerPassword = require("./controllers/users/recoveryUserPassword");

//Bookings controllers
const getBooking = require("./controllers/entries/getBookings");
const listBookings = require("./controllers/entries/listBookings");
const rating = require("./controllers/entries/rating");
const uploadEntryImage = require("./controllers/entries/uploadEntryImage");

//Articles controllers
const newMoney = require("./controllers/articles/newMoney");
const editMoney = require("./controllers/articles/editMoney");
const listMoneys = require("./controllers/articles/listMoneys");
const bookingMoney = require("./controllers/articles/bookingMoney");

const app = express();

// Middlewares iniciales

// Log de peticiones a la consola
// app.use(morgan("dev"));

// Procesado de body tipo json
app.use(bodyParser.json());

// Procesado de body tipo form-data
app.use(fileUpload());

//Reservar moneda
//POST /articles/:money_id/reserve (el otro confirme)
//reservar un articulo para comprar
//usuarios
app.post("/articles/:id/booking", isUser, bookingMoney);

//listar las monedas
//GET - /articles
//BUsqueda de monedas por campos
//publico
app.get("/articles", listMoneys);

//ARTICULOS
//Editar un Articulo
//PUT - /articles/:id
//SOlo los usuarios registradosarticulo subido
app.put("/articles/:id", isUser, editMoney);

// Crear un nuevo articulo
// POST - /articles
// Sólo usuarios registrados
app.post("/articles", isUser, newMoney);

// Añadir una imagen a una entrada
// POST /entries/:id/images
// Solo usuario que crear esta entrada o admin
app.post("/entries/:id/images", isUser, bookingExist, uploadEntryImage);

//ENTRADAAS
// Votar una entrada
// POST - /entries/:id/votes
// Sólo usuarios registrados
app.post("/entries/:id/votes", isUser, bookingExist, rating);

// Listar multiples entradas del diario de viajas
// GET - /entries
// Público
app.get("/entries/:id", listBookings);

//USUARIOS

//Editar contraseña de usuario
//POST - /users/editpassword
//usuario registrado
app.post("/users/:id/password", isUser, editPassword);

//Recuperar contraseña de usuario
//POST - /users/recover-password
//usuario registrado
app.post("/users/recover-password", recoveryUSerPassword);

//Reseteear contraseña de usuario
//GET- /users/reset
//usuario registrado
app.get("/users/reset", resetPassword);

// Registro de usuarios
// POST - /users
// Público
app.post("/users", newUser);

// Validación de usuarios registrados
// GET - /users/validate/:code
// Público
app.get("/users/validate/:code", validateUser);

// Login de usuarios
// POST - /users/login
// Público
app.post("/users/login", loginUser);

// Ver información de un usuario
// GET - /users/:id
// Sólo para usuarios registrados
// Pero si el usuario es el mismo o admin debería mostrar toda la información
app.get("/users/:id", isUser, getUser);

// Borrar un usuario
// DELETE- /users/:id
// Sólo el usuario admin
app.delete("/users/:id", isUser, isAdmin, deleteUser);

//MOSTRAR UNA ENTRADA
//GET - /bookings/:id
app.get("/user/:id/bookings/:id", isUser, bookingExist, getBooking);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port} `);
});
