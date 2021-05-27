<?php
    include_once '../php/conexion.php';
    $id = $_GET["id"];
    $conexion = new conexion;
    $sql = "call getFotoCursos($id);";
    header("content_type: image/jpeg");
    $result = mysqli_query($conexion->conexion, $sql);
    $row = mysqli_fetch_array($result);
    $imagendata = $row["imagenCurso"];
    echo $imagendata;
?>