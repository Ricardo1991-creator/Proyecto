const { getConnection } = require("../../db");

async function listmoneys(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { location, money, price1, price2 } = req.query;
    let sql = "SELECT * FROM moneys";
    let count = 0;
    let parameters = [];

    if (location) {
      sql += " WHERE location = ?";
      parameters.push(location);
      count++;
    }

    if (money) {
      if (count > 0) {
        sql += " AND ";
      } else {
        sql += " WHERE ";
      }
      sql += " money = ? ";
      parameters.push(money);
      count++;
    }
    if (price1) {
      if (count > 0) {
        sql += " AND ";
      } else {
        sql += " WHERE ";
      }
      sql += " price >= ";
      parameters.push(price1);
      count++;
    }
    if (price2) {
      if (count > 0) {
        sql += " AND ";
      } else {
        sql += " WHERE ";
      }
      sql += " price <= ";
      parameters.push(price2);
      count++;
    }

    let queryResults;
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
