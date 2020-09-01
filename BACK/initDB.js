require("dotenv").config();

const faker = require("faker/locale/es");
const { getConnection } = require("./db");
const { random } = require("lodash");

let connection;

async function main() {
  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    /*   await connection.query(`

    SET FOREING_KEY_CHECKS = 0`); */

    console.log("Borrando tablas");
    await connection.query("DROP TABLE IF EXISTS bookings CASCADE");
    await connection.query("DROP TABLE IF EXISTS moneys_images CASCADE");
    await connection.query("DROP TABLE IF EXISTS moneys CASCADE");
    await connection.query("DROP TABLE IF EXISTS users CASCADE");

    // Crear las tablas de nuevo
    console.log("Creando tablas");
    await connection.query(`


    CREATE TABLE users (
      
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        createDate DATETIME NOT NULL,
        name VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        dni VARCHAR(10) ,
        address VARCHAR(50) ,
        bank_account VARCHAR(50),
        zip_code VARCHAR(5),
        city VARCHAR(50) ,
        telephone VARCHAR(15) ,
        email VARCHAR(50) UNIQUE NOT NULL,
        user_name VARCHAR(50) UNIQUE,
        password VARCHAR(128)NOT NULL,
        active BOOLEAN DEFAULT FALSE,
        registrationCode VARCHAR(50),
        role ENUM("admin", "user") DEFAULT "user",
        lastUpdate DATETIME NOT NULL,
        lastAuthUpdate DATETIME
            );
  `);
    await connection.query(`
    CREATE TABLE moneys_images (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
        uploadDate DATETIME NOT NULL,
        image TINYTEXT,
        money_id INTEGER NOT NULL
    )
    
    
    `);
    await connection.query(`
    CREATE TABLE moneys (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      createDate DATETIME NOT NULL,
      price DECIMAL(5,4) DEFAULT 0,
      locate VARCHAR(50) NOT NULL,
      money_type VARCHAR(100),
      money_country VARCHAR (50),
      coments VARCHAR (100),
      id_user INT UNSIGNED,
      FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
      lastUpdate DATETIME NOT NULL
        
      );
    `);

    await connection.query(`
    CREATE TABLE bookings (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          createDate DATETIME NOT NULL,
          rating INT(1),
          confirmed BOOLEAN DEFAULT TRUE,
          lastUpdate DATETIME NOT NULL,
          id_money INT UNSIGNED,
          FOREIGN KEY (id_money) REFERENCES moneys (id) ON DELETE CASCADE,
          id_user INT UNSIGNED,
          FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
           );
           `);

    /* 
    await connection.query(`
    SET FOREIGN_KEY_CHECKS = 1`); */

    // Meter datos de prueba en las tablas

    console.log("Creando usuario administrador");
    //COMPLETAR ADMIN
    await connection.query(
      `
      INSERT INTO users(createDate,name,lastname,dni,address,zip_code,city,telephone,email,bank_account,user_name,password, active,role, lastUpdate)
      VALUES(UTC_TIMESTAMP,"Ricardo","Puig Fraga","545545555","Rua conduzo 41","15173","coruña","671447049", "ricardo@ricardo.com","0505050505050505050505","ricardo_puig",
      SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}", 512), true,"admin", UTC_TIMESTAMP)
    `
    );

    console.log("Metiendo datos de prueba en users");
    const users = 20;

    for (let index = 0; index < users; index++) {
      const name = faker.name.firstName();
      const lastname = faker.name.lastName();
      const dni = random(30000000, 49999999);
      const address = faker.address.streetAddress();
      const zipCode = faker.address.zipCode();
      const city = faker.address.city();
      const telephone = faker.phone.phoneNumber();
      const email = faker.internet.email();
      const bankAccount = faker.finance.iban();
      const userName = faker.internet.userName();
      //const password = faker.internet.password();

      await connection.query(
        `
        INSERT INTO users (createDate,name, lastname, dni, address, zip_code, city, telephone, email, bank_account, user_name, password,active, lastUpdate)
        VALUES(UTC_TIMESTAMP,
          "${name}",
          "${lastname}",
          "${dni}",
          "${address}",
          "${zipCode}",
          "${city}",
          "${telephone}",
        "${email}", 
        "${bankAccount}",
        "${userName}",
        SHA2("${12345678}", 512),
        1,
        UTC_TIMESTAMP)
         `
      );
    }
    const moneys = 20;
    for (let index = 0; index < moneys; index++) {
      const price = faker.finance.amount();
      const locate = faker.address.country();
      const coments = faker.lorem.words();
      const type = faker.finance.currencyName();
      const country = faker.address.country();

      await connection.query(
        `
        INSERT INTO moneys(
          createDate,
          price,
          locate,
          coments,
          money_type,
          money_country,
          id_user,
          lastUpdate
        )
        VALUES(
          UTC_TIMESTAMP,
          "${random(0.5, 1.5, price)}",
          "${locate}",
          "${coments}",
          "${type}",
          "${country}",
          "${random(1, users)}",
          UTC_TIMESTAMP


        )`
      );
    }

    const bookings = 300;

    for (let index = 0; index < bookings; index++) {
      const rating = random(1, 5);

      await connection.query(
        `
        INSERT INTO bookings(
          createDate,
          rating,
          confirmed,
          id_user,
          id_money,
          lastUpdate

        )

        VALUES (
         UTC_TIMESTAMP,
          "${rating}",0,"${random(1, users)}","${random(
          1,
          moneys
        )}",UTC_TIMESTAMP
        )
        `
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
