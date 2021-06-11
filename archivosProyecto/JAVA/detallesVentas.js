$(document).ready(function () {

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }

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
    mostrarUnCursoVentas();
    function mostrarUnCursoVentas() {
        debugger;
        var idCurso = getQueryVariable("id");
        var opc = 15;
        let Body = { opc, idCurso}
        console.log(idCurso);
        let jsonBody = JSON.stringify(Body)
        fetch('../php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
               var obj = data;
               console.log(data);
               debugger;
                document.getElementById("titulo").innerHTML = obj['nombre'];
                document.getElementById("imgCur").src = "../JAVA/fotos.php?id="+obj["idCurso"];                          
                document.getElementById("titulo3").innerHTML ="Cursos comprados: "+ obj['cursosComprados'];
                var comp = obj['califPromedioCur'];
                if (comp == null)
                 document.getElementById("califPromCurso").innerHTML ="Calificacion: "+ "No se a sido calificado";
                 else
                    document.getElementById("califPromCurso").innerHTML ="Calificacion: "+ obj['califPromedioCur'];
                document.getElementById("descripcion").innerHTML = obj['descripcionCur'];
            })
    }
    mostrarAlumnosDelCurso();
    function mostrarAlumnosDelCurso() {
        var idCurso = getQueryVariable("id");
        var opc = 16;
        let Body = { opc, idCurso}
        console.log(Body);
        let jsonBody = JSON.stringify(Body)
        fetch('../php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                var Jason = data;
                //var obj = JSON.parse(Jason);
                console.log(data);
                debugger;
                if(data=="NoHayAlumnos"){
                    $("#tablaAlumnos").append("<tr ><td >No hay alumnos disponibles</td></tr>");
                    //<p class="Categoria">Categoria 1</p>
                }else{
                    for (var i in Jason) {
                        $("#tablaAlumnos").append("<tr ><td >"+Jason[i]['nombre']+" "+Jason[i]['apellidos']+"</td><td >"+Jason[i]['avanceLvl']+"</td></tr>");
                    }
                }
            })
    }
})