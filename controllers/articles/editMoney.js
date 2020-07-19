const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

const { editEntrySchema } = require("../../vallidators/diaryVallidators");

async function editMoney(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await editEntrySchema.validateAsync(req.body);

    //Sacamos los datos

    const {
      price,
      locate,
      money_type,
      money_country,
      coments,
      seller,
    } = req.body;
    const { id } = req.params;

    //Selecionar los datos actuales de la entrada
    const [current] = await connection.query(
      `
      SELECT id, price, locate, money_type, money_country, coments, seller, id_user_seller,
      lastUpdate
      FROM moneys
        WHERE id=?`,
      [id]
    );
    const [currentEntry] = current;

    if (
      currentEntry.id_user_seller !== req.auth.id &&
      req.auth.role !== "admin"
    ) {
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
      coments=?,
      seller=?

    WHERE id=?
          `,
      [price, locate, money_type, money_country, coments, seller, id]
    );

    //Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        locate,
        money_type,
        money_country,
        coments,
        seller,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editMoney;
