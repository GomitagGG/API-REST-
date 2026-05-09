create database tablas_web;
show databases;

CREATE TABLE posts_foro (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(180) NOT NULL ,
  contenido TEXT NOT NULL,
  autor_alias VARCHAR(100),
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  vistas INT DEFAULT 0 NOT NULL,
  cerrado BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);

CREATE TABLE turnos_clinica (
  id INT NOT NULL AUTO_INCREMENT,
  paciente_nombre VARCHAR(120) NOT NULL,
  especialidad VARCHAR(80) NOT NULL,
  medico_nombre VARCHAR(120) NOT NULL,
  fecha_turno DATETIME DEFAULT CURRENT_TIMESTAMP,
  consultorio VARCHAR(20) NOT NULL,
  estado VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

