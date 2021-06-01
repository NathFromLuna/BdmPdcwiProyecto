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
    $("#btnDiploma").on("click", "#btnDip", function () {
        var idCurso = getQueryVariable("id");
        CursoTerm(idCurso);
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
                document.getElementById("btnDiploma").style.display = 'none';
                
            }else{
                if(Jason['terminado']!=""){
                    document.getElementById("comprarCurso").style.display = 'none';
                    document.getElementById("nivelesCurso").style.display = 'inline';
                    document.getElementById("btn").disabled=false;
                    if(Jason['terminado']==true){
                        document.getElementById("califCurso").style.display = 'inline';
                        document.getElementById("btnDiploma").style.display = 'inline';
                    }else{
                        if(Jason['terminado']==false){
                            document.getElementById("btnDiploma").style.display = 'none';
                            document.getElementById("califCurso").style.display = 'none';
                        }
                    }
                }
            }
        })
    }
    traerComentarios();
    function traerComentarios(){
        
        var idCurso = getQueryVariable("id");
        var opc=2;
        let Body = { idCurso,opc }
            
        let jsonBody = JSON.stringify(Body);

        fetch('../php/comentarios.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            var Jason =data;
            console.log(Jason);
            debugger;
                //id_usuario,nickname, comentario
            $("#comentariosEchos").empty();
            var comentariosEchos = document.getElementById("comentariosEchos");
            if(data=="NoHayComentarios"){
                alert("no hay comentarios disponibles");
            }else{
                for (var i in Jason){
                    var div1 =document.createElement('div');
                    div1.setAttribute("class","media");
                    var img1 = document.createElement("img");
                    img1.setAttribute("src","../JAVA/fotosComents.php?id="+Jason[i]["id_usuario"]);
                    img1.setAttribute("class","ImagenPerfil");
                    img1.setAttribute("alt","...");
                    var div2 =document.createElement('div');
                    div2.setAttribute("class","media-body");
                    
                    var h5 = document.createElement("h5");
                    h5.setAttribute("class","Comentario");
                    h5.innerHTML =Jason[i]["nickname"];
    
                    var p1 = document.createElement("p");
                    p1.setAttribute("class","text-com");
                    p1.innerHTML =Jason[i]["comentario"];
    
                    div2.appendChild(h5);
                    div2.appendChild(p1);
                    div1.appendChild(img1);
                    div1.appendChild(div2);
                   
                    comentariosEchos.appendChild(div1);
                }
            }  
 
        })
       

        

    }

    function hacerComentario(){
        var comentario = document.getElementById("commentary").value;
        var idCurso = getQueryVariable("id");
        var opc=1;
        $('#commentary').val('');

        if(comentario != ""){
            let Body = { comentario,idCurso,opc }
            
            let jsonBody = JSON.stringify(Body);
    
            fetch('../php/comentarios.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                var Jason =data;
                console.log(Jason);
                debugger;
                    //id_usuario,nickname, comentario
                $("#comentariosEchos").empty();
                var comentariosEchos = document.getElementById("comentariosEchos");
                if(data=="NoHayComentarios"){
                    alert("no hay comentarios disponibles");
                }else{
                    for (var i in Jason){
                        var div1 =document.createElement('div');
                        div1.setAttribute("class","media");
                        var img1 = document.createElement("img");
                        img1.setAttribute("src","../JAVA/fotosComents.php?id="+Jason[i]["id_usuario"]);
                        img1.setAttribute("class","ImagenPerfil");
                        img1.setAttribute("alt","...");
                        var div2 =document.createElement('div');
                        div2.setAttribute("class","media-body");
                        
                        var h5 = document.createElement("h5");
                        h5.setAttribute("class","Comentario");
                        h5.innerHTML =Jason[i]["nickname"];
        
                        var p1 = document.createElement("p");
                        p1.setAttribute("class","text-com");
                        p1.innerHTML =Jason[i]["comentario"];
        
                        div2.appendChild(h5);
                        div2.appendChild(p1);
                        div1.appendChild(img1);
                        div1.appendChild(div2);
                       
                        comentariosEchos.appendChild(div1);
                    }
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
    function CursoTerm(idNivel) {
        window.location.href = "recibeDiploma.html?id="+idNivel;
    }
})





