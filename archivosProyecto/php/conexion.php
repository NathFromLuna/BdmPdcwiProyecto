<?php

  /*$direccion = dirname(__FILE__);

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

    if($conexion->connect_errno){
      echo "algo va mal con la conexion";
      die();
    }else{
      $query = "Call registrarUsuario('$nombre','cura','fab','sara@gmail.com','123',false,'0');";
      $conexion->query($query);
      echo $conexion->affected_rows;
    }*/

    class conexion{
      private $server;
      private $user;
      private $password;
      private $database;
      private $port;
      public $conexion;

      function __construct(){
           $listadatos = $this->datosconexion();
           foreach($listadatos as $key => $value){
               $this->server = $value["server"];
               $this->user = $value["user"];
               $this->password = $value["password"];
               $this->database = $value["database"];
               $this->port = $value["port"];
               }

               $this->conexion = new mysqli($this->server,$this->user,$this->password,$this->database,$this->port);
               if($this->conexion->connect_errno){

                   echo "algo va mal con la conexion";
                   die();
               }
      }
      private function datosconexion(){
        $direccion = dirname(__FILE__);
        $jsondata = file_get_contents($direccion."/"."config");
        return json_decode($jsondata,true);
       }

      public function rowsAfectados($query){
        $this->conexion->query($query);
        return $this->conexion->affected_rows;
       }

       public function obtenerDatos($query){
        $results = $this->conexion->query($query);
        $resultarray = array();
        foreach($results as $key){
            $resultarray[]= $key;

        }
        return $this->convertirUTF8($resultarray);
       }

       private function convertirUTF8($array){
        array_walk_recursive($array,function(&$item,$key){
            if(!mb_detect_encoding($item,'utf-8',true)){
                $item = utf8_encode($item);
            }
        });
        return $array;
    }

    }
?>