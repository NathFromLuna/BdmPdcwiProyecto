delimiter $$
CREATE trigger CategoriaParaCurso 
after insert on Curso for each row 
BEGIN
	INSERT INTO tablaAsociativaCursoCategoria ( id_cat, id_curso)
    values (, new.id_curso)
END $$

