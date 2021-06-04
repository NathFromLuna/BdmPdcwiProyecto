delimiter $$
CREATE FUNCTION `avance` (p_ID_Est int, p_ID_Nivel int)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	declare numNivel int;
    declare numCurso int;
    
    select id_curso
    into numCurso
    from Niveles
    where id_niveles = p_ID_Nivel;
    
    
    select avanceLvl
    into numNivel
    from historial
    where id_est = p_ID_Est and id_curs = numCurso;
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
nNombreNvl varchar(150),
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
CALL registrarNivel(idDelCurso,nNombreNvl, nVideoLvl, nOtrosArchivo, nNumeroNivel);
RETURN 1;
END$$

delimiter $$
CREATE FUNCTION `obtNumNivel` (p_ID_Niv int)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	declare numNivel int;        
    select numeroNivel
    into numNivel
    from Niveles
    where id_niveles = p_ID_Niv ;
RETURN numNivel;
END$$

delimiter $$
CREATE FUNCTION `obtNumCurso` (p_ID_Niv int)
RETURNS INTEGER
DETERMINISTIC
BEGIN
-- Manda el ID curso, es solo que la programadora es muy floja para cambiar 
-- el nombre de las variables y no le importa confundirse
	declare numNivel int;        
    select id_curso
    into numNivel
    from Niveles
    where id_niveles = p_ID_Niv ;
RETURN numNivel;
END$$

delimiter $$
CREATE FUNCTION `obNivTotalCurso` (p_ID_Curso int)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	declare numTotal int;
    
    select cantidadNivelesCurso
    into numTotal
    from Curso
    where id_curso = p_ID_Curso;
RETURN numTotal;
END$$

