const { getConnection } = require("../../db");

async function getBooking(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
          SELECT bookings.*
          FROM bookings
          WHERE bookings.id=?
          `,
      [id]
    );
    res.send({
      status: "ok",
      data: result[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getBooking;
