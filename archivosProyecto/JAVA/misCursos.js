$(document).ready(function () {
    ocultarMisCursos();
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
                
                if(obj['esMaestro']==false){
                    
                    document.getElementById("navHistorial").style.display = 'none';
                    
                }else{
                    if(obj['esMaestro']==false){
                        document.getElementById("btnAnCur").style.display = 'none';
    
                        document.getElementById("navVentas").style.display = 'none';
                    }
                }
   
            })
    }
    
    

})
