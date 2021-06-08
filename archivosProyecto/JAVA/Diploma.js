$(document).ready(function () {
    var nombre;
    var curso;
    var Alumno;
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
            console.log(Jason);
            document.getElementById("io").innerHTML = Jason["nombreAlumno"];
            nombre = Jason["nombreAlumno"];
            document.getElementById("NomCurso").innerHTML = Jason["nombre"];
            curso = Jason["nombre"];
            document.getElementById("Sensei").innerHTML = Jason["nombreProfesor"];
            Alumno= Jason["nombreProfesor"];
        })
    }



})

function obtenerDiploma(){
    debugger;    
        var opc = 1;
        let Body = {  opc  }
        let jsonBody = JSON.stringify(Body);
        fetch('../ejemplo.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.json();
        })
        .then(data => {
            console.log(data);
           
        })
}