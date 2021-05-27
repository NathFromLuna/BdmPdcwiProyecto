<?php

require_once 'classNiveles.php';
$_nivel = new Nivel;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($_POST['opc']==1){

        $nombre = $_POST["nombre"];
        
        $videoTrailer= $_FILES['videoNivel']['tmp_name'];
        $idCreador=$_SESSION["id"];
        $nuevoNombreTrailer="../videos/".$nombre.$idCreador.".mp4";
        move_uploaded_file($videoTrailer,$nuevoNombreTrailer);

        $json = [
             "nombre" => $nombre,
             "descripcionCurso"=> $descripcion,
             "trailer"=> $nuevoNombreTrailer,
             "precio"=> $costo,
             "niveles"=> $cantLvls,
             "categoria1"=> $categoria1,
             "categoria2"=> $categoria2
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