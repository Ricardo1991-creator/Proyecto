const { getConnection } = require("../../db");

async function rating(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const { rating } = req.body;

    const userRating = parseInt(rating);

    //comprobar que el voto es correcto

    if (userRating > 5 || userRating < 1) {
      const error = new Error("Voto incorrecto,tiene que ser entre 1 y 5");
      error.httpStatus = 400;
      throw error;
    }

    //Comprobar que la entrada existe y si no dar un 404

    const [newRating] = await connection.query(
      `
          SELECT id
          FROM moneys
          WHERE id=?
        `,
      [id]
    );
    //Comprobar que no hay ningun voto previo con mi usuario
    const [existingRating] = await connection.query(
      `
          SELECT id
          FROM bookings
          WHERE id_user=?`,
      [id, req.auth.id]
    );
    if (existingRating.length > 0) {
      const error = new Error(
        `Ya votaste la entrada "${newRating[0]} con tu usuario`
      );
      error.httpStatus = 403;
      throw error;
    }

    //Guardamos el voto en la base de datos
    await connection.query(
      `
          INSERT INTO bookings(id_user,rating,name,lasUpdate)
          VALUES (?, ?, ?, UTC_TIMESTAMP)
        `,
      [id, userRating, req.auth.id]
    );

    res.send({
      status: "ok",
      message: `Se guardó el voto(${userRating} puntos) a la entrada ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release;
  }
}

module.exports = rating;
