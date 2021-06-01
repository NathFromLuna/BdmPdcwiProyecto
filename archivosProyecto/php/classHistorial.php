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
   
    }
?>
