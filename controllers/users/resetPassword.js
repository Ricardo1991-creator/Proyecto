const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

const {
  resetPasswordUserSchema,
} = require("../../vallidators/userVallidators");

async function resetPassword(req, res, next) {
  let connection;

  try {
    //Comprobamos el código de recuperación y la nueva password
    await resetPasswordUserSchema.validateAsync(req.body);
    connection = await getConnection();

    const { recoveryCode, newPassword } = req.body;

    //comprobamos que le usuario que hace la petición existe
    const [current] = await connection.query(
      `
    SELECT id
    FROM users
    WHERE recovery_code=?
    `,
      [recoveryCode]
    );

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
    SET createDate=NOW(), password=SHA2(?, 512), recovery_code=NULL, lastUpdate=NOW(), lastAuthUpdate=NOW()
    WHERE recovery_code=?
    `,
      [newPassword, recoveryCode]
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
