const { getConnection } = require("../../db");

async function listBookings(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `
      SELECT bookings.id,order_number,delivery_address,rating,
      id_user_buyer
      FROM bookings
      INNER JOIN users
      ON bookings.id_user_buyer = users.id
      WHERE users.id = ?
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

module.exports = listBookings;
