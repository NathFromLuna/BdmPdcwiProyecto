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
                $query2 = "Call getComentario($creador,$curso,'$mensaje');";
                $post = parent::obtenerDatos($query2);
                if(isset($post[0]["id_usuario"])){
                    $idUs =$post[0]["id_usuario"];
                    $nombre = $post[0]["nombre"];
                    $comentario = $post[0]["comentario"];
                    $json = [
                        "idUsuario" => $idUs,
                        "nombreUs" => $nombre,
                        "comentarioHecho"=> $comentario
                    ];
                    return $json;
                }
                $success="success";
                //return $success;
            }else{
                $success="fail";
                return  parent::Error();
            }
        }

        public function getAllComentarios(){
            header('Content-Type: application/json');
            
            //son los datos del json
            $query = "call obtenerCategorias();";
            
            $categorias = parent::obtenerDatos($query);
        
            if(isset($categorias[0]["nombre"])){           
                return json_encode($categorias);
            }
            else{
                $success="NoHayCategorias";
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