const { getConnection } = require("../../db");

const { newEntrySchema } = require("../../vallidators/moneyVallidators");
const {
  processAndSaveImage,
  generateError,
  showDebug,
} = require("../../helpers");

async function newMoney(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await newEntrySchema.validateAsync(req.body);
    // Sacar de req.body los datos que necesitio
    const { price, locate, money_type, money_country, coments } = req.body;

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO moneys(
        price,
        locate,
        money_type,
        money_country,
        coments,
        id_user_seller,
        lastUpdate)
        VALUES(?,?,?,?,?,?,?,NOW())
        `,
      [price, locate, money_type, money_country, coments, req.auth.id]
    );
    const images = [];
    console.log(req.files);
    if (req.files && Object.keys(req.files).length > 0) {
      for (const [imageName, imageData] of Object.entries(req.files).slice(
        0,
        3
      )) {
        try {
          showDebug(imageName);

          const processedImage = await processAndSaveImage(imageData);

          images.push(processedImage);

          await connection.query(
            ` 
          INSERT INTO moneys_images(uploadDate,image,money_id)
          VALUES (UTC_TIMESTAMP,?,?)
          `,
            [processedImage, result.insertId]
          );
        } catch (error) {
          throw generateError(
            "no se pudo procesar la imagen.Intentalo de nuevo",
            400
          );
        }
      }
    }
    // Si hay imágenes, procesar cada imagen y meterla en la tabla money_images
    // Con la referencia a la entrada que acabo de meter

    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        price,
        locate,
        money_type,
        money_country,
        coments,
        images,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newMoney;
