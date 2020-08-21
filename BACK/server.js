require("dotenv").config();

const express = require("express");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

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
const recoverUSerPassword = require("./controllers/users/recoverUserPassword");
const editUser = require("./controllers/users/editUser");
const getBestUsers = require("./controllers/users/getBestUsers");
const getAvgSeller = require("./controllers/users/getAvgSeller");
const listUserArticles = require("./controllers/users/listUserArticles");

//Bookings controllers
// const getBooking = require("./controllers/bookings/getBooking");/*  */
const listBookings = require("./controllers/bookings/listBookings");
const rating = require("./controllers/bookings/rating");
const newBooking = require("./controllers/bookings/newBooking");
const newRate = require("./controllers/bookings/newRate");

//Articles controllers
const uploadEntryImage = require("./controllers/moneys/uploadEntryImage");
const newMoney = require("./controllers/moneys/newMoney");
const editMoney = require("./controllers/moneys/editMoney");
const listMoneys = require("./controllers/moneys/listMoneys");
const deleteMoney = require("./controllers/moneys/deleteMoney");

const app = express();

// Middlewares iniciales

// Log de peticiones a la consola
// app.use(morgan("dev"));
app.use(cors());

app.use(express.static("static"));

// Procesado de body tipo json
app.use(bodyParser.json());

// Procesado de body tipo form-data
app.use(fileUpload());
app.use(express.static("static"));
//Reservar moneda
//POST /articles/:money_id/reserve (el otro confirme)
//reservar un articulo para comprar
//usuarios
// app.post("/articles/:id/booking", isUser, getBooking);

//listar las monedas
//GET - /articles
//BUsqueda de monedas por campos
//publico
app.get("/articles", listMoneys);

//ARTICULOS

// Borrar un articulo
// DELETE- /articles/:id
// Sólo el usuario admin
app.delete("/articles/:id", isUser, deleteMoney);

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
app.post("/articles/:id/images", isUser, bookingExist, uploadEntryImage);

//ENTRADAS

// Votar una entrada
// POST - /entries/:id/votes
// Sólo usuarios registrados
app.post("/entries/:id/votes", isUser, bookingExist, rating);

// Listar multiples entradas
// GET - /entries
// Público
app.get("/entries/:id", listBookings);

//MOSTRAR UNA ENTRADA
//GET - /bookings/:id
// app.get("/user/:id/bookings/:id", isUser, bookingExist, getBooking);/*  */

//NUEVA RESERVA
//POST-/entries/:id/booking
app.post("/articles/:id/booking", isUser, newBooking);

//NUEVA RESERVA
//POST-/entries/:id/newrate
app.put("/entries/:id/newrate", isUser, newRate);

//USUARIOS
//Listar los articuos de cada usuario
//PUT - /articles/:id
//SOlo los usuarios registrados articulo subido
app.get("/users/:id/listuserarticles", isUser, listUserArticles);

//SACAR LOS VOTOS DEL VENDEDOR
//GET- /user/rating
//usuarios
app.get("/users/:id/rating", getAvgSeller);

//Listar el mejor ususario
//GET - /users/bestuser
//publico
app.get("/users/bestuser/:id", getBestUsers);

//Editar contraseña de usuario
//POST - /users/editpassword
//usuario registrado
app.put("/users/:id/password", isUser, editPassword);

//Recuperar contraseña de usuario
//POST - /users/recover-password
//usuario registrado
app.post("/users/recover-password", recoverUSerPassword);

//Reseteear contraseña de usuario
//GET- /users/reset
//usuario registrado
app.post("/users/reset", resetPassword);

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

//Editar información de un usuario
// PUT - /users/update
// Sólo para usuarios registrados
app.put("/users/update/:id", isUser, editUser);

// Borrar un usuario
// DELETE- /users/:id
// Sólo el usuario admin
app.delete("/users/:id", isUser, isAdmin, deleteUser);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port} `);
});
