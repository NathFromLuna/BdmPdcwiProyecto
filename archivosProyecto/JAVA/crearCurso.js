var cantNiveles=0;
var nombreNivel=Array();
var videoNivel=Array();
var otrosArchivos=Array();
var idNivel=Array();
$(document).ready(function () {
    cantNiveles=0;
    var idNiveles=0;
    $("#añadeLvl").click(function () {
        var nombre = $("#nameLvl").val();
        var video =$("#videoLvl")[0].files[0];
        var videoLiga= $("#videoLvl").val();
        var archivo =$("#archivoNivel")[0].files[0];
        cantNiveles++;
        nombreNivel.push(nombre);
        videoNivel.push(video);
        otrosArchivos.push(archivo);
        idNivel.push(idNiveles);
        $("#listaNiveles").append("<li id='" + idNiveles + "'>" + nombre + " " + videoLiga + "<br> <button id='" + idNiveles + "' class='nuevoLvl'>Eliminar</li>");
        idNiveles++;
    });
    $("ul").on("click", ".nuevoLvl", function () {
        cantNiveles--;
        this.id;
        var nivelAborrar;
        for(var i=0;i<(idNivel.length);i++){
            if(this.id==idNivel[i]){
                nivelAborrar=idNivel[i];
            }
        }
        nombreNivel.splice(nivelAborrar,1);
        videoNivel.splice(nivelAborrar,1);
        otrosArchivos.splice(nivelAborrar,1);
        idNivel.splice(nivelAborrar,1);
        debugger;
        $(this).parent().remove();
    });

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
    mostrarCategoriasExistentes();
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
                    debugger;
                    $("#categoria1").append("<option value='0' >No hay categorias disponibles</option>");
                    $("#categoria2").append("<option value='0' >No hay categorias disponibles</option>");
                    //<p class="Categoria">Categoria 1</p>
                }else{
                    for (var i in Jason) {
                        $("#categoria1").append("<option value='"+ Jason[i]['id_categorias'] +"' >"+ Jason[i]['nombre'] +"</option>");
                        $("#categoria2").append("<option value='"+ Jason[i]['id_categorias'] +"' >"+ Jason[i]['nombre'] +"</option>");
                       
                    }
                }
            })
    }
    
        
});

function crearCurso(){
        var nombre = document.getElementById("nameCur").value;
        var descripcion = document.getElementById("desCur").value;
        var cat1 = document.getElementById("categoria1").value;
        var cat2 = document.getElementById("categoria2").value;
        var costo = document.getElementById("costoCur").value;
        var cantLvls = cantNiveles;
        var opc=1;
        if(cat1 == "0" || cat2 == "0"){
            alert("Seleccione una categoria, si no hay creadas, debe crear una");
        }
        else {
            var apCost = true;
            for (var i = 0; i < costo.length; i++) {
                var ch = costo.charAt(i);
                if (ch < "0" || ch > "9") {
                    apCost = false;
                        
                 }
            }

            if(apCost == true){
                if(cantLvls<=0){
                    alert("agregue un nivel");
                }
                else{
                    if(nombre != "" && descripcion != "" && costo != "" && cantLvls != ""){
                        if(cat1==cat2){
                            alert("elija dos categorias diferentes");
                        }
                        else{
                            debugger;
                                var cancel = false;
                                var comprobacion;
                                var FoDatos = new FormData();
                                FoDatos.append('nombre',nombre);
                                FoDatos.append('descripcionCurso',descripcion);
                               // FoDatos.append('trailer',trailer);                    
                                FoDatos.append('precio',costo);
                                FoDatos.append('niveles',cantLvls);
                                FoDatos.append('categoria1',cat1);
                                FoDatos.append('categoria2',cat2);
                                FoDatos.append('foto',$("#imageMin")[0].files[0]);
                                comprobacion = $("#imageMin")[0].files[0];
                                if (comprobacion == undefined){
                                    cancel = true
                                }
                                FoDatos.append('trailer',$("#videoTrailer")[0].files[0]);
                                comprobacion = $("#videoTrailer")[0].files[0];
                                if (comprobacion == undefined){
                                    cancel = true
                                }
                                FoDatos.append('opc',opc);
                                for(var i=0;i<(idNivel.length);i++){
                                    FoDatos.append('nombreNlv'+i,nombreNivel[i]);
                                    FoDatos.append('videoNvl'+i,videoNivel[i]);
                                    comprobacion = videoNivel[i];
                                    if(comprobacion == undefined){                                   
                                        cancel = true;
                                    }
                                    FoDatos.append('otroArchNvl'+i,otrosArchivos[i]);
                                }                    
                                if(cancel == false){
                                    fetch('../php/cursosImagen.php',{method:"POST",body:FoDatos})
                                    .then(response => {
                                    return response.text();
                                    })
                                    .then(data => {
                            
                                        var Jason =data;
                                        console.log(Jason);
                                        debugger;
                                        if(Jason==="success"){
                                            alert("Curso creado con éxito");
                                            window.location.href="misCursos.html";
                                        }
                                        else{
                                            alert(Jason.result)
                                            //"status" => "ok",
                                            //"result" => array()
                                        }
                                        })
                                }
                                else{
                                    alert("El curso debe tener imagen y trailer y todos los niveles deben tener un video");
                                }                
                        }
                    }
                    else{
                        alert("Llene todos los campos")
    
                    }     
                
                }
            }
            else{
                alert("Solo números");
            }

     
        }
  
}

