<?php

require_once 'classCursos.php';
$_curso = new Cursos;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($_POST['opc']==1){
        $nombre = $_POST["nombre"];
        $descripcion= $_POST["descripcionCurso"];
        
        $costo= $_POST["precio"];
        $cantLvls= $_POST["niveles"];

        $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_curso->conexion,$file);
 
        $videoTrailer= $_FILES['trailer']['tmp_name'];
        $idCreador=$_SESSION["id"];
        $nuevoNombreTrailer="../videos/".$nombre.$idCreador.".mp4";
        move_uploaded_file($videoTrailer,$nuevoNombreTrailer);

        $json = [
             "nombre" => $nombre,
             "descripcionCurso"=> $descripcion,
             "trailer"=> $nuevoNombreTrailer,
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