const { getConnection } = require("../../db");
const { randomString, sendMail, generateError } = require("../../helpers");

const {
  recoveryPasswordUserSchema,
} = require("../../vallidators/userVallidators");
const { send } = require("@sendgrid/mail");

async function recoveryUserPassword(req, res, next) {
  let connection;

  try {
    //se valida el mail
    await recoveryPasswordUserSchema.validateAsync(req.body);

    connection = await getConnection();

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

    const recoveryCode = randomString(20);
    await connection.query(
      `
          UPDATE users
          SET recovery_code=?
          WHERE email=?

          `,
      [recoveryCode, email]
    );

    //SE ENVIA EL CODIGO POR CORREO

    try {
      await sendMail({
        email: email,
        title: "Cambiar contraseña",
        content: `El codigo que ha solicitado para cambiar la contraseña es ${recoveryCode}.`,
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

module.exports = recoveryUserPassword;
