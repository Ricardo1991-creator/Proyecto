const { getConnection } = require("../../db");

async function getAvgSeller(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;
    console.log(id);
    const [result] = await connection.query(
      `SELECT AVG(rating),COUNT(rating)
 FROM bookings
 WHERE id_user = ?
          `,
      [id]
    );
    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getAvgSeller;
