const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

const {
  resetUserPasswordSchema,
} = require("../../vallidators/userVallidators");

async function resetPassword(req, res, next) {
  let connection;

  try {
    //Comprobamos el código de recuperación y la nueva password
    // await resetUserPasswordSchema.validateAsync(req.body);
    connection = await getConnection();

    const { recoverCode, newPassword } = req.body;
    console.log(recoverCode);
    //comprobamos que le usuario que hace la petición existe
    const [current] = await connection.query(
      `
    SELECT id
    FROM users
    WHERE registrationCode=?
    `,
      [recoverCode]
    );
    console.log(current);
    if (current.length === 0) {
      throw generateError(
        "No hemos encontrado a ningún usuario con este código de recuperación de password.",
        404
      );
    }

    //Actualizamos la password en la base datos
    await connection.query(
      `
    UPDATE users
    SET createDate=NOW(), password=SHA2(?, 512), registrationCode=NULL, lastUpdate=NOW(),lastAuthUpdate=NOW()
    WHERE registrationCode=?
    `,
      [newPassword, recoverCode]
    );

    //enviamos mensaje
    res.send({
      status: "ok",
      message: "La password fue correctmente actualizada.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = resetPassword;
