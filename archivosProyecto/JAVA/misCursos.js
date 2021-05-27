$(document).ready(function () {
    
    $("#cursosCreados").on("click", ".titCursos", function () {
        cursoEsp(this.id);
    });
    function ocultarMisCursos() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.text();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                document.getElementById("imgAvatarUsuario").style.display = 'inline';
                document.getElementById("cerrarSes").style.display = 'inline';
                document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                document.getElementById("iniciaSes").style.display = 'none';    
                if(obj['esMaestro']==true){
                    document.getElementById("navHistorial").style.display = 'none';
                    
                }else{
                    if(obj['esMaestro']==false){
                        document.getElementById("btnAnCur").style.display = 'none';
                        document.getElementById("navVentas").style.display = 'none';
                    }
                }
                
                mostrarCursosProf();

            })
    }
    ocultarMisCursos();
    function mostrarCursosProf() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        
        fetch('../php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
                
            var Jason = data;
            //var obj = JSON.parse(Jason);
            console.log(data);
            
            if(data=="NoHayCursos"){
                $("#hayCursos").append("<p>No hay cursos creados</p>");
            }else{
                for (var i in Jason) {
                    //window.location.href = "blogEspecifico.html?id="+_postID
                    //href='../Html's/VerCurso.html?id='
                    $("#cursosCreados").append("<div class='cursos'><img src ='../JAVA/fotos.php?id="+Jason[i]['id_curso']+"' alt='fotoCurso' height='165' width='240'><br><p id="+Jason[i]['id_curso']+" class='titCursos' >"+Jason[i]['nombre']+"</p><br><p class='niveles'>Lvls:"+Jason[i]['cantidadNivelesCurso']+" </p></div>");
                }
            }
        })
          
    }
    function cursoEsp(_postID) {
        window.location.href = "VerCurso.html?id="+_postID;
    }
})
