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
    $("#comprarCurso").on("click", "#btnComprar", function () {
        comprarCurso();
    });
    $("#btnComentario").on("click", "#btn", function () {
        debugger;
        hacerComentario();
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
                  
                if(obj['esMaestro']==true){
                    document.getElementById("imgAvatarUsuario").style.display = 'inline';
                    document.getElementById("cerrarSes").style.display = 'inline';
                    document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                    document.getElementById("iniciaSes").style.display = 'none';  
                    document.getElementById("navHistorial").style.display = 'none';
                    document.getElementById("datosForAlumno").style.display = 'none';
                    
                }else{
                    if(obj['esMaestro']==false){
                        document.getElementById("imgAvatarUsuario").style.display = 'inline';
                        document.getElementById("cerrarSes").style.display = 'inline';
                        document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                        document.getElementById("iniciaSes").style.display = 'none';  
                        document.getElementById("navVentas").style.display = 'none';
                        //aqui se manda a llamar la confirmacion de si tiene el curso
                        cursoComprado();
                    }else{
                        document.getElementById("comprarCurso").style.display = 'inline';
                        debugger;
                        document.getElementById("califCurso").style.display = 'none';
                        document.getElementById("nivelesCurso").style.display = 'none';
                        document.getElementById("progresoCur").style.display = 'none';
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
               document.getElementById("titulo").innerHTML = obj['nombre'];
               document.getElementById("titulo2").innerHTML = obj['profeCurso'];
               document.getElementById("titulo3").innerHTML = obj['categorias'];
               document.getElementById("verdaderaDescripcion").innerHTML = obj['descripcion'];
               document.getElementById("costoCantlvls").innerHTML = "Costo del curso: $"+obj['costo']+"<br> Cantidad de niveles: "+obj['cantidadNiveles'];
               document.getElementById("videoCursoAct").src = obj['trailerCurso'];

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
                    $("#nivelesCurso").append("<div><h3 id="+Jason[i]['id_niveles']+" >"+Jason[i]['nombreNvl']+"<div style='display: flex;'></h3><p >Nivel:"+Jason[i]['numeroNivel']+" </p><button id="+Jason[i]['id_niveles']+" class='btnVerClase'>Ver clase</button> </div></div>");
                }
               //id_niveles, nombreNvl , videoLvl, numeroNivel, otrosArchivo
               
            })
    }
    
    function comprarCurso(){
        var idCurso = getQueryVariable("id")
        var opc=6;
        let Body = { idCurso,opc }
            debugger;
        let jsonBody = JSON.stringify(Body);
    
        fetch('../php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
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
    function cursoComprado(){
        var idCurso = getQueryVariable("id")
        var opc=7;
        let Body = { idCurso,opc }
            debugger;
        let jsonBody = JSON.stringify(Body);
    
        fetch('../php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
             return response.json();
        })
        .then(data => {
            var Jason =data;
            debugger;
            console.log(Jason);
            
            if(Jason=="CursoNoReg"){
                document.getElementById("comprarCurso").style.display = 'inline';
                document.getElementById("nivelesCurso").style.display = 'none';
                document.getElementById("califCurso").style.display = 'none';
                document.getElementById("progresoCur").style.display = 'none';
                
            }else{
                if(Jason['terminado']!=""){
                    document.getElementById("comprarCurso").style.display = 'none';
                    document.getElementById("nivelesCurso").style.display = 'inline';
                    document.getElementById("btn").disabled=false;
                    if(Jason['terminado']==true){
                        document.getElementById("califCurso").style.display = 'inline';
                    }else{
                        if(Jason['terminado']==false){
                            document.getElementById("califCurso").style.display = 'none';
                        }
                    }
                }
            }
        })
    }

    function hacerComentario(){
        var comentario = document.getElementById("commentary").value;
        var idCurso = getQueryVariable("id");
        var opc=1;
        
        if(comentario != ""){
            let Body = { comentario,idCurso,opc }
            
            let jsonBody = JSON.stringify(Body);
    
            fetch('../php/comentarios.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
            .then(response => {
                return response.text();
            })
            .then(data => {
                
                var Jason =data;
                console.log(Jason);
                if(Jason==="success"){
                    alert("Comentario publicado con éxito");

                /*<div class="media">
                    <img src="https://i.pinimg.com/originals/5d/3d/10/5d3d1003688a50afee49b8ab1526322a.jpg"
                        class="ImagenPerfil" name="ImagenPerfil" alt="...">
                    <div class="media-body">
                        <h5 class="Comentario" name="NombreComentario">Sara Lin</h5>
                        <p class="text-com"> Me encantan los webtoon. Son tan graciosos y romanticos </p>
                    </div>
                </div>*/
                
                var div1 =document.createElement('div');
                div1.setAttribute("class","media");
                var img1 = document.createElement("img");
                img1.setAttribute("src","../JAVA/fotos.php?id="+Jason[i]['id_curso']);
                img1.setAttribute("alt","fotoCurso");
                img1.setAttribute("height","130");
                img1.setAttribute("width","215");
                var br1 = document.createElement("br");
                
                var br2 = document.createElement("br");
                var p1 = document.createElement("p");
                p1.setAttribute("class","niveles");
                p1.innerHTML ="Lvls:"+ Jason[i]["cantidadNivelesCurso"];
                div1.appendChild(img1);
                div1.appendChild(br1);
                div1.appendChild(a1);
                div1.appendChild(br2);
                div1.appendChild(p1);
                th1.appendChild(div1);
                comentariosEchos.appendChild(th1);


                }
                else{
                    alert("no se pudo publicar el comentario");
                    alert(Jason.result)
                }
            })
        }
       else{
        window.alert("Escriba algo antes de comentar")
       }

    }
    function nivelEsp(idNivel) {
        window.location.href = "verClase.html?id="+idNivel;
    }
})





