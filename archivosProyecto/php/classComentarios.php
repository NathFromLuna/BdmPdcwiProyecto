<?php
require_once "conexion.php";
    session_start();
    class Comentario extends conexion{
        public function crearComentario($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $mensaje = $datos["comentario"];
            $curso = $datos["idCurso"];
            $creador = $_SESSION["id"];
            //estudiante, curso y mensaje
            $query = "Call guardarComentarios($creador,$curso,'$mensaje');";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $query2 = "Call obtenerComentarios($curso);";
                $comentarios = parent::obtenerDatos($query2);
                
                if(isset($comentarios[0]["id_usuario"])){           
                   return json_encode($comentarios);
                }else{
                    $success="NoHayComentarios";
                    return $success;
                }
            }else{
                $success="fail";
                return  parent::Error();
            }
        }

        public function getAllComentarios($json){
            header('Content-Type: application/json');
            $datos = json_decode($json,true);
            $curso = $datos["idCurso"];
            //son los datos del json
            $query2 = "Call obtenerComentarios($curso);";
            $comentarios = parent::obtenerDatos($query2);
                
            if(isset($comentarios[0]["id_usuario"])){           
                return json_encode($comentarios);
            }else{
                $success="NoHayComentarios";
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