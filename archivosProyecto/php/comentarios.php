<?php
require_once 'classComentarios.php';
$_comentario = new Comentario;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==1){
        header('Content-Type: application/json');
        $jala = $_comentario->crearComentario($postbody);
    }
    if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_comentario->getAllComentarios();   
    }
    header('Content-Type: application/json');//le dices que devuelve un json
    
    echo $jala;
    json_encode($jala);
?>