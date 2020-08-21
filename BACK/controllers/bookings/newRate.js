const { getConnection } = require("../../db");

async function newRate(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Sacar de req.body los datos que necesitio
    const { rating } = req.body;

    // Ejecutar la query

    const { id } = req.params;
    const [result] = await connection.query(
      `
      UPDATE bookings
      SET rating = ?
        WHERE id = ?
        `,
      [rating, id]
    );

    // Devolver el resultado

    res.send({
      status: "ok",
      result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newRate;
