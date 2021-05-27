<?php
require_once 'classNiveles.php';
$_nivel = new Nivel;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==1){
        header('Content-Type: application/json');
        $jala = $_nivel->traerTodosLosNivelesCurso($datos);
        echo $jala;
    }
    //header('Content-Type: application/json');//le dices que devuelve un json
    
    //echo $jala;
    //json_encode($jala);
?>