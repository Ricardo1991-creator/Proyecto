const { getConnection } = require("../../db");
const { randomString, sendMail, generateError } = require("../../helpers");

const {
  recoverUserPasswordSchema,
} = require("../../vallidators/userVallidators");

async function recoverUserPassword(req, res, next) {
  let connection;
  0;
  try {
    connection = await getConnection();
    //se valida el mail
    await recoverUserPasswordSchema.validateAsync(req.body);

    const { email } = req.body;
    //se comprueba que el usuario existe

    const [current] = await connection.query(
      `
          SELECT id
          FROM users
          WHERE email=?
          `,

      [email]
    );

    if (current.length === 0) {
      throw generateError(
        `No existe ninguna direccion de correo ${email} registrada en nuestra base de datos.
              `,
        404
      );
    }

    //SE AÑADE UN CODIGO ALEATORIO AL USUARIO EN LA BASE DE DATOS

    const recoverCode = randomString(20);

    await connection.query(
      `
          UPDATE users
          SET registrationCode=?
          WHERE email=?

          `,
      [recoverCode, email]
    );

    //SE ENVIA EL CODIGO POR CORREO

    try {
      await sendMail({
        email: email,
        title: "Cambiar contraseña",
        content: `El codigo que ha solicitado para cambiar la contraseña es ${recoverCode}.`,
      });
    } catch (error) {
      throw generateError("No se ha pododio enviar el correo.", 500);
    }
    res.send({
      status: "ok",
      message: "Hemos enviado un correo  para recuperar la contraseña",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = recoverUserPassword;
