<?php
require_once 'classUsuario.php';
$_usuario = new Usuario;

//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    


    if($_POST['opc']==1){
       $name=$_POST['nombre'];
        $apellido=$_POST['apellido'];
        $nick=$_POST['nickname'];
        $correo=$_POST['correo'];
        $contrasena=$_POST['contrasena'];
        $esProfe=$_POST['esProfe'];
        
        $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_usuario->conexion,$file);

        $json = [
            "nombre" => $name,
            "apellidos"=> $apellido,
            "nickname"=> $nick,
            "correo"=> $correo,
            "contrasena"=> $contrasena,
            "esProfe"=> $esProfe
        ];

        $coso = json_encode($json);
        $jala = $_usuario->CrearUsuario($coso,$blob);
    }

    
    if($datos["opc"]==2)
        $jala = $_usuario->iniciarSesion($postbody);
    if($datos["opc"]==3)
        $jala = $_usuario->getPerfilUsuario();
    if($datos["opc"]==4)
        $jala = $_usuario->modificarUsuario($postbody);
    header('Content-Type: application/json');//le dices que devuelve un json
    echo json_encode($jala);
?>