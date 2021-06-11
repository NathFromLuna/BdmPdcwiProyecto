var idHabloCon;
var soy;
var profe;
$(document).ready(function () {
    
    
    $("#tablaPersonas").on("click", ".personas", function () {
        idHabloCon=this.id;
        mostrarUnProfe();
        var mensaje = document.getElementById("barraMensaje").value;
        mensaje.innerHTML="";
        debugger;
        traerMensajes();
    });
    $("#barraAbajo").on("click", "#btnEnviar", function () {
        mandarMensaje();
    });
    
    ocultarMensajes();
    function ocultarMensajes() {
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
                    soy=obj['idUsuario'];
                    document.getElementById("imgAvatarUsuario").style.display = 'inline';
                    document.getElementById("cerrarSes").style.display = 'inline';
                    document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                    document.getElementById("iniciaSes").style.display = 'none';  
                    document.getElementById("navHistorial").style.display = 'none';
                   
                    profe=true;
                    traerAlumnos();
                }else{
                    if(obj['esMaestro']==false){
                        soy=obj['idUsuario'];
                        document.getElementById("imgAvatarUsuario").style.display = 'inline';
                        document.getElementById("cerrarSes").style.display = 'inline';
                        document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                        document.getElementById("iniciaSes").style.display = 'none';  
                        document.getElementById("navVentas").style.display = 'none';
                        profe=false;
                        //aqui se manda a llamar la confirmacion de si tiene el curso
                        traerProfesores();
                    }
                }
                    
            })
    }

    function traerAlumnos(){
        
        var opc=5;
        let Body = { opc }
            
        let jsonBody = JSON.stringify(Body);

        fetch('../php/mensajes.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            var Jason =data;
            console.log(Jason);
            debugger;
                //id_usuario,nickname, comentario
            
            var personasMensajes = document.getElementById("tablaPersonas");
            
            if(data=="NoHayAlumnos"){
                alert("no hay nadie para mandar mensaje");
            }else{
                for (var i in Jason){
                    //div id=tablaPersonas, class=personas

                    var botn1 =document.createElement('button');
                    botn1.setAttribute("class","personas");
                    botn1.setAttribute("id",Jason[i]["idAlumno"]);
                    botn1.innerHTML =Jason[i]["nombreAl"];
                    
                    personasMensajes.appendChild(botn1);
                }
            }  
        })
    }

    function traerProfesores(){
        
        var opc=2;
        let Body = { opc }
            
        let jsonBody = JSON.stringify(Body);

        fetch('../php/mensajes.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            var Jason =data;
            console.log(Jason);
            debugger;
                //id_usuario,nickname, comentario
            
            var personasMensajes = document.getElementById("tablaPersonas");
            
            if(data=="NoHayProfes"){
                alert("no hay nadie para mandar mensaje");
            }else{
                for (var i in Jason){
                    //div id=tablaPersonas, class=personas

                    var botn1 =document.createElement('button');
                    botn1.setAttribute("class","personas");
                    botn1.setAttribute("id",Jason[i]["idProfesor"]);
                    botn1.innerHTML =Jason[i]["nombreProfe"];
                    
                    personasMensajes.appendChild(botn1);
                }
            }  
        })
    }

    function mostrarUnProfe() {
        var opc = 3;
        let Body = { opc, idHabloCon}
        console.log(idHabloCon);
        debugger;
        let jsonBody = JSON.stringify(Body)
        
        
        fetch('../php/mensajes.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                var obj = data;
                console.log(obj);
               
                var habloCon = document.getElementById("habloCon");
                
                $("#habloCon").empty();
                
                var p =document.createElement('p');
                p.setAttribute("id","estoyHablandoCon");
                p.setAttribute("value",obj['profeId']);
                p.innerHTML =obj['nameP']+" "+obj['apellidos'];
                habloCon.appendChild(p);

            })
    }

    function mandarMensaje(){
        
        console.log(idHabloCon);
        debugger;
        var mensaje = document.getElementById("barraMensaje").value;
        var opc=1;
        if(mensaje != ""){
            mensaje.innerHTML="";
            let Body = { idHabloCon,mensaje,opc }
            let jsonBody = JSON.stringify(Body);
            fetch('../php/mensajes.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                var Jason =data;
                console.log(Jason);
                debugger;

                /*Usuarios.id_usuario, Usuarios.nombre,Usuarios.apellidos, 
                Usuarios.nickname, Mensajes.id_de, Mensajes.id_para, Mensajes.mensaje,
                Mensajes.fechaEnvio*/
                var mensajesAct = document.getElementById("mensajesActuales");
                if(Jason==="NoHayMensajes"){
                    alert("no hay mensajes");
                }else{
                    $("#barraMensaje").value="";
                    $("#mensajesActuales").empty();
                    for (var i in Jason){
                        
                        //var idHabloCon; var soy;
                        if(soy==Jason[i]["id_de"]){

                            //para el de la persona en sesion
                            var div1=document.createElement('div');
                            div1.setAttribute("class","msg-der");

                            var div2 =document.createElement('div');
                            div2.setAttribute("class","mensaje");
                        
                            var p1 = document.createElement("p");

                            var span1= document.createElement("span");
                            span1.innerHTML =Jason[i]["mensaje"];

                            p1.appendChild(span1);
                            div2.appendChild(p1);
                            div1.appendChild(div2);
                       
                            mensajesAct.appendChild(div1);
                        }else{
                            if(idHabloCon==Jason[i]["id_de"]){
                                //para la persona a la que le manda el mensaje
                                var div1=document.createElement('div');
                                div1.setAttribute("class","msg-izq");

                                var div2 =document.createElement('div');
                                div2.setAttribute("class","mensaje");
                        
                                var p1 = document.createElement("p");

                                var span1= document.createElement("span");
                                span1.innerHTML =Jason[i]["mensaje"];

                                p1.appendChild(span1);
                                div2.appendChild(p1);
                                div1.appendChild(div2);
                       
                                mensajesAct.appendChild(div1);
                            }
                        }
                        
                        
                    }
                }
            })
        }
       else{
        window.alert("Escriba algo antes de enviar")
       }

    }

    function traerMensajes(){

        var opc=4;
        let Body = { idHabloCon,opc }
            
        let jsonBody = JSON.stringify(Body);
        debugger;
        $("#mensajesActuales").empty();
        fetch('../php/mensajes.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            var Jason =data;
            console.log(Jason);
            debugger;

            /*Usuarios.id_usuario, Usuarios.nombre,Usuarios.apellidos, 
            Usuarios.nickname, Mensajes.id_de, Mensajes.id_para, Mensajes.mensaje,
            Mensajes.fechaEnvio*/
            var mensajesAct = document.getElementById("mensajesActuales");
            if(Jason==="NoHayMensajes"){
                alert("no hay mensajes");
            }else{
                $("#barraMensaje").value="";
                for (var i in Jason){           
                    //var idHabloCon; var soy;
                    if(soy==Jason[i]["id_de"]){
                        //para el de la persona en sesion
                        var div1=document.createElement('div');
                        div1.setAttribute("class","msg-der");

                        var div2 =document.createElement('div');
                        div2.setAttribute("class","mensaje");
                    
                        var p1 = document.createElement("p");

                        var span1= document.createElement("span");
                        span1.innerHTML =Jason[i]["mensaje"];

                        p1.appendChild(span1);
                        div2.appendChild(p1);
                        div1.appendChild(div2);
                   
                        mensajesAct.appendChild(div1);
                    }else{
                        if(idHabloCon==Jason[i]["id_de"]){
                            //para la persona a la que le manda el mensaje
                            var div1=document.createElement('div');
                            div1.setAttribute("class","msg-izq");

                            var div2 =document.createElement('div');
                            div2.setAttribute("class","mensaje");
                    
                            var p1 = document.createElement("p");

                            var span1= document.createElement("span");
                            span1.innerHTML =Jason[i]["mensaje"];

                            p1.appendChild(span1);
                            div2.appendChild(p1);
                            div1.appendChild(div2);
                   
                            mensajesAct.appendChild(div1);
                        }
                    }
                    
                    
                }
            }
 
        })
       

        

    }
   
    
    

    

})