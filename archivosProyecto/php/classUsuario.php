<?php
    require_once "conexion.php";
    class Usuario extends conexion{
        public function CrearUsuario($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $apellidos = $datos["apellidos"];
            $nickname = $datos["nickname"];
            $correo = $datos["correo"];
            $contrasena = $datos["p"];
            $esProfe = $datos["esProfe"];
            $foto = $datos["foto"];
            $query = "Call registrarUsuario('$nombre','$apellidos','$nickname',
            '$correo','$contrasena',$esProfe,' $foto');";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion){
                $success="success";
                return $success;
            }else{
                $success="fail";
                return $success;
            }
        }
    }
?>
