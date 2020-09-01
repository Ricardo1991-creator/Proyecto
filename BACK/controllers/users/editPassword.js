const { getConnection } = require("../../db");

const { generateError } = require("../../helpers");

const { editUserPasswordSchema } = require("../../vallidators/userVallidators");

async function editPassword(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    //validamos la oldpassword y la newPssword
    await editUserPasswordSchema.validateAsync(req.body);

    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    //se comprueba que el usuario que hace la peticion es el que quiere cambiar la contraseña
    console.log(req.auth.id, id);
    if (req.auth.id !== Number(id)) {
      throw generateError("No puedes cambiar la password de otro usuario");
    }

    //comprabamos que la contraseña antigua y la nueva no sean iguales

    const [currentUser] = await connection.query(
      `
          SELECT id
          FROM users
          WHERE id=? AND password= SHA2(?,512)
          `,
      [id, oldPassword]
    );

    if (currentUser.length === 0) {
      const error = new Error("La password antigua no es correcta.");
      error.httpStatus = 401;
      throw error;
    }
    //Se guarda la password en la base de datos
    await connection.query(
      `
          UPDATE users
          SET password=SHA2(?,512),
          lastUpdate=UTC_TIMESTAMP,lastAuthUpdate=UTC_TIMESTAMP
          WHERE id=?
          `,
      [newPassword, id]
    );

    res.send({
      status: "ok",
      message: "La password ha sido actualizada correctamente.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editPassword;
