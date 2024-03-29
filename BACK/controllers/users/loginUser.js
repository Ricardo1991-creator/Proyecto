const { getConnection } = require("../../db");
const jsonwebtoken = require("jsonwebtoken");

async function loginUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    // comprobar que se reciben los datos necesarios
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error(
        "Faltan datos para hacer login,necesitas el email y la contraseña"
      );
      error.httpStatus = 409;
      throw error;
    }

    // Seleccionar el usuario de la base de datos y comprobar que las passwords coinciden
    const [dbUser] = await connection.query(
      `
      SELECT id, name,role, active
      FROM users
      WHERE email=? AND password=SHA2(?, 512)
    `,
      [email, password]
    );

    if (dbUser.length === 0) {
      const error = new Error(
        "No hay ningún usuario registrado con ese email o la password es incorrecta"
      );
      error.httpStatus = 401;
      throw error;
    } else if (!dbUser[0].active) {
      const error = new Error(
        "El usuario está registrado pero no activado. Por favor revisa tu email y activalo"
      );
      error.httpStatus = 401;
      throw error;
    }
    // Generar token con información del usuario
    const tokenInfo = {
      id: dbUser[0].id,
      role: dbUser[0].role,
    };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });

    // Devolver el token
    res.send({
      status: "ok",
      data: {
        dbUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = loginUser;
