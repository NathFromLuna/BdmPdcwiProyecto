create view CursoCompleto as
select Curso.id_curso, Curso.nombre,Curso.descripcion,Curso.videoTrailer,Curso.costo,
cantidadNivelesCurso, group_concat(Categorias.nombre) as "Categorias",
concat(Usuarios.nombre, " ", Usuarios.apellidos) as "NombreProfesor", Usuarios.id_usuario as "Id_Prof"
    from Usuarios join Curso on Usuarios.id_usuario = Curso.id_profesor
    left join  tablaAsociativaCursoCategoria on  
     Curso.id_curso = tablaAsociativaCursoCategoria.id_curso left join Categorias 
    on tablaAsociativaCursoCategoria.id_cat = Categorias.id_categorias
    group by Curso.id_curso order by Curso.id_curso desc;

create view comentariosCompletos as
select Comentarios.id_comentario,Comentarios.id_curs,Usuarios.id_usuario,
	Usuarios.nickname, Comentarios.comentario, Comentarios.fechaPublicacion
	from Usuarios join Comentarios on Usuarios.id_usuario=Comentarios.id_est
    order by Comentarios.fechaPublicacion;

create view cursosCompletosVentas as
select CursoCompleto.id_curso, CursoCompleto.Id_Prof, CursoCompleto.nombre, 
	CursoCompleto.descripcion, CursoCompleto.videoTrailer, CursoCompleto.costo,
    CursoCompleto.cantidadNivelesCurso, count(inscripcionCurso.idCurso) as "cursosComprados", 
    avg(calificarCurso.calificacion) as "calificacion" 
	from CursoCompleto join inscripcionCurso on CursoCompleto.id_curso=inscripcionCurso.idCurso
	left join calificarCurso on CursoCompleto.id_curso=calificarCurso.id_cursoCalif
    group by CursoCompleto.id_curso;