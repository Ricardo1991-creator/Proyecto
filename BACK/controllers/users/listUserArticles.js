const { getConnection } = require("../../db");

async function listUserArticles(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `
      SELECT moneys_images.image,moneys.id,locate,money_type,price,money_country,coments, seller.id as vendedor, COUNT(*) as num_ventas,moneys.createDate
      FROM moneys
      LEFT JOIN bookings  on moneys.id = bookings.id_money
      INNER JOIN users as seller
      ON moneys.id_user = seller.id
      LEFT JOIN moneys_images on moneys.id = moneys_images.money_id
      WHERE seller.id = ?
      group by moneys_images.image,moneys.id,money_type,price,money_country,coments, vendedor
      `,
      [id]
    );

    const [soldMoneys] = await connection.query(
      `select moneys.id from moneys JOIN bookings b on moneys.id = b.id_money INNER JOIN users as seller
      ON moneys.id_user = seller.id
      WHERE seller.id = ?;
      `,
      [id]
    );

    //RECORREMOS EL RESULT EN LA PRIMERA QUERY
    for (let index = 0; index < result.length; index++) {
      //COGEMOS EL NUMERO DE VENTAS DE CADA ARTICULO
      let num_ventas = result[index].num_ventas;
      //LOS IGAULAMOS TODOS A CERO
      result[index].num_ventas = 0;
      //RECORREMOS EL ARRAY DE LAS MONEDAS VENDIDAS
      for (let bucle = 0; bucle < soldMoneys.length; bucle++) {
        //COMPROBAMOS LAS MONEDAS DEL PRIMER ARRAY CON EL SEGUNDO
        //EN CSO DE QUE HAYA VNEDIDO LE PONEmOS EL NUMERO DE VENTAS QUE TENGA
        if (result[index].id == soldMoneys[bucle].id) {
          result[index].num_ventas = num_ventas;
          break;
        }
      }
    }

    console.log(soldMoneys);
    console.log(soldMoneys.id);
    console.log(result.id);

    res.send({
      status: "ok",
      data: result,
      soldMoneys,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = listUserArticles;
