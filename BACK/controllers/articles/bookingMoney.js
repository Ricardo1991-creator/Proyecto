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

    //  mandar el correo para confirmar el artículo
    try {
      const [buyer] = await connection.query(
        `
        SELECT id,email
        FROM users
        WHERE id=?
   
        `,
        [req.auth.id]
      );
      const email = buyer[0].email;
      console.log(email, buyer);

      await sendMail({
        email: email,
        title: "Reserva de Moneda",
        content: `Haz click en el siguiente enlace. Para terminar la reserva.`,
      });
    } catch (error) {
      throw generateError("No hemos podido enviar el correo.", 500);
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
