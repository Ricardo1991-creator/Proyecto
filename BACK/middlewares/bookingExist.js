const { getConnection } = require("../db");

async function bookingExist(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [current] = await connection.query(
      `
      SELECT id
      FROM bookings
      WHERE id=?

      `,
      [id]
    );

    if (current.length === 0) {
      const error = new Error(
        `La entrada con ${id} no existe en la base de datos`
      );
      error.httpStatus = 404;
      throw error;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = bookingExist;
