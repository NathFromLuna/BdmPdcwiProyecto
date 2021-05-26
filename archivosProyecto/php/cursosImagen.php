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
        $categoria1= $_POST["categoria1"];
        $categoria2= $_POST["categoria2"];
        
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
            "categoria1"=> $categoria1,
            "categoria2"=> $categoria2
        ];

        $contador=0;
        $contador2=0;
        $json2=array();
        while(isset($_POST["nombreNlv".$contador])){
        
            $videoTrailerNvl= $_FILES['videoNvl'.$contador]['tmp_name'];
            $nombreNvl=$_POST["nombreNlv".$contador];
            $nuevoNombreTrailerNvl="../videos/".$nombreNvl.$contador.".mp4";
            move_uploaded_file($videoTrailerNvl,$nuevoNombreTrailerNvl);
            
            $tipo=$_FILES['otroArchNvl'.$contador]['name'];
            $otroArchNvl= $_FILES['otroArchNvl'.$contador]['tmp_name'];
            $nombreNvl=$_POST["nombreNlv".$contador];
            $nuevoNombreArchNvl="../archivos/".$nombreNvl.$contador.$tipo;
            move_uploaded_file($otroArchNvl,$nuevoNombreArchNvl);

            $json2[$contador2]=$nombreNvl;
            $contador2++;
            $json2[$contador2]=$nuevoNombreTrailerNvl;
            $contador2++;
            $json2[$contador2]=$nuevoNombreArchNvl;
            $contador2++;
            $contador++;
        }
        $coco= json_encode($json2);

        
        $coso = json_encode($json);

        $jala = $_curso->CrearCurso($coso,$coco,$blob);
     }
    if($_POST['opc']==2)
        $jala = $_curso->getCurso($postbody);
    if($_POST['opc']==3)
        $jala = $_curso->modificarCurso($postbody);

 echo $jala;
?>