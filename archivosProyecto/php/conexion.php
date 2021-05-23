<?php

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

       public function Error(){
       
        return $this->conexion->error;
       }

       public function obtenerDatos($query){
        $results = $this->conexion->query($query);
        $resultarray = array();
        foreach($results as $key){
            $resultarray[]= $key;

        }
        return $this->convertirUTF8($resultarray);
       }


       public function ObtenerUsuario($query){
        $resultado = mysqli_query($this->conexion,$query);
        $row = mysqli_fetch_array($resultado); 
        if(isset($row["nombre"]) ){
          //session_start();
          $_SESSION["id"]=$row["id_usuario"];
          $_SESSION["nombre"]=$row["nombre"];
          $_SESSION["apellidos"]=$row["apellidos"];
          
          $_SESSION["nickname"]=$row["nickname"];
          $_SESSION["esMaestro"]=$row["esMaestro"];
          $_SESSION["imagenP"]=$row["imagenPerfil"];
          return 1;
        }
        else
        {

          return 0;
          
          }
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

   // $_usuario = new conexion;
    //echo $_usuario.$listadatos;
?>