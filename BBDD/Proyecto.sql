USE proyectoMonedas;

 
SET FOREIGN_KEY_CHECKS = 0; 

CREATE TABLE usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
apellidos VARCHAR(50) NOT NULL,
dni VARCHAR(10) NOT NULL ,
direccion VARCHAR(50) NOT NULL,
codigo_postal VARCHAR(5)NOT NULL,
ciudad VARCHAR(50)NOT NULL,
telefono VARCHAR(15)NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
numero_cuenta VARCHAR(20) NOT NULL UNIQUE ,
usuario VARCHAR(20) NOT NULL UNIQUE,
contrasena VARCHAR(128)NOT NULL
);

CREATE TABLE reservas(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
moneda_seleccionada VARCHAR(50),
cantidad_seleccionada INT DEFAULT 0,
fecha_reserva DATE,
tipo_moneda ENUM('Dolares','libras','euros'),
fecha_entrega DATE,
pedido VARCHAR(10),
direccion_entrega VARCHAR(50),
nombre VARCHAR(50) NOT NULL UNIQUE,
apellidos VARCHAR(50)NOT NULL UNIQUE,
email VARCHAR(50) NOT NULL UNIQUE,
telefono VARCHAR(50) NOT NULL UNIQUE ,
pago FLOAT DEFAULT 0,
fecha_pago DATE,
total_pago FLOAT DEFAULT 0,
tipo_tarjeta ENUM('visa','mastercard')NOT NULL,
numero_tarjeta VARCHAR(20) NOT NULL UNIQUE,
fecha_caducidad DATE NOT NULL,
cvc VARCHAR(3) NOT NULL,
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
id_moneda INT UNSIGNED,
FOREIGN KEY (id_moneda) REFERENCES moneda (id)
);
CREATE TABLE monedas(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
precio FLOAT DEFAULT 0,
localizacion VARCHAR(50) NOT NULL,
tipo_moneda ENUM('Dolares','Libras','Euros'),
pais_moneda ENUM('ES','UK','EEUU'),
rating VARCHAR(20),
comentarios VARCHAR (100),
puntuacion VARCHAR (5),
vendedor VARCHAR (50) NOT NULL UNIQUE,
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
  

SET FOREIGN_KEY_CHECKS = 1; 