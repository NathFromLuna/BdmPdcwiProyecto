<?php
require_once 'classUsuario.php';
$_usuario = new Usuario;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    if($datos["opc"]==1)
        $jala = $_usuario->CrearUsuario($postbody);
    if($datos["opc"]==2)
        $jala = $_usuario->iniciarSesion($postbody);
    if($datos["opc"]==3)
        $jala = $_usuario->getPerfilUsuario();
    header('Content-Type: application/json');//le dices que devuelve un json
    echo json_encode($jala);
?>