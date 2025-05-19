document.addEventListener('DOMContentLoaded', () => {
    getDatos();
    const input = document.getElementById('fotoPerfil');
    input.addEventListener('change', cambiarFoto);
})

async function getDatos() {
    try {
        let respuesta = await fetch('../../controller/GetDatosUsuario.php')
        const datos = await respuesta.json();

        if (datos.error) {
            console.error('Error:', datos.error);
        } else {
            mostrarDatos(datos[0]);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

function mostrarDatos(datos){
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let fechaNac = document.getElementById('fechaNac');
    let usuario = document.getElementById('usuario');
    let email = document.getElementById('email');
    let imagen = document.querySelector('.fotoPerfil');



    nombre.value = datos.nombre;
    apellidos.value = datos.apellidos;
    email.value = datos.email;
    fechaNac.value = datos.fechaNacimiento;
    usuario.value = datos.username;
    imagen.src = datos.fotoPerfil;
}

function cambiarFoto(){
    const img = document.querySelector('.fotoPerfil');
    if(this.files && this.files[0]){
        
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
        } 

        reader.readAsDataURL(this.files[0]);
    }
}