use crashea;
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
END
