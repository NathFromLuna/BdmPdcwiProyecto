<?php
    require_once "conexion.php";
    session_start();
    class Usuario extends conexion{
        public function CrearUsuario($json,$foto){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $apellidos = $datos["apellidos"];
            $nickname = $datos["nickname"];
            $correo = $datos["correo"];
            $contrasena = $datos["contrasena"];
            $esProfe = $datos["esProfe"];
            //$foto = $datos["foto"];
            // $file = file_get_contents( $foto);
           
            /* $file_tmpi = $foto;
            $file = file_get_contents( $file_tmpi);
            $blob =mysqli_real_escape_string($_usuario->conexion,$file);*/

            $query = "Call registrarUsuario('$nombre','$apellidos','$nickname',
            '$correo','$contrasena',$esProfe,'$foto');";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";
                return  parent::Error();
            }
           ;
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
            echo "coso ";
        }

        public function getPerfilUsuario(){
            header('Content-Type: application/json');
            if(isset($_SESSION["nombre"])){
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
            }else{
                $success="fail";
                return $success;
            }
        }

        public function modificarUsuario($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $apellidos = $datos["apellidos"];
            $nickname = $datos["nickname"];
            $correo = $datos["correo"];
            $foto = $datos["foto"];
            $idUs= $_SESSION["id"];
            $query = "Call editarUsuario($idUs,'$nombre','$apellidos',
            '$nickname','$correo',' $foto');";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion){
                
                $_SESSION["nombre"]=$nombre;
                $_SESSION["apellidos"]=$apellidos;
                $_SESSION["correo"]=$correo;
                $_SESSION["nickname"]=$nickname;
                $success="CambiosHechos";
                return $success;
                
            }else{
                $success="failCambios";
                return $success;
            }
          
        }
    }
?>
