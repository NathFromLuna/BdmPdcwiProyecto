<?php
require_once 'classMensajes.php';
$_mensaje = new mensajes;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==1){
        header('Content-Type: application/json');
        $jala = $_mensaje->mandarMensaje($postbody);
        echo $jala;
    }
    if($datos["opc"]==2){
        header('Content-Type: application/json');
        $jala = $_mensaje->traerProfes();   
        echo $jala;
        json_encode($jala);
    }
    if($datos["opc"]==3){
        header('Content-Type: application/json');
        $jala = $_mensaje->traerProfe($postbody);
        echo json_encode($jala);
    }
    if($datos["opc"]==4){
        header('Content-Type: application/json');
        $jala = $_mensaje->traerMensajes($postbody);
        echo $jala;
    }
    if($datos["opc"]==5){
        header('Content-Type: application/json');
        $jala = $_mensaje->traerAlumnos();   
        echo $jala;
        json_encode($jala);
    }
   
    /*header('Content-Type: application/json');//le dices que devuelve un json
    json_encode($jala);
    echo $jala;*/
    
?>