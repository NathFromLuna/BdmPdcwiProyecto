<?php
require_once 'classUsuario.php';
$_categoria = new categoria;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==1){
        header('Content-Type: application/json');
        $jala = $_categoria->crearCategoria($postbody);
    }
    if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_categoria->getAllCategorias();   
    }
    header('Content-Type: application/json');//le dices que devuelve un json
    
    echo $jala;
    json_encode($jala);
?>