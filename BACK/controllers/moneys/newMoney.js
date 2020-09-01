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
        createDate,
        price,
        locate,
        money_type,
        money_country,
        coments,
        id_user,
        lastUpdate)
        VALUES(UTC_TIMESTAMP,?,?,?,?,?,?,UTC_TIMESTAMP)
        `,
      [price, locate, money_type, money_country, coments, req.auth.id]
    );

    if (req.files && req.files.image) {
      try {
        const processedImage = await processAndSaveImage(req.files.image);
        console.log(processedImage);

        await connection.query(
          ` 
          INSERT INTO moneys_images(uploadDate,image,money_id)
          VALUES (UTC_TIMESTAMP,?,?)
          `,
          [processedImage, result.insertId]
        );
        res.send({
          status: "ok",
          data: {
            id: result.insertId,
            price,
            locate,
            money_type,
            money_country,
            coments,
            processedImage,
          },
        });
      } catch (error) {
        throw generateError(
          "no se pudo procesar la imagen.Intentalo de nuevo",
          400
        );
      }
    } else {
      res.send({
        status: "ok",
        data: {
          id: result.insertId,
          price,
          locate,
          money_type,
          money_country,
          coments,
        },
      });
    }

    // Si hay imágenes, procesar cada imagen y meterla en la tabla money_images
    // Con la referencia a la entrada que acabo de meter

    // Devolver el resultado
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newMoney;
