<?php
    require_once "conexion.php";
    session_start();
    class Cursos extends conexion{
        public function CrearCurso($json,$json2,$foto){
            $datos = json_decode($json,true);
            $datos2 = json_decode($json2,true);
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
            $verificacion2 = false;
            $contador=0;
            $contador2=1;
            while(isset($datos2[$contador])){
                $nombreNvl=$datos2[$contador];
                $contador++;
                $videoLvl=$datos2[$contador];
                $contador++;
                $archivoNvl=$datos2[$contador];
                $contador++;
                $query ="call DePasoNivelCurso('$videoLvl','$archivoNvl',
                $contador2,'$nombre','$descripcion',$cantLvls,$idProfesor);";
                $contador2++;
                $cantidad = parent::rowsAfectados($query);
                if($cantidad!=1){
                    $verificacion2 = true;
                }
            }

            
            if($verificacion == 1 && $verificacion2 == false){
                $success="success";
                return $success;
            }else{
                $success="fail";
                return parent::Error();
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
