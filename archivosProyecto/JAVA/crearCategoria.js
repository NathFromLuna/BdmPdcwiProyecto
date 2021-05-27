
$(document).ready(function () {
    ocultarElNav();
    mostrarCategoriasExistentes();
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
    function mostrarCategoriasExistentes() {
        var opc = 2;
        let Body = { opc }
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('../php/categorias.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                var Jason = data;
                //var obj = JSON.parse(Jason);
                console.log(data);
                if(data=="NoHayCategorias"){
                    $("#todasCat").append("<p >No hay categorias disponibles</p>");
                    //<p class="Categoria">Categoria 1</p>
                }else{
                    for (var i in Jason) {
                        $("#todasCat").append("<li id='" + Jason[i]['id_categorias'] + "'class='Categoria'>" + Jason[i]['nombre'] + "</li>");
                    }
                }
            })
    }
});

function crearCat(){
    var nombre = document.getElementById("Nombre").value;
    var descripcion = document.getElementById("desCat").value;
    var opc=1;

    if(nombre != "" && descripcion != ""){
        let Body = { nombre,descripcion,opc }
        
        let jsonBody = JSON.stringify(Body);

        fetch('../php/categorias.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
            return response.text();
        })
        .then(data => {
            
            var Jason =data;
            console.log(Jason);
            if(Jason==="success"){
                alert("Categoria creada con éxito");
                window.location.href="perfil.html";
            }
            else{
                alert("no se pudo crear la categoria, revise que el nombre sea único");
                alert(Jason.result)
            }
                
            //"status" => "ok",
            //"result" => array()
        })
    }
   else{
    window.alert("Llene todos los campos")
   }
   
    
}

