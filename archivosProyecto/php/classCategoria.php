<?php
require_once "conexion.php";
    session_start();
    class categoria extends conexion{
        public function crearCategoria($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $descripcion = $datos["descripcion"];
            $creador = $_SESSION["id"];
            $query = "Call nuevaCategoria('$nombre','$descripcion',$creador);";
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";
                return  parent::Error();
            }
        }
        public function getAllCategorias(){
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