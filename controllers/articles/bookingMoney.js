const { getConnection } = require("../../db");
const { generateError, sendMail, randomString } = require("../../helpers");

async function reserveArticle(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // desectructuramos el resultasdo para obtener los
    //datos que necesitamos

    // creamos una entrada en la tabla reservas cnoomo no confirmada
    await connection.query(
      `
  INSERT INTO bookings(createDate,order_number,lastUpdate,id_money,id_user_buyer)
  VALUES (NOW(),?,NOW(),?,?)
  `,
      [randomString(5), req.params.id, req.auth.id]
    );

    //mandar un correo al vendedor con información de que se hizo
    //una prereserva con los datos necesarios
    try {
      // Hacemos una consulta a la base de datos para sacar el
      //email del vendedor
      const [resultData] = await connection.query(
        `
  SELECT id, email
  FROM users
  WHERE id=?
  `,
        [articleData.id_user_seller]
      );
      //guardamos los datos de id y email
      const [sellerData] = resultData;

      //creamos la url para confirmar la prereserva con un código
      const reserverUrlCode = randomString(40);
      const reserveConfirm = `${process.env.PUBLIC_HOST}/articles/${id}/confirm/${reserverUrlCode}`;

      //mandar el correo para confirmar el artículo
      await sendMail({
        email: sellerData.email,
        title: "Reserva de Moneda",
        content: `Haz click en el siguiente enlace ${reserveConfirm}. Para terminar la reserva.`,
      });
    } catch (error) {
      throw generateError("no hemos podido enviar el correo.", 500);
    }

    res.send({
      status: "Ok",
      data: "Articulo Prereservado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = reserveArticle;
