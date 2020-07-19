const { getConnection } = require("../../db");
const { deleteUpload, generateError } = require("../../helpers");

async function deleteEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    // Comprobar que existe esa id y si no dar error404
    const [current] = await connection.query(
      `
      SELECT id_user_seller
      FROM moneys
      WHERE id=?
    `,
      [id]
    );

    if (
      current[0].id_user_seller !== req.auth.id &&
      req.auth.role !== "admin"
    ) {
      throw generateError("No tienes permisos para borrar esta entrada", 403);
    }

    // Borrar la entrada de la tabla
    await connection.query(
      `
      DELETE FROM moneys
      WHERE id=?
    `,
      [id]
    );

    // Seleccionar posibles imagenes asociadas
    const [images] = await connection.query(
      `
      SELECT image
      FROM money_images
      WHERE entry_id=?
      `,
      [id]
    );

    // Borra los ficheros
    for (const image of images) {
      await deleteUpload(image.image);
    }

    // Borrar imágenes de la tabla

    await connection.query(
      `
      DELETE FROM money_images
      WHERE entry_id=?
    `,
      [id]
    );

    // Borrar votos asociados a esa entrda en la tabla (diary_votes)
    await connection.query(
      `
      SELECT rating
      DELETE FROM moneys
      WHERE entry_id=?
      `,
      [id]
    );

    res.send({
      status: "ok",
      message: `La entrada ${id} de la tabla moneys fue borrada y también sus votos e imágenes`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteEntry;
