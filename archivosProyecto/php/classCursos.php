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
                $query ="call DePasoNivelCurso('$nombreNvl','$videoLvl','$archivoNvl',
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
    
            header('Content-Type: application/json');
            $datos = json_decode($json,true);
            //son los datos del json
            $id=$datos["_postID"];
            $query = "Call getCurso('$id');";
            
            $post = parent::obtenerDatos($query);
            if(isset($post[0]["id_curso"])){
                $idCurso =$post[0]["id_curso"];
                $name = $post[0]["nombre"];
                $descripcion = $post[0]["descripcion"];
                $cantNvls = $post[0]["cantidadNivelesCurso"];
                $trailerCur = $post[0]["videoTrailer"];
                $categorias = $post[0]["Categorias"];
                $costo = $post[0]["costo"];
                $NombreProfesor = $post[0]["NombreProfesor"];
                $Media = $post[0]["Media"];
              
                $json = [
                    "idCurso" => $idCurso,
                    "nombre" => $name,
                    "descripcion"=> $descripcion,
                    "cantidadNiveles"=> $cantNvls,
                    "trailerCurso"=> $trailerCur,
                    "categorias"=> $categorias,
                    "costo"=> $costo,
                    "profeCurso"=> $NombreProfesor,
                    "Media" => $Media
                ];
                     
                return $json;
            }
            else{
                $success="CursoNoEncontrado";
                return parent::Error();
            }
        }

        public function traerTodosLosCursos1Prof(){
            header('Content-Type: application/json');
            $escuelaCur=$_SESSION["id"];
            
            //son los datos del json
            $query = "Call getCursosProfEsp('$escuelaCur');";
            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["id_curso"])){           
                return json_encode($cursos);
            }
            else{
                $success="NoHayCursos";
                return $success;
            }
        }
        public function traerTodosLosCursosInsAl(){
            header('Content-Type: application/json');
            $alumno=$_SESSION["id"];
            //son los datos del json
            $query = "Call getCursosProfEsp('$alumno');";
            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["id_curso"])){           
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
        public function inscribirCurso($json){
                $datos = json_decode($json,true);
                //son los datos del json
                $idAl = $_SESSION["id"];
                $idCurso = $datos["idCurso"];
                $query = "Call inscribirCurso($idAl,$idCurso);";

                $verificacion = parent::rowsAfectados($query);
                if($verificacion == 1){
                    $success="success";
                    return $success;    
                }else{
                    $success="fail";
                    return parent::Error(); 
                }
           
        }
        public function cursoComprado($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $idAl = $_SESSION["id"];
            $idCurso = $datos["idCurso"];
            $query = "Call estaInscrito($idAl,$idCurso);";

            $post = parent::obtenerDatos($query);
            if(isset($post[0]["terminado"])){
                $terminado = $post[0]["terminado"];
                $json = [
                    "terminado"=> $terminado
                ];
                return $json;
            }
            else{
                $success="CursoNoReg";
                return $success;
            }
       
        }
        
        public function ObtNomsCurso($json){
            $datos = json_decode($json,true);           
            $idCurso = $datos["idCurso"];
            $query = "Call getCurso($idCurso);";            
            $post = parent::obtenerDatos($query);
            if(isset($post[0]["nombre"])){
                $NomAl = $_SESSION["nombre"];
                $NomAl .= " ";
                $NomAl .= $_SESSION["apellidos"];
                $name = $post[0]["nombre"];
                $NomProf = $post[0]["NombreProfesor"];
              
                $json = [
                    "nombreAlumno" => $NomAl,
                    "nombre" => $name,   
                    "nombreProfesor" => $NomProf,

                ];
                     
                return $json;
            }
            else{
                $success="CursoNoEncontrado";
                return parent::Error();
            }
        }

        public function traerTodosLosCursosVentas(){
            header('Content-Type: application/json');
            $escuelaCur=$_SESSION["id"];
            //son los datos del json
            $query = "Call getCursosProfEspVentas($escuelaCur);";
            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["id_curso"])){           
                return json_encode($cursos);
            }
            else{
                $success="NoHayCursos";
                return $success;
            }
        }
        public function buscarcurso($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $buscado = $datos["buscando"];
           
            $query = "Call buscarCursoFiltro('%$buscado%');";
            $cursos = parent::obtenerDatos($query);
            
          //  if(isset($cursos[0]["id_curso"])){
               
                return json_encode($cursos);
                //return $query;
                
           // }else{
              //  $success="No se encontro";
            //return $query;
           //     return json_encode($success);
          //  }
          
        }

        public function traerTodosLosCursosAlumno(){
            header('Content-Type: application/json');
            $idAlumn=$_SESSION["id"];
            
            //son los datos del json
            $query = "Call getCursosAlumno('$idAlumn');";
            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["id_curso"])){           
                return json_encode($cursos);
            }
            else{
                $success="NoHayCursos";
                return $success;
            }
        }
        public function calificarCurso($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $idAl = $_SESSION["id"];
            $idCurso = $datos["idCurso"];
            $calCurso = $datos["cal"];

            $query = "Call clificarCurso($idAl,$idCurso, $calCurso);";

            $verificacion = parent::rowsAfectados($query);
            if($verificacion == 1){
                $success="success";
                return $success;    
            }else{
                $success="fail";
                return parent::Error(); 
            }
       
        }
        public function Destacados(){
            header('Content-Type: application/json');
            $query = "Call getCursosMejoresCalificados();";            
            $cursos = parent::obtenerDatos($query);
            if(isset($cursos[0]["id_curso"])){           
                return json_encode($cursos);
            }
            else{
                $success="NoHayCursos";
                return $success;
            }
       
        }
        public function Vendidos(){
            header('Content-Type: application/json');
            $query = "Call getCursosMasVendidos();";            
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
