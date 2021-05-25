<?php
    require_once "conexion.php";
    session_start();
    class Cursos extends conexion{
        public function CrearCurso($json,$foto){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $descripcion= $datos["descripcionCurso"];
            $videoTrailer= $datos["trailer"];
            $costo= $datos["precio"];
            $cantLvls= $datos["niveles"];
            $categoria1= $datos["categoria1"];
            $categoria2= $datos["categoria2"];
           
            $idProfesor=  $_SESSION["id"];

            $query = "Call registrarCurso('$nombre','$descripcion','$foto',
            '$videoTrailer',$costo,$cantLvls,$idProfesor,$categoria1,
            $categoria2);";

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

        public function getCurso($json){
                $datos = json_decode($json,true);
                //son los datos del json
                $correo = $datos["correo"];
                $contrasena = $datos["contrasena"];
                $query = "Call obtenerPerfil('$correo','$contrasena');";
                
                $verificacion = parent::ObtenerUsuario($query);
                if($verificacion==1){
                   
                    $_SESSION["correo"]=$correo;
                   
                    $success="sesionEncontrada";
                    return $success;
                }
                else{
                    $success="sesionNoExiste";
                    return $success;
                }
           
        }

        public function traerTodosLosCursos1Prof(){
            header('Content-Type: application/json');
            $escuelaCur=$_SESSION["id"];
            //son los datos del json
            $query = "Call getCursosProfEs('$escuelaCur');";
            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["nombre"])){           
                return json_encode($cursos);
            }
            else{
                $success="NoHayCursos";
                return $success;
            }
        }

        public function modificarCurso($json){
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
