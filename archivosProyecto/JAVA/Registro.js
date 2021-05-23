function Registrar(form) {
  
    var nombre = document.getElementById("name").value;
    var apellidos = document.getElementById("Ap").value;
    var nickname = document.getElementById("Nickname").value;
    var correo = document.getElementById("email").value;
    var esProfeProv = $('input:radio[name=tipo]:checked').val();
    var contrasena = document.getElementById("password").value;
    

    var num = false;
    var carac = false;

    if (contrasena.length >= 8) {

        for (var i = 0; i < contrasena.length; i++) {
            var ch = contrasena.charAt(i);
            if (ch >= "0" || ch <= "9")
                num = true;
            if (ch == "/" || ch == "*" || ch == "¡" || ch == "”" || ch == "#" || ch == "$" || ch == "%" || ch == "&" || ch == "=" || ch == "’" || ch == "?" || ch == "¡" || ch == "¿" || ch == ":" || ch == ";" || ch == "," || ch == "."
                || ch == "-" || ch == "_" || ch == "+" || ch == "{" || ch == "]" || ch == "[" || ch == "}"|| ch=="@") {
                carac = true;
            }
        }
        if (num==true&&carac==true) {
            window.alert("Contraseña guardada");
            var opc=1;
            var esProfe;
            if(esProfeProv=="maestro")
                esProfe="true";
            else{
                if(esProfeProv=="alumno")
                    esProfe="false";
            }
            let Body = {nombre,apellidos,nickname,correo,contrasena,esProfe,opc}


            var FoDatos = new FormData();
            FoDatos.append('nombre',nombre);
            FoDatos.append('apellido',apellidos);
            FoDatos.append('nickname',nickname);
            FoDatos.append('correo',correo);
            FoDatos.append('contrasena',contrasena);
            FoDatos.append('esProfe',esProfe);
            FoDatos.append('foto',$("#image")[0].files[0]);
            FoDatos.append('opc',opc);

           
           fetch('../php/usuarioimagen.php',{method:"POST",body:FoDatos})
           .then(response => {
             return response.text();
           })
           .then(data => {
             
            var Jason =data;
            console.log(Jason);
            if(Jason==="success"){
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