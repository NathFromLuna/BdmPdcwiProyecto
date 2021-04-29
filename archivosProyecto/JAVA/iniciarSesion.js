function iniciaSesion(){
    var correo = document.getElementById("Correo").value;
    var contrasena = document.getElementById("Contraseña").value;
    var opc=2;
    let Body = {correo,contrasena,opc}

            let jsonBody = JSON.stringify(Body)
            console.log(jsonBody);
           fetch('../php/usuario.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
           .then(response => {
             return response.json();
           })
           .then(data => {
            var Jason =data;
            console.log(Jason);
            if(Jason=="sesionEncontrada"){
                alert("bienvenido");
                window.location.href = "pantallaPrin.html";
            }
            else
                alert(Jason.result)
            //"status" => "ok",
            //"result" => array()
            })
}