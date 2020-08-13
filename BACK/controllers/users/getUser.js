const { getConnection } = require("../../db");

async function getUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `
          SELECT *
          FROM users
          WHERE id=?
          `,
      [id]
    );
    if (result.lenght === 0) {
      const error = new Error(`El usuario con id ${id} no existe`);
      error.httpStatus = 404;
      throw error;
    }
    const [userData] = result;

    const responseData = {
      createDate: userData.createDate,
      name: userData.name,
    };
    if (userData.id === req.auth.id || req.auth.role === "admin") {
      responseData.email = userData.email;
      responseData.role = userData.role;
    }

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
module.exports = getUser;
