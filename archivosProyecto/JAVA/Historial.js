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
    actualizarHistorial();
    function actualizarHistorial(){
        var idNivel = getQueryVariable("id");
        var opc = 1;
        let Body = { idNivel, opc  }
        let jsonBody = JSON.stringify(Body);
        fetch('../php/Historial.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.text();
        })
        .then(data => {
            var Jason =data;
            debugger;
            console.log(Jason);
            if(Jason==="success"){
                alert("Curso comprado con éxito");
                document.getElementById("comprarCurso").style.display = 'none';
                document.getElementById("nivelesCurso").style.display = 'inline';
            }
            else{
    
                alert(Jason.result)
            }
        })
    }


})
