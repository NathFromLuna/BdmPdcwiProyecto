<?php

$direccion = dirname(__FILE__);



  $jsondata = file_get_contents($direccion."/"."config");
  $datosConexion=json_decode($jsondata,true);

  foreach($datosConexion as $key => $value){
    $server = $value["server"];
    $user = $value["user"];
    $password = $value["password"];
    $database = $value["database"];
    $port = $value["port"];
    }
  $conexion = new mysqli($server,$user,$password,$database,$port);

  $query = "Call registrarUsuario('fabiola','cura','Sara','sara@gmail.com','123','false','0')";

  echo $conexion->query($query);

?>