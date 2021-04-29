$(document).ready(function () {
    ocultarElNav();
    ocultarPerfil();
    ocultarMisCursos();
    function ocultarElNav() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                
               if(obj['esMaestro']==true){
                document.getElementById("navHistorial").style.display = 'none';
               }else{
                if(obj['esMaestro']==false)
                    document.getElementById("navVentas").style.display = 'none';
               }
               
            })
    }
    function ocultarPerfil() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
               if(obj['esMaestro']==true){
                document.getElementById("btnHistorial").style.display = 'none';
               }else{
                if(obj['esMaestro']==false)
                    document.getElementById("btnVentas").style.display = 'none';
               }
            })
    }
    function ocultarMisCursos() {
        var opc = 3;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
               
                if(obj['esMaestro']==false)
                    document.getElementById("btnAnCur").style.display = 'none';
               
            })
    }
})

