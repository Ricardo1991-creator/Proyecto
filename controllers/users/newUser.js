const { getConnection } = require("../../db");
const { randomString, sendMail } = require("../../helpers");

async function newUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { name, lastname, email, password } = req.body;

    //comprobamos que se reciben todos los datos necesarios
    if (!email || !password) {
      const error = new Error(
        "Es necesario que especifiques un email y una password!"
      );
      error.httpStatus = 400;
      throw error;
    }

    //Comprobramos que no existe un usuariio con el mismo email en la base de datos
    const [existingUSer] = await connection.query(
      `
     
     SELECT id
     FROM users
     WHERE email=?     
     `,
      [email]
    );
    if (existingUSer.length > 0) {
      const error = new Error(
        "Ya existe un usuario registrado con ese email, por favor introduce uno distinto"
      );
      error.httpStatus = 409;
      throw error;
    }
    const registrationCode = randomString(20);
    const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

    //enviamos la url anterior al email

    try {
      await sendMail({
        email,
        title: "Valida tu cuenta en la App para empezar",
        content: `Para validar tu cuenta de usuario haz click aquí:${validationURL}`,
      });
    } catch (error) {
      const emailError = new Error("Hubo un error al enviar el email");
      throw emailError;
    }
    //Meter el nuevo usuario en la base de datos sin activar
    await connection.query(
      `
          INSERT INTO users(name,lastname,email,password,registrationCode,lastUpdate)
          VALUES(?,?,?,SHA2(?,512),?,NOW())
          `,
      [name, lastname, email, password, registrationCode]
    );
    res.send({
      status: "ok",
      message:
        "Usuario registrado.Consulta tu email para activarlo.Cuidado! mira tambien en el SPAM",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newUser;
