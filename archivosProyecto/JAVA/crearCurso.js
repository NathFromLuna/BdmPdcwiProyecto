$(document).ready(function () {
    $("#añadeLvl").click(function () {
        var nombre = $("#nameLvl").val();
        var video =$("#video").val();
        $("#listaNiveles").append("<li >" + nombre + " " + video + "<br> <button class='nuevoLvl'>Eliminar</li>");
        
    });
    $("ul").on("click", ".nuevoLvl", function () {
        $(this).parent().remove();
    });

    ocultarElNav();
    function ocultarElNav() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.text();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                console.log(data);
                if(obj['esMaestro']==true){
                    document.getElementById("imgAvatarUsuario").style.display = 'inline';
                    document.getElementById("cerrarSes").style.display = 'inline';
                    document.getElementById("navHistorial").style.display = 'none';
                    document.getElementById("iniciaSes").style.display = 'none';
                    document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                } 
            })
    }

    function crearCurso(form){
        var FoDatos = new FormData();
                FoDatos.append('nombre',nombre);
                FoDatos.append('apellido',apellidos);
                FoDatos.append('nickname',nickname);
                FoDatos.append('correo',correo);
                FoDatos.append('contrasena',contrasena);
                FoDatos.append('esProfe',esProfe);
                FoDatos.append('foto',$("#image")[0].files[0]);
                FoDatos.append('opc',opc);
    
                $nombre = $datos["nombre"];
            $descripcion= $datos["descripcionCurso"];
            $videoTrailer= $datos["trailer"];
            $costo= $datos["precio"];
            $cantLvls= $datos["niveles"];
            $idProfesor= $datos["creador"];
               
               fetch('../php/usuarioimagen.php',{method:"POST",body:FoDatos})
               .then(response => {
                 return response.text();
               })
               .then(data => {
                 
                var Jason =data;
                console.log(Jason);
                if(Jason==="success"){
                    alert("Registro exitoso");
                    window.location.href="IS.html";
                }
                else
                    alert(Jason.result)
                //"status" => "ok",
                //"result" => array()
                })
            }
});


