


function editarDatos() {

    var nombre = document.getElementById("Nombre").value;
    var apellidos = document.getElementById("Apellidos").value;
    var nickname = document.getElementById("Nickname").value;
    var correo = document.getElementById("Correo").value;
    var foto = "not yet";
    var opc = 4;

    let Body = { nombre, apellidos, nickname, correo, foto, opc }
    let jsonBody = JSON.stringify(Body)
    fetch('../php/usuario.php', { method: "POST", header: { 'Content-Type': 'application/json' }, body: jsonBody })
        .then(response => {
            return response.json();
        })
        .then(data => {
            var Jason = data;
            console.log(Jason);
            if (Jason == "CambiosHechos") {
                alert("Cambio exitoso");
                window.location.href = "perfil.html";
            }
            else
                alert(Jason.result)
        })
}