const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");
const sharp = require("sharp");
const crypto = require("crypto");
const sendgrid = require("@sendgrid/mail");

const { format } = require("date-fns");
//Definimos el diectorio de sibida de imagenes
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

function formatDateToDB(date) {
  return format(new Date(date), "yyyy-MM-dd HH:MM:ss");
}

async function processAndSaveImage(uploadedImage) {
  //creamos el directorio con recursive true por si hay subdirectorios y asi no da error
  await fs.mkdir(imageUploadPath, { recursive: true });
  //leer la imagen que se subio

  const image = sharp(uploadedImage.data);

  const imageInfo = await image.metadata();
  // cambiarle el tamaño si es  eceasario

  console.log(imageInfo);

  if (imageInfo.width > 1000) {
    image.resize(1000);
  }
  //guardar la imagen en un directorio
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  //DEvolver el nombre con que gfue guardado
  return imageFileName;
}

async function deleteUpload(uploadedImage) {
  await fs.unlink(path.join(imageUploadPath, uploadedImage));
}

function randomString(length = 20) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

async function sendMail({ email, title, content }) {
  //configurar APIKey de sendgrid
  sendgrid.setApiKey(process.env.SENDGRID_KEY);
  //configuras mail
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: title,
    text: content,
    html: `
    <div>
    <h1>
    ${title}</h1>
    <p>${content}</p>
    </div>`,
  };
  //enviar mensaje
  await sendgrid.send(message);
}

function generateError(message, code = 500) {
  const error = new Error(message);
  error.httpStatus = code;
  return error;
}

module.exports = {
  formatDateToDB,
  processAndSaveImage,
  deleteUpload,
  randomString,
  sendMail,
  generateError,
};
