delimiter /
create procedure obtenerPerfil (in correoUs varchar(70),
 in contraseñaUs varchar(40))
begin
	select id_usuario, nombre, apellidos, nickname, esMaestro, imagenPerfil from Usuarios 
    where correoUs=correo and contraseñaUs=contraseña;
end/
    
delimiter /
create procedure registrarUsuario (
 in nNombre varchar(50),
 in nApellidos varchar(150),
 in nNickname varchar(100),
 in nCorreo varchar(70),
 in nContraseña varchar(40),
 in esTeacher bool,
 in nImagenPerfil mediumblob)
begin
    insert into Usuarios(nombre, apellidos, nickname, correo, contraseña,
    esMaestro, imagenPerfil, alta)
    values(nNombre, nApellidos, nNickname, nCorreo, nContraseña,
    esTeacher, nImagenPerfil, 1);
end/

delimiter /
create procedure registrarCurso (
in nNombre varchar(70),
 in nDescripcion varchar(200),
 in nImagenCurso mediumblob,
 in nVideoTrailer varchar(500),
 in nCosto float,
 in nCantidadNivelesCurso int,
 in nId_profesor int,
 in nId_cat1 int,
 in nID_cat2 int
 )
begin
   declare idDelCurso int;    
    insert into Curso(nombre, descripcion, imagenCurso, videoTrailer, 
    costo, cantidadNivelesCurso, id_profesor, alta)
    values(nNombre, nDescripcion, nImagenCurso, nVideoTrailer, 
    nCosto, nCantidadNivelesCurso, nId_profesor, 1);
	set idDelCurso = RegCatCurs(nId_cat1, nID_cat2, nNombre, nDescripcion, nCantidadNivelesCurso, nId_profesor);     
    
end/

delimiter /
create procedure registrarNivel (in nId_curso int,
 in nVideoLvl varchar(500),
 in nOtrosArchivo varchar(500),
 in nNumeroNivel int)
begin
    insert into Niveles(id_curso, videoLvl, otrosArchivo, numeroNivel, alta)
    values(nId_curso, nVideoLvl, nOtrosArchivo, nNumeroNivel, 1);
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
-- drop procedure editarUsuario

delimiter /
create procedure eliminarUsuario (in _usID int)
begin
    delete from usuarios where usID=_usID;
end/

delimiter /
create procedure buscarCurso (in cursoAbuscar varchar(200))
begin
    select nombre, id_curso from Curso where nombre like cursoAbuscar ;  -- concat(%, _NombreUsuario, %)
end/

delimiter $$
create procedure guardarComentarios (
	in Id_estudiante int,
    in Id_curso int,  
	in mensaje varchar(250)
    )
begin
    insert into Comentarios(id_est, id_curs, comentario)
    values(Id_estudiante, Id_curso, mensaje);
end $$


create procedure obtenerComentarios (
	in Id_curso int
    )
begin
	select nickname, imagenPerfil, comentario 
    from Usuarios left join comentarios on id_comentario = id_usuario
    where id_curs = Id_curso;
end $$

create procedure nuevaCategoria (
	in  p_nombre varchar(50),
    in p_descripcion varchar(200),
    in p_DeQuien int
    )
begin
    insert into Categorias(nombre, descripcion, alta, id_creadorCat)
    values(p_nombre, p_descripcion, 1, p_DeQuien);
end $$

create procedure obtenerCategorias ()
begin
	select id_categorias, nombre
    from categorias;
end $$

create procedure registrarHistorial (
	in  p_ID_Est int,
    in p_ID_Curso int
    )
begin
    insert into historial(id_est, id_curs, avanceLvl)
    values(p_ID_Est, p_ID_Curso, 0);
end $$

create procedure actualizarHistorial (
	in  p_ID_Est int,
    in p_ID_Curso int,
    in p_Num_nivel int
    )
begin
	declare numNivelRegistrado int;
    set numNivelRegistrado = avance(p_ID_Est, p_ID_Curso);
    
    if p_Num_nivel > numNivelRegistrado THEN
        update historial
        set       
        avanceLvl = p_Num_nivel
		WHERE  id_est = p_ID_Est and id_curs = p_ID_Curso;
    END IF;
end $$

create procedure registrarCursoCategoria (
	in  p_ID_Cat int,
    in p_ID_Curso int
    )
begin
    insert into tablaasociativacursocategoria(id_cat, id_curso)
    values(p_ID_Cat, p_ID_Curso);
end $$

create procedure DePasoNivelCurso (
 in nVideoLvl varchar(500),
 in nOtrosArchivo varchar(500),
 in nNumeroNivel int,
in nNombre varchar(70),
in nDescripcion varchar(200),
in nCantidadNivelesCurso int,
in nId_profesor int
 )
begin
   declare idDelCurso int;    
	set idDelCurso = RegNivCurso(nVideoLvl, nOtrosArchivo, nNumeroNivel, nNombre, nDescripcion, nCantidadNivelesCurso, nId_profesor);     
    
end$$
    
    
    