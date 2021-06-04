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
 in nNombreNvl varchar(150),
 in nVideoLvl varchar(500),
 in nOtrosArchivo varchar(500),
 in nNumeroNivel int)
begin
    insert into Niveles(id_curso,nombreNvl, videoLvl, otrosArchivo, numeroNivel, alta)
    values(nId_curso,nNombreNvl, nVideoLvl, nOtrosArchivo, nNumeroNivel, 1);
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

delimiter $$
create procedure obtenerComentarios (
	in Id_curso int
    )
begin
	select id_usuario,nickname, comentario,fechaPublicacion 
    from comentariosCompletos  
    where id_curs = Id_curso order by fechaPublicacion desc;
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
delimiter $$
create procedure actualizarHistorial (
	in  p_ID_Est int,
    in p_ID_Nivel int
    )
begin
	declare numNivelRegistrado int;
    declare Num_Nivel int;
    declare Num_Curso int;
    
    set Num_Curso = obtNumCurso(p_ID_Nivel);
    
    set numNivelRegistrado = avance(p_ID_Est, p_ID_Nivel);
	set Num_Nivel = obtNumNivel(p_ID_Nivel);
    
    if Num_Nivel > numNivelRegistrado THEN
        update historial
        set       
        avanceLvl = Num_Nivel
		WHERE  id_est = p_ID_Est and id_curs = Num_Curso;
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

delimiter $$
create procedure DePasoNivelCurso( 
in nNombreNvl varchar(150),
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
	set idDelCurso = RegNivCurso(nNombreNvl,nVideoLvl, nOtrosArchivo, nNumeroNivel, nNombre, nDescripcion, nCantidadNivelesCurso, nId_profesor);     
    
end$$

delimiter $$
create procedure getCursosProfEsp(in profeCreadorCursos int)
begin
	select *
    from CursoCompleto 
    where CursoCompleto.Id_Prof = profeCreadorCursos;
end $$

delimiter $$
create procedure getCursosProfEspVentas(in profeCreadorCursos int)
begin
	select *
    from cursosCompletosVentas 
    where cursosCompletosVentas.Id_Prof = profeCreadorCursos;
end $$

delimiter $$
create procedure getFotoCursos(in idCursoImg int)
begin
	select imagenCurso
    from Curso where id_curso=idCursoImg;
end $$

delimiter $$
create procedure getFotoComents(in idUsuarioImg int)
begin
	select imagenPerfil
    from Usuarios where id_usuario=idUsuarioImg;
end $$

delimiter $$
create procedure getCurso(in idCurso int)
begin
	select *,  ROUND( avg(calificarCurso.calificacion), 2) as "Media" 
    from CursoCompleto left join calificarCurso on CursoCompleto.id_curso=calificarCurso.id_cursoCalif
    where CursoCompleto.id_curso = idCurso;
end $$

delimiter $$
create procedure getNiveles(in idCurso int)
begin
	select id_niveles, nombreNvl , videoLvl, numeroNivel, otrosArchivo
    from Niveles where id_curso=idCurso;
end $$

delimiter $$
create procedure getNivel(in idNvl int)
begin
	select id_curso, nombreNvl , videoLvl, numeroNivel, otrosArchivo
    from Niveles where id_niveles=idNvl;
end $$

delimiter $$
create procedure inscribirCurso(
	in  idAlumno int,
    in idCurso int
    )
begin
    insert into inscripcionCurso(id_alumno, idCurso)
    values(idAlumno, idCurso);
    call registrarHistorial(idAlumno,idCurso);
end $$

delimiter $$
create procedure estaInscrito(
	in  idAlumno int,
    in id_Curso int
    )
begin
    select terminado from inscripcionCurso 
    where id_alumno=idAlumno and idCurso=id_Curso;
end $$

delimiter /

create procedure buscarCursoFiltro (in cursoAbuscar varchar(200))
begin
    select * from CursoCompleto where nombre like cursoAbuscar or 
    NombreProfesor like cursoAbuscar or
    Categorias like cursoAbuscar limit 3;  -- concat(%, _NombreUsuario, %)
end/

delimiter $$
create procedure RevisarFinalizacion (
	in  p_ID_Est int,
    in p_ID_Nivel int
    )
begin
    declare Num_Nivel int;
    declare ID_Curso int;    
    declare Num_Total_Curso int;     
    set ID_Curso = obtNumCurso(p_ID_Nivel);    
	set Num_Nivel = obtNumNivel(p_ID_Nivel);
    set Num_Total_Curso = obNivTotalCurso(ID_Curso);
    
    if Num_Nivel = Num_Total_Curso THEN
    update inscripcionCurso
    set
	terminado = true
    where id_alumno = p_ID_Est AND idCurso = ID_Curso;
    END IF;
end $$

delimiter $$
create procedure getCursosAlumno(in p_ID_Alumno int)
begin
select *
from Historial join CursoCompleto on id_curso = Historial.id_curs and Historial.id_est = p_ID_Alumno;
end $$


delimiter $$
create procedure getHistorialAlumno(in p_ID_Alumno int)
begin
select Curso.id_curso, Curso.nombre,Curso.descripcion, cantidadNivelesCurso, group_concat(Categorias.nombre) as "Categorias",
Curso.cantidadNivelesCurso, Historial.avanceLvl
from Usuarios join  Historial on Usuarios.id_usuario = Historial.id_est
join Curso on Historial.id_curs = Curso.id_curso
left join  tablaAsociativaCursoCategoria on  
Curso.id_curso = tablaAsociativaCursoCategoria.id_curso left join Categorias 
on tablaAsociativaCursoCategoria.id_cat = Categorias.id_categorias
where Usuarios.id_usuario = p_ID_Alumno
group by Curso.id_curso order by Curso.id_curso desc;
end $$

delimiter $$
create procedure clificarCurso(in p_ID_Alumno int, in p_ID_Curso int, in p_cal int)
begin
insert into calificarCurso
set id_AlumnoCalif = p_ID_Alumno, id_cursoCalif = p_ID_Curso, calificacion = p_cal;
end $$

 DELIMITER $$
CREATE PROCEDURE getCursosMejoresCalificados()
BEGIN
SELECT * FROM cursosCompletosVentas
ORDER BY calificacion DESC 
LIMIT 3;
END$$


 DELIMITER $$
CREATE PROCEDURE getCursosMasVendidos()
BEGIN
SELECT * FROM cursosCompletosVentas
ORDER BY cursosComprados DESC 
LIMIT 3;
END$$