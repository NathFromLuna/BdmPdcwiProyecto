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
                }else{
                    if(obj['esMaestro']==false){
                        document.getElementById("imgAvatarUsuario").style.display = 'inline';
                        document.getElementById("cerrarSes").style.display = 'inline';
                        document.getElementById("navVentas").style.display = 'none';
                        document.getElementById("iniciaSes").style.display = 'none';
                        document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                    }
                }
                
            })
    }
    traerVentasCursos();
    function traerVentasCursos(){
        
        var opc=3;
        let Body = {opc }
            
        let jsonBody = JSON.stringify(Body);

        fetch('../php/cursos.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            var Jason =data;
            console.log(Jason);
            debugger;
                //id_usuario,nickname, comentario
            var tarjetitas = document.getElementById("tarjetitas");
            if(data=="NoHayCursos"){
                alert("no ha creado cursos");
            }else{
                for (var i in Jason){

/*<div class="card ">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="../ImagenesaCambiar/Wonho.jpg" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <a href="../Html's/DatosVentas.html">
                <h5 class="card-title">Como ser un Idol</h5>
              </a>
              
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipiscing elit nibh, lobortis tellus inceptos
                lacinia justo montes fringilla quisque integer, sociis etiam aliquet rhoncus mollis diam ad. </p>
              <p class="card-text">3 años</p>
            </div>
          </div>
        </div>
      </div>*/

                    var div1 =document.createElement('div');
                    div1.setAttribute("class","card");

                    var div2 =document.createElement('div');
                    div2.setAttribute("class","row");
                    div2.setAttribute("class","no-gutters");

                    var div3 =document.createElement('div');
                    div3.setAttribute("class","col-md-4");

                    var img1 = document.createElement("img");
                    img1.setAttribute("src","../JAVA/fotos.php?id="+Jason[i]["id_curso"]);
                    img1.setAttribute("class","card-img");
                    img1.setAttribute("alt","...");

                    var div4 =document.createElement('div');
                    div4.setAttribute("class","col-md-8");
                    
                    var div5 =document.createElement('div');
                    div5.setAttribute("class","card-body");

                    var h5 = document.createElement("h5");
                    h5.setAttribute("class","card-title");
                    h5.innerHTML =Jason[i]["nombre"];
    
                    var a1 =document.createElement('a');
                    a1.setAttribute("href","DatosVentas.html?id="+Jason[i]["id_curso"]);
                    a1.appendChild(h5);

                    var p1 = document.createElement("p");
                    p1.setAttribute("class","card-text");
                    p1.innerHTML =Jason[i]["descripcion"];

                    var p2 = document.createElement("p");
                    p2.setAttribute("class","card-text");
                    p2.innerHTML ="Niveles totales:"+Jason[i]["cantidadNivelesCurso"];
    

                    div5.appendChild(a1);
                    div5.appendChild(p1);
                    div5.appendChild(p2);
                    div4.appendChild(div5);
                    div3.appendChild(img1);
                    div2.appendChild(div3);
                    div2.appendChild(div4);
                    div1.appendChild(div2);
                   
                    tarjetitas.appendChild(div1);
                }
            }  
 
        })
       

        

    }
    

})
