
$(document).ready(function () {
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

function crearCat(){
    var nombre = document.getElementById("Nombre").value;
    var descripcion = document.getElementById("desCat").value;
    var opc=1;
    let Body = { nombre,descripcion,opc }
        
    let jsonBody = JSON.stringify(Body);

    fetch('../php/categorias.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
    .then(response => {
         return response.text();
    })
    .then(data => {
         
        var Jason =data;
        console.log(Jason);
        debugger;
        if(Jason==="success"){
            alert("Categoria creada con éxito");
            window.location.href="perfil.html";
        }
        else
            alert(Jason.result)
        //"status" => "ok",
        //"result" => array()
    })
    
}

