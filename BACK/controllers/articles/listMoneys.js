const { getConnection } = require("../../db");

async function listmoneys(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { locate, money_type, price1, price2 } = req.query;
    let sql = `SELECT moneys.* , moneys_images.image 
FROM moneys
LEFT JOIN moneys_images ON moneys.id = moneys_images.money_id`;
    let count = 0;
    let parameters = [];
    console.log(sql);
    if (locate) {
      sql += " WHERE locate = ?";
      parameters.push(locate);
      count++;
    }

    if (money_type) {
      if (count > 0) {
        sql += " AND ";
      } else {
        sql += " WHERE ";
      }
      sql += " money_type = ? ";
      parameters.push(money_type);
      count++;
    }
    if (price1) {
      if (count > 0) {
        sql += " AND ";
      } else {
        sql += " WHERE ";
      }
      sql += " price >= ?";
      parameters.push(price1);
      count++;
    }
    if (price2) {
      if (count > 0) {
        sql += " AND ";
      } else {
        sql += " WHERE ";
      }
      sql += " price <= ?";
      parameters.push(price2);
      count++;
    }

    let queryResults;
    console.log(sql, parameters);
    queryResults = await connection.query(sql, parameters);
    const [result] = queryResults;

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

module.exports = listmoneys;
