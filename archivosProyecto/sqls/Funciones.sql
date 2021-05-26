delimiter $$
CREATE FUNCTION `avance` (p_ID_Est int, p_ID_Curso int)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	declare numNivel int;        
    select avanceLvl
    into numNivel
    from historial
    where id_est = p_ID_Est and id_curs = p_ID_Curso;
RETURN numNivel;
END$$

CREATE FUNCTION `RegCatCurs` (
p_ID_cat int, 
p_ID_cat2 int, 
nNombre varchar(70),
nDescripcion varchar(200),
nCantidadNivelesCurso int,
nId_profesor int)
RETURNS INTEGER
DETERMINISTIC
BEGIN
declare idDelCurso int; 
	select id_curso
    into idDelCurso
    from Curso
    where nombre = nNombre and descripcion = nDescripcion and cantidadNivelesCurso = nCantidadNivelesCurso and id_profesor = nId_profesor;
CALL registrarCursoCategoria(p_ID_cat, idDelCurso);
CALL registrarCursoCategoria(p_ID_cat2, idDelCurso);
RETURN 1;
END$$

CREATE FUNCTION `RegNivCurso` (
 nVideoLvl varchar(500),
 nOtrosArchivo varchar(500),
 nNumeroNivel int,
nNombre varchar(70),
nDescripcion varchar(200),
nCantidadNivelesCurso int,
nId_profesor int)
RETURNS INTEGER
DETERMINISTIC
BEGIN
declare idDelCurso int; 
	select id_curso
    into idDelCurso
    from Curso
    where nombre = nNombre and descripcion = nDescripcion and cantidadNivelesCurso = nCantidadNivelesCurso and id_profesor = nId_profesor;
CALL registrarNivel(idDelCurso, nVideoLvl, nOtrosArchivo, nNumeroNivel);
RETURN 1;
END$$

