const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

async function getBestUsers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    //SACAMOS LA QUERY DE LISTA DE VOTOS
    const [rating] = await connection.query(
      `
      SELECT rating
      FROM bookings
      WHERE id =?
    `,
      [id]
    );

    if (rating.length === 0) {
      throw generateError("No hay ninguna valoracion", 401);
    }

    const ratingData = rating;
    console.log(ratingData);
    res.send({
      status: "ok",
      rating: `Valoración media.`,
      data: ratingData,
    });
    // devolver la lista en la respuesta
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getBestUsers;
