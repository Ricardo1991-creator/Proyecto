const { getConnection } = require("../../db");
const { processAndSaveImage, generateError } = require("../../helpers");

async function uploadEntryImage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // Comprobar que el usuario puede actualizas las imagenes de la entrada
    // Seleccionar la entrada del diario con la id
    const [current] = await connection.query(
      `
        SELECT id
        FROM moneys
        WHERE id=?
        `,
      [id]
    );

    // Comprobar que el usuario puede editar esta entrada
    const [currentEntry] = current;

    if (currentEntry.id !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("No tienes permisos para editar esta entrada", 403);
    }

    // Comprobar que la entrada tenga menos de 3 imágenes ya asociadas
    const [images] = await connection.query(
      `
      SELECT id
      FROM moneys_images
      WHERE money_id=?
    `,
      [id]
    );

    if (images.length >= 3) {
      throw generateError(
        "No se pueden subir imagenes a esta entrada, borra alguna primero",
        406
      );
    }

    // Subir la imagen
    if (req.files && req.files.image) {
      // Procesamos e insertamos imagen
      try {
        const processedImage = await processAndSaveImage(req.files.image);
        await connection.query(
          `
          INSERT INTO moneys_images (uploadDate, image, entry_id)
          VALUES(NOW(), ?, ?)
          `,
          [processedImage, id]
        );
        console.log(processedImage);
      } catch (error) {
        throw generateError(
          "No se pudo procesar la imagen. Inténtalo de nuevo",
          500
        );
      }
    } else {
      throw generateError("No se subió una imagen", 400);
    }

    res.send({
      status: "ok",
      message: "Imagen subida",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = uploadEntryImage;
