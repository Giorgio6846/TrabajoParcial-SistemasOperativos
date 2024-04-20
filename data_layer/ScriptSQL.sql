-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-04-20 05:19:03.579

-- tables
-- Table: autor
CREATE TABLE autor (
    idAutor int  NOT NULL,
    nombresApellidos varchar(255)  NOT NULL,
    CONSTRAINT autor_pk PRIMARY KEY (idAutor)
);

-- Table: carritoCompras
CREATE TABLE carritoCompras (
    idCarritoCompras int  NOT NULL,
    idUsuario int  NOT NULL,
    idLibro int  NOT NULL,
    CONSTRAINT carritoCompras_pk PRIMARY KEY (idCarritoCompras)
);

-- Table: departamento
CREATE TABLE departamento (
    idDepartamento int  NOT NULL,
    nombre varchar(75)  NOT NULL,
    CONSTRAINT departamento_pk PRIMARY KEY (idDepartamento)
);

-- Table: direccion
CREATE TABLE direccion (
    idDireccion varchar(75)  NOT NULL,
    idDistrito int  NOT NULL,
    nombreDireccion int  NOT NULL,
    CONSTRAINT direccion_pk PRIMARY KEY (idDireccion)
);

-- Table: distrito
CREATE TABLE distrito (
    idDistrito int  NOT NULL,
    idProvincia int  NOT NULL,
    nombreDistrito int  NOT NULL,
    CONSTRAINT distrito_pk PRIMARY KEY (idDistrito)
);

-- Table: editorial
CREATE TABLE editorial (
    idEditorial int  NOT NULL,
    nombre varchar(100)  NOT NULL,
    CONSTRAINT editorial_pk PRIMARY KEY (idEditorial)
);

-- Table: libro
CREATE TABLE libro (
    idLibro int  NOT NULL,
    idEditorial int  NOT NULL,
    idAutor int  NOT NULL,
    nombre varchar(100)  NOT NULL,
    precio money  NOT NULL,
    numPaginas int  NOT NULL,
    anhoPublicado date  NOT NULL,
    CONSTRAINT libro_pk PRIMARY KEY (idLibro)
);

-- Table: provincia
CREATE TABLE provincia (
    idProvincia int  NOT NULL,
    idDepartamento int  NOT NULL,
    nombreProvincia varchar(75)  NOT NULL,
    CONSTRAINT provincia_pk PRIMARY KEY (idProvincia)
);

-- Table: usuario
CREATE TABLE usuario (
    idUsuario int  NOT NULL,
    idDireccion varchar(75)  NOT NULL,
    nombreUsuario varchar(75)  NOT NULL,
    apellidosUsuario varchar(75)  NOT NULL,
    telefono varchar(9)  NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY (idUsuario)
);

-- foreign keys
-- Reference: carritoCompras_libro (table: carritoCompras)
ALTER TABLE carritoCompras ADD CONSTRAINT carritoCompras_libro
    FOREIGN KEY (idLibro)
    REFERENCES libro (idLibro)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: carritoCompras_usuario (table: carritoCompras)
ALTER TABLE carritoCompras ADD CONSTRAINT carritoCompras_usuario
    FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: direccion_distrito (table: direccion)
ALTER TABLE direccion ADD CONSTRAINT direccion_distrito
    FOREIGN KEY (idDistrito)
    REFERENCES distrito (idDistrito)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: distrito_provincia (table: distrito)
ALTER TABLE distrito ADD CONSTRAINT distrito_provincia
    FOREIGN KEY (idProvincia)
    REFERENCES provincia (idProvincia)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: libro_autor (table: libro)
ALTER TABLE libro ADD CONSTRAINT libro_autor
    FOREIGN KEY (idAutor)
    REFERENCES autor (idAutor)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: libro_editorial (table: libro)
ALTER TABLE libro ADD CONSTRAINT libro_editorial
    FOREIGN KEY (idEditorial)
    REFERENCES editorial (idEditorial)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: provincia_departamento (table: provincia)
ALTER TABLE provincia ADD CONSTRAINT provincia_departamento
    FOREIGN KEY (idDepartamento)
    REFERENCES departamento (idDepartamento)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: usuario_direccion (table: usuario)
ALTER TABLE usuario ADD CONSTRAINT usuario_direccion
    FOREIGN KEY (idDireccion)
    REFERENCES direccion (idDireccion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

