const { getConnection } = require("../../db");
const { deleteUpload, generateError } = require("../../helpers");

async function deleteEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    const [current] = await connection.query(
      `
      SELECT *
      FROM moneys
      WHERE id=?
    `,
      [id]
    );

    if (current[0] !== req.auth.id && req.auth.role !== "user") {
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

    /* // Seleccionar posibles imagenes asociadas
    const [images] = await connection.query(
      `
      SELECT image
      FROM moneys_images
      WHERE id=?
      `,
      [id]
    ); */

    /*  // Borra los ficheros
    for (const image of images) {
      await deleteUpload(image.image);
    } */

    // Borrar imágenes de la tabla

    /*   await connection.query(
      `
      DELETE *
      FROM moneys_images
      WHERE id=?
    `,
      [id]
    ); */

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
