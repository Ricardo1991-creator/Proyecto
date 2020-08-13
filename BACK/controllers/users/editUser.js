const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

// const { editEntrySchema } = require("../../vallidators/userVallidators");

async function editUSer(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // await editEntrySchema.validateAsync(req.body);

    //Sacamos los datos

    const {
      name,
      username,
      email,
      lastname,
      dni,
      zipcode,
      address,
      city,
      telephone,
      bankaccount,
    } = req.body;
    const { id } = req.params;

    //Selecionar los datos actuales de la entrada
    const [current] = await connection.query(
      `
      SELECT id,name,user_name,email,lastname,dni,zip_code,address,city,telephone,bank_account,
      lastUpdate
      FROM users
        WHERE id=?`,
      [id]
    );
    const [currentEntry] = current;

    if (
      currentEntry.id_user_seller !== req.auth.id &&
      req.auth.role !== "user"
    ) {
      throw generateError("No tienes persmisos para editar esta entrada", 403);
    }

    //Ejecutar la query de edicion de la entrada

    await connection.query(
      `
          UPDATE users SET 
          name=?,
      user_name=?,
      email=?,
      lastname=?,
      dni=?,
      zip_code=?,
      address=?,
      city=?,
      telephone=?,
      bank_account=?
      
    WHERE id=?
          `,
      [
        name,
        username,
        email,
        lastname,
        dni,
        zipcode,
        address,
        city,
        telephone,
        bankaccount,
        id,
      ]
    );

    //Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        name,
        username,
        email,
        lastname,
        dni,
        zipcode,
        address,
        city,
        telephone,
        bankaccount,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editUSer;
