$(document).ready(function () {
    mostrarDatosPerfil();
    function mostrarDatosPerfil() {

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
                var nombre = obj['nombre'];
                console.log(obj['nombre']);
                
                document.getElementById("name").innerHTML = obj['nombre'];
                document.getElementById("apellido").innerHTML = obj['apellidos'];
                document.getElementById("nick").innerHTML = obj['nickname'];
                document.getElementById("correo").innerHTML = obj['correo'];
                document.getElementById("avatarUsuario").src = "../php/profilePicture.php";
                if(obj['esMaestro']==true){
                    document.getElementById("btnHistorial").style.display = 'none';

                    document.getElementById("imgAvatarUsuario").style.display = 'inline';
                    document.getElementById("cerrarSes").style.display = 'inline';
                    document.getElementById("navHistorial").style.display = 'none';
                    document.getElementById("iniciaSes").style.display = 'none';
                    document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                }else{
                    if(obj['esMaestro']==false)
                        document.getElementById("btnVentas").style.display = 'none';

                        document.getElementById("imgAvatarUsuario").style.display = 'inline';
                        document.getElementById("cerrarSes").style.display = 'inline';
                        document.getElementById("navVentas").style.display = 'none';
                        document.getElementById("iniciaSes").style.display = 'none';
                        document.getElementById("nuevaCat").style.display = 'none';
                        document.getElementById("imgAvatarUsuario").src = "../php/profilePicture.php";
                   }
            })
    }
})