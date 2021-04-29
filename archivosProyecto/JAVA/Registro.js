function Registrar(form) {
  
    var nombre = document.getElementById("name").value;
    var apellidos = document.getElementById("Ap").value;
    var nickname = document.getElementById("password").value;
    var correo = document.getElementById("email").value;
    var esProfeProv = $('input:radio[name=tipo]:checked').val();
    var p = document.getElementById("password").value;
    var foto = document.getElementById("password").value;

    var num = false;
    var carac = false;

    if (p.length >= 8) {

        for (var i = 0; i < p.length; i++) {
            var ch = p.charAt(i);
            if (ch >= "0" || ch <= "9")
                num = true;
            if (ch == "/" || ch == "*" || ch == "¡" || ch == "”" || ch == "#" || ch == "$" || ch == "%" || ch == "&" || ch == "=" || ch == "’" || ch == "?" || ch == "¡" || ch == "¿" || ch == ":" || ch == ";" || ch == "," || ch == "."
                || ch == "-" || ch == "_" || ch == "+" || ch == "{" || ch == "]" || ch == "[" || ch == "}") {
                carac = true;
            }

        }
        if (true) {
            window.alert("Contraseña guardada");
            var opc=1;
            foto="todavia no jala";
            var esProfe;
            if(esProfeProv=="maestro")
                esProfe="true";
            else{
                if(esProfeProv=="alumno")
                    esProfe="false";
            }

            nickname="f";
            let Body = {nombre,apellidos,nickname,correo,p,esProfe,foto,opc}

            let jsonBody = JSON.stringify(Body)
           fetch('../php/usuario.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
           .then(response => {
             return response.json();
           })
           .then(data => {
            var Jason =data;
            console.log(Jason);
            if(Jason=="success"){
                alert("Registro exitoso");
                window.location.href="IS.html";
            }
            else
                alert(Jason.result)
            //"status" => "ok",
            //"result" => array()
            })
        }else {
            window.alert("La contraseña debe tener al menos un numero y un caracter especial")
        }
    }
    else
        window.alert("La contraseña debe tener 8 caracteres")

}