DROP DATABASE IF EXISTS objetos_perdidos_fcc;
CREATE DATABASE objetos_perdidos_fcc;
USE objetos_perdidos_fcc;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('student', 'admin') DEFAULT 'student',
  activo TINYINT(1) DEFAULT 1,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reportes de objetos
CREATE TABLE reportes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_objeto VARCHAR(150) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(255),
  fecha_encontrado DATE NOT NULL,
  hora_encontrado TIME NOT NULL,
  zona VARCHAR(150) NOT NULL,
  estado ENUM('Pendiente','Validado','Reclamado','Rechazado') DEFAULT 'Pendiente',
  usuario_id INT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

ALTER TABLE reportes
  ADD COLUMN nombre_reclamante VARCHAR(100) NULL,
  ADD COLUMN matricula_reclamante VARCHAR(20) NULL,
  ADD COLUMN fecha_entrega DATETIME NULL;

-- Usuario administrador inicial
INSERT INTO usuarios (nombre, email, password, rol)
VALUES (
  'Administrador FCC',
  'admin@estudiante.buap.mx',
  '$2b$10$davT4XXL38xqqILdDsdH.u.vvYqXSUfAmHUND6nDTsV1Fv9ETKoce',
  'admin'
);

INSERT INTO usuarios (nombre, email, password, rol)
VALUES (
  'Fabian Marcial',
  'fabian.marcial@estudiante.buap.mx',
  '$2b$10$davT4XXL38xqqILdDsdH.u.vvYqXSUfAmHUND6nDTsV1Fv9ETKoce',
  'student'
);

-- Verificaciones
SELECT id, nombre, email, rol, creado_en FROM usuarios;
SELECT * FROM reportes;