create database crashea;

use crashea;

delimiter /
create procedure obtenerPerfil (in correoUs varchar(70),
 in contraseñaUs varbinary(40))
begin
	select nombre, apellidos, nickname, imagenPerfil from Usuarios 
    where correoUs=correo and contraseñaUs=contraseña;
end/

delimiter /
create procedure esMaestro (in idUs int)
begin
	select id_usuario from Usuarios 
    where id=Usid_usuario and esMaestro=true;
end/
    
  
    
    
    