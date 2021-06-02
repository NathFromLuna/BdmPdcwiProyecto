<?php
    require_once "conexion.php";
    session_start();
    class Historial extends conexion{

        public function ActHistorial($json){
            $datos = json_decode($json,true);
            $idAl = $_SESSION["id"];
            $idNivel = $datos["idNivel"];
            $query = "Call actualizarHistorial($idAl,$idNivel);";

            $verificacion = parent::rowsAfectados($query);
            if($verificacion == 1){
                $success="success";
                return $success;    
            }else{
                $success="fail";
                return parent::Error(); 
            }
        }

        public function VerificacionNivFinal($json){
            $datos = json_decode($json,true);
            $idAl = $_SESSION["id"];
            $idNivel = $datos["idNivel"];
            $query = "Call RevisarFinalizacion($idAl,$idNivel);";

            $verificacion = parent::rowsAfectados($query);
            if($verificacion == 1){
                $success="success";
                return $success;    
            }else{
                $success="fail";
                return parent::Error(); 
            }
        }

        public function traerTodosLosCursosAHistorial(){
            header('Content-Type: application/json');
            $alumno=$_SESSION["id"];
            //son los datos del json
            $query = "Call getHistorialAlumno('$alumno');";
            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["id_curso"])){           
                return json_encode($cursos);
            }
            else{
                $success="NoHayCursos";
                return $success;
            }
        }
   
    }
?>
