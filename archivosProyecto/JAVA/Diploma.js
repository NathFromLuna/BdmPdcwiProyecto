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
    obtenerDatos();
    function obtenerDatos(){
        var idCurso = getQueryVariable("id");
        var opc = 9;
        let Body = { idCurso, opc  }
        let jsonBody = JSON.stringify(Body);
        fetch('../php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.json();
        })
        .then(data => {
            var Jason =data;
            debugger;
            console.log(Jason);
            document.getElementById("io").innerHTML = Jason["nombreAlumno"];
            document.getElementById("NomCurso").innerHTML = Jason["nombre"];
            document.getElementById("Sensei").innerHTML = Jason["nombreProfesor"];
        })
    }


})