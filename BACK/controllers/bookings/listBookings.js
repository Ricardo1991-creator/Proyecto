const { getConnection } = require("../../db");

async function listBookings(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `
     SELECT bookings.id,order_number,rating,moneys.price,
      moneys.money_type,moneys.money_country,buyer.name,moneys.id_user,buyer.address,
      buyer.zip_code,buyer.city, bookings.rating, seller.name
      FROM bookings
      INNER JOIN users as buyer
      ON bookings.id_user = buyer.id
      INNER JOIN moneys
      ON bookings.id_money = moneys.id
      INNER JOIN users as seller
      ON moneys.id_user = seller.id
      WHERE buyer.id = ?
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
