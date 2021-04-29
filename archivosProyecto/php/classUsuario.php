<?php
    require_once "conexion.php";
    session_start();
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
        public function iniciarSesion($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $correo = $datos["correo"];
            $contrasena = $datos["contrasena"];
            $query = "Call obtenerPerfil('$correo','$contrasena');";
            
            $verificacion = parent::obtenerDatos($query);
            if(isset($verificacion[0]["id_usuario"])){
                $_SESSION["id"]=$verificacion[0]["id_usuario"];
                $_SESSION["nombre"]=$verificacion[0]["nombre"];
                $_SESSION["apellidos"]=$verificacion[0]["apellidos"];
                $_SESSION["correo"]=$correo;
                $_SESSION["nickname"]=$verificacion[0]["nickname"];
                $_SESSION["esMaestro"]=$verificacion[0]["esMaestro"];
                $_SESSION["imagenP"]=$verificacion[0]["imagenPerfil"];
                $success="sesionEncontrada";
                return $success;
            }
            else{
                $success="sesionNoExiste";
                return $success;
            }
        }

        public function getPerfilUsuario(){
            header('Content-Type: application/json');
            $nombre=$_SESSION["nombre"];
            $apellidos=$_SESSION["apellidos"];
            $nick=$_SESSION["nickname"];
            $correo=$_SESSION["correo"];
            $esProfe=$_SESSION["esMaestro"];
            $imagenUs=$_SESSION["imagenP"];
            $json = [
                "nombre" => $nombre,
                "apellidos"=> $apellidos,
                "nickname"=> $nick,
                "correo"=> $correo,
                "esMaestro"=> $esProfe,
                "imagenP"=> $imagenUs
            ];
            return json_encode($json);
        }
    }
?>
