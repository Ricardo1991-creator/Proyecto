const jsonwebtoken = require("jsonwebtoken");
const { getConnection } = require("../db");

async function isUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    // Extraer token de los headers de la petición
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error("Falta la cabecera de autorización");
      error.httpStatus = 401;
      throw error;
    }

    // Comprobar que el token es válido
    // y decodificar el contenido del token
    let tokenInfo;
    try {
      tokenInfo = jsonwebtoken.verify(authorization, process.env.SECRET);
    } catch (error) {
      const tokenError = new Error("El token no es válido");
      tokenError.httpStatus = 401;
      throw tokenError;
    }

    const [result] = await connection.query(
      `
      SELECT lastAuthUpdate
      FROM users
      WHERE id=?
      `,
      [tokenInfo.id]
    );

    if (result.length === 0) {
      const error = new Error("el usuario no existe en la base de datos");
      error.httpStatus = 401;
      throw error;
    }

    const tokenCreatedAt = new Date(tokenInfo.iat * 1000);
    const lastAuthUpdate = new Date(result[0].lastAuthUpdate);

    console.log(tokenCreatedAt, lastAuthUpdate);
    if (tokenCreatedAt < lastAuthUpdate) {
      const error = new Error(
        "El token no es valido. Haz login para conseguir otro"
      );
      error.httpStatus = 401;
      throw error;
    }

    // Meter ese contenido en el objeto de petición para futuro uso
    req.auth = tokenInfo;

    // Pasar al siguiente middleware
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = isUser;
