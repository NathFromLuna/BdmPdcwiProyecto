$(document).ready(function () {
    mostrarDatosPerfil();
    function mostrarDatosPerfil() {

        var opc = 3;
        let Body = { opc }

        let jsonBody = JSON.stringify(Body)
        fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
            .then(response => {
                return response.json();
            })
            .then(data => {
                var Jason = data;
                var obj = JSON.parse( Jason);
                var nombre = obj['nombre'];
                console.log(obj['nombre']);
                
                document.getElementById("name").innerHTML = obj['nombre'];
                document.getElementById("apellido").innerHTML = obj['apellidos'];
                document.getElementById("nick").innerHTML = obj['nickname'];
                document.getElementById("correo").innerHTML = obj['correo'];
            })
    }
})