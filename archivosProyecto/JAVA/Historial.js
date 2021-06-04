$(document).ready(function () {
    ocultarElNav();
    function ocultarElNav() {
        debugger;
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
                }else{
                    if(obj['esMaestro']==false){
                        document.getElementById("imgAvatarUsuario").style.display = 'inline';
                        document.getElementById("cerrarSes").style.display = 'inline';
                        document.getElementById("navVentas").style.display = 'none';
                        document.getElementById("iniciaSes").style.display = 'none';
                        document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                    }
                }
                
            })
    }
    mostrarHistorialAlumno();
    function mostrarHistorialAlumno() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        
        fetch('../php/Historial.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
                
            var Jason = data;
            //var obj = JSON.parse(Jason);
            console.log(data);
            
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos inscritos</p>");
            }else{
                for (var i in Jason) {
                    //window.location.href = "blogEspecifico.html?id="+_postID
                    //href='../Html's/VerCurso.html?id='
                    var total = Jason[i]['cantidadNivelesCurso'];
                    var avance = Jason[i]['avanceLvl'];
                    var prom = avance / total * 100;
                    $("#historialCur").append("<tr id='Tarjeta'><th id='thIm'><img id='Imagen' src='../JAVA/fotos.php?id="+Jason[i]['id_curso']+"' alt='fotoCurso'></th><td id='titulos'><a class='titCursos' href='../Html's/VerCurso.html'>"+Jason[i]['nombre']+"</a><br><p id='Descripcion'>Descripcion: "+Jason[i]['descripcion']+"</p><p id='Categorias'>Categorias: "+Jason[i]['Categorias']+"</p><p id='Avance'>Avance: "+prom+"</p></td></tr>");
                   
                   // $("#titulos").append("<div class='cursos'><img src ='../JAVA/fotos.php?id="+Jason[i]['id_curso']+"' alt='fotoCurso' height='165' width='240'><br><p id="+Jason[i]['id_curso']+" class='titCursos' >"+Jason[i]['nombre']+"</p><br><p class='niveles'>Lvls:"+Jason[i]['cantidadNivelesCurso']+" </p></div>");
                }
            }
        })
          
    }

})

