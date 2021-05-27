<?php
    require_once "conexion.php";
    session_start();
    class Nivel extends conexion{
        
        public function traerTodosLosNivelesCurso($datos){
            header('Content-Type: application/json');
           
            $idCurso=$datos["idCurso"];
            //son los datos del json
            $query = "Call getNiveles($idCurso);";
            
            $niveles = parent::obtenerDatos($query);
            if(isset($niveles[0]["nombreNvl"])){           
                return json_encode($niveles);
            }
            else{
                $success="Niveles";
                return $success;
            }
        }

        public function getNivel($json){
            header('Content-Type: application/json');
            $datos = json_decode($json,true);
            //son los datos del json
            $id=$datos["idNivel"];
            $query = "Call getNivel('$id');";
            
            $post = parent::obtenerDatos($query);
            if(isset($post[0]["nombreNvl"])){
                $idCurso = $post[0]["id_curso"];
                $name = $post[0]["nombreNvl"];
                $trailerNvl = $post[0]["videoLvl"];
                $numLvl = $post[0]["numeroNivel"];
                $otrosArch = $post[0]["otrosArchivo"];
              
                $json = [
                    "idCurso" => $idCurso,
                    "nombreNvl" => $name,
                    "trailerNivel"=> $trailerNvl,
                    "numeroNivel"=> $numLvl,
                    "otrosArchivo"=> $otrosArch
                ];    
                return $json;
            }
            else{
                $success="NivelNoEncontrado";
                return parent::Error();
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