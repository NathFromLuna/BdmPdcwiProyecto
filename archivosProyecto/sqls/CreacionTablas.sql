create database crashea;

use crashea;

create table Usuarios(
	id_usuario int not null unique auto_increment,
    nombre varchar(50) not null,
    apellidos varchar (150),
    nickname varchar(100) unique,
    correo varchar(70) not null, 
    contraseña varbinary(40) not null,
    esMaestro bool,
    imagenPerfil mediumblob not null,  
	primary key (id_usuario)
);

create table Categorias(
	id_categorias int not null unique auto_increment,
    nombre varchar(50) unique, 
    descripcion varchar(200),
    alta bool DEFAULT NULL,
    primary key (id_categorias)
);

create table Curso(
	id_curso int not null unique auto_increment,
    nombre varchar(70) not null unique,
    descripcion varchar(200) not null,
    imagenCurso mediumblob not null,
    videoTrailer mediumblob not null,
    costo float not null,
    cantidadNivelesCurso int not null,
    id_profesor int,
    alta bool DEFAULT NULL,
	primary key (id_curso),
    foreign key (id_profesor) references Usuarios(id_usuario)
);

create table Niveles(
	id_niveles int not null unique auto_increment,
    id_curso int,
    videoLvl mediumblob not null,
    otrosArchivo mediumblob,
	numeroNivel int not null,
    alta bool DEFAULT NULL,
	primary key (id_niveles),
    foreign key (id_curso) references Curso(id_curso)
);

create table Comentarios(
	id_comentario int not null unique auto_increment,
    id_est int,
    id_curs int,
    comentario varchar(250) not null,
	primary key (id_comentario),
    foreign key (id_est) references Usuarios(id_usuario),
	foreign key (id_curs) references Curso(id_curso)
);

create table Historial(
	id_historial int not null unique auto_increment,
    id_est int,
    id_curs int,
    avanceLvl varchar(10),
	primary key (id_historial),
	foreign key (id_est) references Usuarios(id_usuario),
	foreign key (id_curs) references Curso(id_curso)
);

create table tablaAsociativaCursoCategoria(
	id_tablaAsociativaCC int not null unique auto_increment,
    id_cat int,
    id_curso int,
    primary key (id_tablaAsociativaCC),
    foreign key (id_cat) references Categorias(id_categorias),
	foreign key (id_curso) references Curso(id_curso)
);

create table Mensajes(
	id_mensaje int not null unique auto_increment,
    id_de int,
    id_para int,
    mensaje varchar(250) not null,
    primary key (id_mensaje),
    foreign key (id_de) references Usuarios(id_usuario),
	foreign key (id_para) references Usuarios(id_usuario)
)






