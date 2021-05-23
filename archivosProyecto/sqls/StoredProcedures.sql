/*create database crashea;*/

use crashea;

delimiter /
create procedure obtenerPerfil (in correoUs varchar(70),
 in contraseñaUs varchar(40))
begin
	select id_usuario, nombre, apellidos, nickname, esMaestro, imagenPerfil from Usuarios 
    where correoUs=correo and contraseñaUs=contraseña;
end/

drop procedure obtenerPerfil

delimiter /
create procedure esMaestro (in idUs int)
begin
	select id_usuario from Usuarios 
    where id=Usid_usuario and esMaestro=true;
end/
    
delimiter /

create procedure registrarUsuario (in nNombre varchar(50),
 in nApellidos varchar(150),
 in nNickname varchar(100),
 in nCorreo varchar(70),
 in nContraseña varchar(40),
 in esTeacher bool,
 in nImagenPerfil mediumblob)
begin
    insert into Usuarios(nombre, apellidos, nickname, correo, contraseña,
    esMaestro, imagenPerfil)
    values(nNombre, nApellidos, nNickname, nCorreo, nContraseña,
    esTeacher, nImagenPerfil);
end/

delimiter /
create procedure registrarCurso (in nNombre varchar(70),
 in nDescripcion varchar(200),
 in nImagenCurso mediumblob,
 in nVideoTrailer mediumblob,
 in nCosto float,
 in nCantidadNivelesCurso int,
 in nId_profesor int)
begin
    insert into Curso(nombre, descripcion, imagenCurso, videoTrailer, 
    costo, cantidadNivelesCurso, id_profesor)
    values(nNombre, nDescripcion, nImagenCurso, nVideoTrailer, 
    nCosto, nCantidadNivelesCurso, nId_profesor);
end/

delimiter /
create procedure registrarNivel (in nId_curso int,
 in nVideoLvl mediumblob,
 in nOtrosArchivo mediumblob,
 in nNumeroNivel int)
begin
    insert into Niveles(id_curso, videoLvl, otrosArchivo, numeroNivel)
    values(nId_curso, nVideoLvl, nOtrosArchivo, nNumeroNivel);
end/

delimiter /
create procedure editarUsuario (in idUs int, in nNombre varchar(50),
 in nApellidos varchar(150),
 in nNickname varchar(100),
 in nCorreo varchar(70),
 in nImagenPerfil mediumblob)
begin
	update Usuarios set nombre=nNombre,apellidos=nApellidos,
    nickname=nNickname, correo=nCorreo,
    imagenPerfil=nImagenPerfil where id_usuario=idUs;
end/
drop procedure editarUsuario

delimiter /
create procedure eliminarUsuario (in _usID int)
begin
    delete from usuarios where id_usuario=_usID;
end/


delimiter /
create procedure buscarCurso (in cursoAbuscar varchar(200))
begin
    select nombre, id_curso from Curso where nombre like cursoAbuscar ;  -- concat(%, _NombreUsuario, %)
end/

call buscarCurso ('%r%') -- enviar comilla, porcentaje, variable, porcentaje, comilla
    

    