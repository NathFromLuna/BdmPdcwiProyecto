create view CursoCompleto as
select Curso.id_curso, Curso.nombre,cantidadNivelesCurso, group_concat(Categorias.nombre) as "Categorias",
concat(Usuarios.nombre, " ", Usuarios.apellidos) as "NombreProfesor", Usuarios.id_usuario as "Id_Prof"
    from Usuarios join Curso on Usuarios.id_usuario = Curso.id_profesor
    left join  tablaAsociativaCursoCategoria on  
     Curso.id_curso = tablaAsociativaCursoCategoria.id_curso left join Categorias 
    on tablaAsociativaCursoCategoria.id_cat = Categorias.id_categorias
    group by Curso.id_curso;