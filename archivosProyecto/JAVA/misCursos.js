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
    function mostrarEntrada() {

        var opc = 1;
        let Body = { opc }
        
        let jsonBody = JSON.stringify(Body);
        //var foto="Images/placeholder.png"
        $.fetchPosts('php/post.php', jsonBody)
            .then(
                function (data) {
                    //console.log(data);

                    var Jason = data;
                    var obj = JSON.parse(Jason);

                    //console.log(Jason);

                    for (var i in obj) {
                        $("#EspacioEntradas").append("<br>");
                        $("#EspacioEntradas").append("<center><subtitle id='" + obj[i]['postID'] + "' class='TituloBlog'>" + obj[i]['Titulo'] + "<subtitle/><center/>");
                        //$("#EspacioEntradas").append("<center><subtitle onclick='refresh(" + obj[i][postID] + ");'>" + obj[i]['Titulo'] + "<subtitle/><center/>");
                        $("#EspacioEntradas").append("<br>");
                        //$("#EspacioEntradas").append("<center><img class='col-lg-6 col-md-2 col-sm-1 img-fluid' style'height:200px; width:450px;' src='Images/placeholder.png'><center/>");
                        $("#EspacioEntradas").append("<center><img class='col-lg-6 col-md-2 col-sm-1 img-fluid' style'height:200px; width:450px;' src=' " + obj[i]['Imagen'] + " '><center/>");
                        $("#EspacioEntradas").append("<br>");
                        $("#EspacioEntradas").append("<center><sub>" + obj[i]['FechaCreacion'] + "<sub/><center/>");
                        $("#EspacioEntradas").append("<br>"); $("#EspacioEntradas").append("<br>");
                    }
                }
            );

    }
    
    

})
