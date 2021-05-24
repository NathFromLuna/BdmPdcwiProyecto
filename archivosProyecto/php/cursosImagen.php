<?php
require_once 'classUsuario.php';
$_curso = new Cursos;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($_POST['opc']==1){
        $nombre = $datos["nombre"];
        $descripcion= $datos["descripcionCurso"];
        $videoTrailer= $datos["trailer"];
        $costo= $datos["precio"];
        $cantLvls= $datos["niveles"];
        $idProfesor= $datos["creador"];

         $file_tmpi = $_FILES['foto']['tmp_name'];
         $file = file_get_contents( $file_tmpi);
         $blob =mysqli_real_escape_string($_usuario->conexion,$file);
 
         $json = [
             "nombre" => $name,
             "descripcionCurso"=> $descripcion,
             "trailer"=> $videoTrailer,
             "precio"=> $costo,
             "niveles"=> $cantLvls,
             "creador"=> $idProfesor
         ];
 
         $coso = json_encode($json);
         $jala = $_curso->CrearCurso($coso,$blob);
     }
    if($_POST['opc']==2)
        $jala = $_curso->getCurso($postbody);
    if($_POST['opc']==3)
        $jala = $_curso->modificarCurso($postbody);

 echo $jala;
?>