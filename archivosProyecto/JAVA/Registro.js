function Registrar(form) {
    var p = document.getElementById("password").value;
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
        if (num == true && carac == true) {
            window.alert("Contraseña guardada");
            llevamePanP();
        }else {
            window.alert("La contraseña debe tener al menos un numero y un caracter especial")
        }
    }
    else
        window.alert("La contraseña debe tener 8 caracteres")

}