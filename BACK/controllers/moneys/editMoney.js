const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

const { editEntrySchema } = require("../../vallidators/moneyVallidators");

async function editMoney(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await editEntrySchema.validateAsync(req.body);

    //Sacamos los datos

    const { price, locate, money_type, money_country, coments } = req.body;
    const { id } = req.params;

    //Selecionar los datos actuales de la entrada
    const [current] = await connection.query(
      `
      SELECT id, price, locate, money_type, money_country, coments, id_user,
      lastUpdate
      FROM moneys
        WHERE id=?`,
      [id]
    );
    const [currentEntry] = current;

    if (currentEntry.id_user !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("No tienes persmisos para editar esta entrada", 403);
    }

    //Ejecutar la query de edicion de la entrada

    await connection.query(
      `
          UPDATE moneys SET 
          price=?,
      locate=?,
      money_type=?,
      money_country=?,
      coments=?

    WHERE id=?
          `,
      [price, locate, money_type, money_country, coments, id]
    );

    //Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        price,
        locate,
        money_type,
        money_country,
        coments,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editMoney;
