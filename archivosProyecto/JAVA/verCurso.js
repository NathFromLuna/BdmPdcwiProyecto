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
    $("#nivelesCurso").on("click", ".btnVerClase", function () {
        nivelEsp(this.id);
    });
    function ocultarVerCurso() {
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
                    document.getElementById("datosForAlumno").style.display = 'none';
                    
                }else{
                    if(obj['esMaestro']==false){
                        document.getElementById("btnAnCur").style.display = 'none';
                        document.getElementById("navVentas").style.display = 'none';
                    }
                }
                mostrarUnCurso();       
            })
    }
    ocultarVerCurso();
    function mostrarUnCurso() {
        var _postID = getQueryVariable("id");
        var opc = 2;
        let Body = { opc, _postID}
        console.log(_postID);
        let jsonBody = JSON.stringify(Body)
        fetch('../php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
               var obj = data;
               //var obj = JSON.parse(Jason);
               
               //$("#EspacioEntradas").append("<text style='margin: 20px;'>" + obj['Descripcion'] + "<text/>");
               document.getElementById("titulo").innerHTML = obj['nombre'];
               document.getElementById("verdaderaDescripcion").innerHTML = obj['descripcion'];
               document.getElementById("videoCursoAct").src = obj['trailerCurso'];
                    
                    //"trailerCurso"=> $trailerCur,
                mostrarNiveles();
            })
    }
    function mostrarNiveles() {
        var idCurso = getQueryVariable("id");
        var opc = 1;
        let Body = { opc, idCurso}
        console.log(idCurso);
        let jsonBody = JSON.stringify(Body)
        fetch('../php/niveles.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
               var Jason = data;
               console.log(Jason);
               //var obj = JSON.parse(Jason);
                for (var i in Jason) {
                    $("#nivelesCurso").append("<div><h3 id="+Jason[i]['id_niveles']+" >"+Jason[i]['nombreNvl']+"</h3><br><p >Nivel:"+Jason[i]['numeroNivel']+" </p><button id="+Jason[i]['id_niveles']+"  class='btnVerClase'>Ver clase</button></div>");
                }
               //id_niveles, nombreNvl , videoLvl, numeroNivel, otrosArchivo
               
            })
    }
    function nivelEsp(idNivel) {
        window.location.href = "verClase.html?id="+idNivel;
    }
})