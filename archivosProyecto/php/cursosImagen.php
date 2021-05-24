<?php
require_once 'classCursos.php';
$_curso = new Cursos;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($_POST['opc']==1){
        $nombre = $_POST["nombre"];
        $descripcion= $_POST["descripcionCurso"];
        $videoTrailer= $_POST["trailer"];
        $costo= $_POST["precio"];
        $cantLvls= $_POST["niveles"];

         $file_tmpi = $_FILES['foto']['tmp_name'];
         $file = file_get_contents( $file_tmpi);
         $blob =mysqli_real_escape_string($_curso->conexion,$file);
 
        $json = [
             "nombre" => $nombre,
             "descripcionCurso"=> $descripcion,
             "trailer"=> $videoTrailer,
             "precio"=> $costo,
             "niveles"=> $cantLvls,
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