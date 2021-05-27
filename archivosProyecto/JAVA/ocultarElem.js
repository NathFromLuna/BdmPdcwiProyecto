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

    function buscar(){
        var buscando = document.getElementById("busqueda").value;
        var opc = 1;

        let Body = { opc ,buscando}
        let jsonBody = JSON.stringify(Body)
        console.log(jsonBody);
        fetch('../php/cursos.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {

                var Jason = data;
                console.log(Jason);
                    /*
                <th id="cursos">
                <div class="cursos">
                  <img src="../ImagenesaCambiar/EthanYax.png" alt="fotoCurso" height="130" width="215">
                  <br>
                  <a class="titCursos" href="../Html's/VerCurso.html" onclick="llevameAverCursos()">Titulo del curso</a>
                  <br>
                  <p class="niveles">Lvls: 4</p>
                </div>
              </th>

                    */
                    debugger;
                      $("#listacursos").empty();
                    var listacompleta = document.getElementById("listacursos");
                  for (var i in Jason) {

                     var th1 =document.createElement('th');
                      th1.setAttribute("id","cursos");
                      var div1 =document.createElement('div');
                      div1.setAttribute("id","cursos");
                      var img1 = document.createElement("img");
                      img1.setAttribute("src","../JAVA/foto.php?id="+Jason[i]['id_curso']);
                      img1.setAttribute("alt","fotoCurso");
                      img1.setAttribute("height","130");
                      img1.setAttribute("width","215");
                      var br1 = document.createElement("br");
                      var a1 = document.createElement("a");
                      a1.setAttribute("class","titCurso");
                      a1.setAttribute("href","");//aqui pones la direccion html donde lo colocas
                      a1.setAttribute("onclick","llevameAverCursos()");
                      a1.innerHTML =Jason[i]["nombre"];
                      var br2 = document.createElement("br");
                      var p1 = documen.createElement("p");
                      p1.setAttribute("class","niveles");
                      p1.innerHTML ="Lvls:"+ Jason[i]["cantidadNivelesCurso"];
                      div1.appendChild(img1);
                      div1.appendChild(br1);
                      div1.appendChild(a1);
                      div1.appendChild(br2);
                      div1.appendChild(p1);
                      th1.appendChild(div1);
                      listacompleta.appendChild(th1);
                      
                    }
              
                
            })
    }
    

})

