<?php
require_once 'classUsuario.php';
$_curso = new Cursos;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_curso->getCurso($postbody);
        echo json_encode($jala);
    }
    if($datos["opc"]==3){
        $jala = $_curso->modificarCurso($postbody);
        echo $jala;
    }
    //header('Content-Type: application/json');//le dices que devuelve un json
    
    //echo $jala;
    //json_encode($jala);
?>