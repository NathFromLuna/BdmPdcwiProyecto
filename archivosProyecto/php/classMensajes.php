<?php
require_once "conexion.php";
    session_start();
    class mensajes extends conexion{
        public function mandarMensaje($json){
            $datos = json_decode($json,true);
            //son los datos del json
            //idHabloCon,comentario
            $idDeQuien = $_SESSION["id"];
            $idParaQuien = $datos["idHabloCon"];
            $mensaje = $datos["mensaje"];
            $query = "Call escribirMensaje($idDeQuien,$idParaQuien,'$mensaje');";
            
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $query2 = "Call obtenerMensajes($idDeQuien,$idParaQuien);";
                $mensajes = parent::obtenerDatos($query2);
                
                if(isset($mensajes[0]["id_usuario"])){           
                   return json_encode($mensajes);
                }else{
                    $success="NoHayMensajes";
                    return $success;
                }
               
            }else{
                $success="noSeEnvio";
                return  parent::Error();
            }
        }

        public function traerProfes(){
            header('Content-Type: application/json');
            $enviaMensaje = $_SESSION["id"];
            //son los datos del json
            $query = "call obtenerPersonasAmensajear($enviaMensaje);";
            
            $profes = parent::obtenerDatos($query);
        
            if(isset($profes[0]["idProfesor"])){           
                return json_encode($profes);
            }
            else{
                $success="NoHayProfes";
                return $success;
            }
        }

        public function traerProfe($json){
            header('Content-Type: application/json');
            $datos = json_decode($json,true);
            //son los datos del json
            $id=$datos["idHabloCon"];
            //son los datos del json
            $query = "call profesCurReg($id);";
            
            $profe = parent::obtenerDatos($query);
          
            if(isset($profe[0]["id_usuario"])){
                //id_usuario, nombre, apellidos
                $profeId = $profe[0]["id_usuario"];
                $nameP = $profe[0]["nombre"];
                $apellidos = $profe[0]["apellidos"];
               
                $json = [
                    "profeId" => $profeId,
                    "nameP" => $nameP,
                    "apellidos"=> $apellidos
                ];    
                return $json;
            }
            else{
                $success="NivelNoEncontrado";
                return parent::Error();
            }
        }

        public function traerAlumnos(){
            header('Content-Type: application/json');
            $enviaMensaje = $_SESSION["id"];
            //son los datos del json
            $query = "call obtenerPersonasAmensajearProf($enviaMensaje);";
            
            $profes = parent::obtenerDatos($query);
        
            if(isset($profes[0]["idAlumno"])){           
                return json_encode($profes);
            }
            else{
                $success="NoHayAlumnos";
                return $success;
            }
        }

            public function traerMensajes($json){
            $datos = json_decode($json,true);
            //son los datos del json
            //idHabloCon,comentario
            $idDeQuien = $_SESSION["id"];
            $idParaQuien = $datos["idHabloCon"];
            
            
            $query = "Call obtenerMensajes($idDeQuien,$idParaQuien);";
            $mensajes = parent::obtenerDatos($query);
                
            if(isset($mensajes[0]["id_usuario"])){           
                return json_encode($mensajes);
            }else{
                $success="NoHayMensajes";
                return $success;
            } 
            
        }
    }
?>