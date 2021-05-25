var cantNiveles=0;
$(document).ready(function () {
    cantNiveles=0;
    $("#añadeLvl").click(function () {
        var nombre = $("#nameLvl").val();
        var video =$("#video").val();
        cantNiveles++;
        
        $("#listaNiveles").append("<li >" + nombre + " " + video + "<br> <button class='nuevoLvl'>Eliminar</li>");
    });
    $("ul").on("click", ".nuevoLvl", function () {
        cantNiveles--;
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
   
    
        
});

function crearCurso(){
        var nombre = document.getElementById("nameCur").value;
        var descripcion = document.getElementById("desCur").value;
        
        var costo = document.getElementById("costoCur").value;
        var cantLvls = cantNiveles;
        var opc=1;

       if(cantLvls<=0){
            alert("agregue un nivel");
       }else{
        var FoDatos = new FormData();
        FoDatos.append('nombre',nombre);
        FoDatos.append('descripcionCurso',descripcion);
        FoDatos.append('trailer',trailer);
        FoDatos.append('precio',costo);
        FoDatos.append('niveles',cantLvls);
        FoDatos.append('foto',$("#imageMin")[0].files[0]);
        FoDatos.append('trailer',$("#videoTrailer")[0].files[0]);
        FoDatos.append('opc',opc);

    fetch('../php/cursosImagen.php',{method:"POST",body:FoDatos})
    .then(response => {
         return response.text();
    })
    .then(data => {
         
        var Jason =data;
        console.log(Jason);
        debugger;
        if(Jason==="success"){
            alert("Curso creado con éxito");
            window.location.href="misCursos.html";
        }
        else
            alert(Jason.result)
        //"status" => "ok",
        //"result" => array()
        })
    }
       }

