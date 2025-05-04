document.addEventListener('DOMContentLoaded', () => {
    getDatos();
})

async function getDatos() {
    try {
        let respuesta = await fetch('../../controller/GetDatosUsuario.php')
        const datos = await respuesta.json();

        if (datos.error) {
            console.error('Error:', datos.error);
        } else {
            console.log('User data:', datos);
            mostrarDatos(datos[0]);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

function mostrarDatos(datos){
    let contenedor = document.querySelector('.infoUsuario');
    let titulo = contenedor.querySelector('#username');
    let imagen = contenedor.querySelector('img');
    let listaDatos = contenedor.querySelector('#datos');
    let nombre  = document.createElement('li');
    let apellidos = document.createElement('li');
    let fechaNac = document.createElement('li');

    fecha = datos.fechaNacimiento.substring(8,10) + '/' + datos.fechaNacimiento.substring(5,7) + '/' + datos.fechaNacimiento.substring(0,4);

    titulo.textContent = datos.username;
    imagen.src = datos.fotoPerfil;
    nombre.textContent = datos.nombre;
    apellidos.textContent = datos.apellidos;
    fechaNac.textContent = fecha;
    listaDatos.append(nombre, apellidos, fechaNac);


}

