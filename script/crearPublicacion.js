let boton = document.querySelector('#crear');
getPublicaciones();


// boton.addEventListener('click', () => {
//     main = document.querySelector('main');
//     txtUsuario = document.querySelector('#usuario');
//     txtCategoria = document.querySelector('#categoria');
//     txtContenido = document.querySelector('#mensaje');
//     main.prepend(crearPublicacion(txtUsuario.value, txtCategoria.value, txtContenido.value));
//     // txtUsuario.value = txtCategoria.value = txtContenido.value = "";
// });

let publicaciones =[];

async function getPublicaciones() {
    let url = '../controller/GetPublicaciones.php';
    try{
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        datos = await respuesta.text();
        
        publicaciones = JSON.parse(datos);
        console.log(publicaciones);
        publicaciones.forEach(publicacion => {
            main = document.querySelector('main form');
            main.prepend(crearPublicacion(publicacion.username, publicacion.categoria, publicacion.texto));
        });

    }catch (error){
        console.error(error.message);
    }
}

function crearPublicacion(txtUsuario, txtCategoria, txtContenido){
    let publicacion = document.createElement('div');
    let postHead = document.createElement('div');
    let spanUsu = document.createElement('span');
    let span = document.createElement('span');
    let postBody = document.createElement('div');
    publicacion.classList.add('publicacion');
    postHead.classList.add('postHead');
    postBody.classList.add('postBody');

    let usuario = document.createElement('p');
    let category = document.createElement('p');
    let icon = document.createElement('i');
    let boton = document.createElement('button');
    let iconUsu = document.createElement('i'); 
    let contenido =  document.createElement('p');
    usuario.classList.add('usuario');
    category.classList.add('category');
    contenido.classList.add('contenido');

    usuario.textContent = txtUsuario;
    iconUsu.classList.add('fa-solid', 'fa-user', 'usuario');
    iconUsu.style.color = "#800040";
    icon.classList.add('fa-solid', 'fa-trash');
    icon.style.color = 'red';
    category.textContent = txtCategoria;
    contenido.innerHTML = txtContenido;
    boton.type = 'submit';
    boton.name = 'perfil';
    boton.value = txtUsuario;
    
    boton.append(iconUsu);
    spanUsu.append(boton, usuario);
    postHead.append(spanUsu);
    span.append(category, icon);
    postHead.append(span);
    postBody.append(contenido);
    publicacion.append(postHead);
    publicacion.append(postBody);

    return publicacion;
}