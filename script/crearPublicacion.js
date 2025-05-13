let boton = document.querySelector('#crear');
let numPag = 5;
let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
let siguiente = document.getElementById('siguientePagina');
let mostrarSiguiente = document.getElementById('mostrarSiguiente');
getPublicaciones();



// boton.addEventListener('click', () => {
//     main = document.querySelector('main');
//     txtUsuario = document.querySelector('#usuario');
//     txtCategoria = document.querySelector('#categoria');
//     txtContenido = document.querySelector('#comentario');
//     main.prepend(crearPublicacion(txtUsuario.value, txtCategoria.value, txtContenido.value));
//     // txtUsuario.value = txtCategoria.value = txtContenido.value = "";
// });



let publicaciones =[];

async function getPublicaciones() {
    let url = '../../controller/GetPublicaciones.php';
    console.log(url);

    try{
        
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        
        datos = await respuesta.text();
        // console.log(datos);
        publicaciones = JSON.parse(datos);
        console.log(publicaciones);
        mostrarPublicaciones();

    }catch (error){
        console.error(error.message);
    }
}

mostrarSiguiente.addEventListener('click', (e)=>{
    numPag += 5;
    mostrarPublicaciones();
})

function mostrarPublicaciones() {
    for(i = numPag-5; i <= numPag-1; i++ ){
        principal = document.querySelector('main .principal form');
        console.log(publicaciones.actual);
        if(publicaciones.actual){
            principal.append(crearPublicacion(publicaciones[i].username, publicaciones[i].categoria, publicaciones[i].texto, publicaciones[i].fechaCreacion, publicaciones[i].imagen, publicaciones[i].id, publicaciones.actual));    
        }else{
            principal.append(crearPublicacion(publicaciones[i].username, publicaciones[i].categoria, publicaciones[i].texto, publicaciones[i].fechaCreacion, publicaciones[i].imagen));    
        }
    }
        
}

function crearPublicacion(txtUsuario, txtCategoria, txtContenido, fechaPublicacion, imagen, id=false, actual = false){
    let txtFecha = comprobarFecha(fechaPublicacion);

    let publicacion = document.createElement('article');
    let postHead = document.createElement('div');
    let spanUsu = document.createElement('span');
    let span = document.createElement('span');
    let postBody = document.createElement('div');
    let postFooter = document.createElement('div');
    publicacion.classList.add('publicacion');
    postHead.classList.add('postHead');
    postBody.classList.add('postBody');
    postFooter.classList.add('postFooter');

    let usuario = document.createElement('p');
    let category = document.createElement('p');
    let icon = document.createElement('i');
    let boton = document.createElement('button');
    let iconUsu = document.createElement('i'); 
    let contenido =  document.createElement('p');
    let fecha = document.createElement('p');
    usuario.classList.add('usuario');
    category.classList.add('category');
    contenido.classList.add('contenido');

    usuario.textContent = txtUsuario;
    iconUsu.classList.add('fa-solid', 'fa-user', 'usuario');
    iconUsu.style.color = "#800040";
    icon.classList.add('fa-solid', 'fa-trash');
    icon.style.color = 'red';
    icon.id = id;
    icon.addEventListener('click', e => eliminarPublicacion(e));
    category.textContent = txtCategoria;
    contenido.innerHTML = txtContenido;
    boton.type = 'submit';
    boton.name = 'perfil';
    boton.value = txtUsuario;
    fecha.textContent = txtFecha;
    
    boton.append(iconUsu);
    spanUsu.append(boton, usuario);
    postHead.append(spanUsu);
    span.append(category);
    if(actual){span.append(icon)};
    postHead.append(span);
    if(imagen != null){
        postBody.append(crearImagen(imagen));
    }
    postBody.append(contenido);
    postFooter.append(fecha);
    publicacion.append(postHead);
    publicacion.append(postBody);
    publicacion.append(postFooter);

    return publicacion;
}

function crearImagen(urlImagen){
    url = '../'+ urlImagen;
    imagen = document.createElement('img');
    imagen.src = url;
    imagen.loading = 'lazy';
    return(imagen);
}

function comprobarFecha(fecha){
    let fechaPubli = new Date(fecha);
    let hoy = new Date();
    let texto;

    if(hoy.getDate() == fechaPubli.getDate() && hoy.getMonth() == fechaPubli.getMonth() && hoy.getUTCFullYear() == fechaPubli.getUTCFullYear()){
        if(String(fechaPubli.getMinutes()).length == 1){
            texto = fechaPubli.getHours() + ':0' + fechaPubli.getMinutes();
        }else{
            texto = fechaPubli.getHours() + ':' + fechaPubli.getMinutes();
        }
    }else if(hoy.getUTCFullYear() == fechaPubli.getUTCFullYear()){
        mes = meses[+fechaPubli.getMonth() ] ;
        texto = fechaPubli.getDate() + ' ' + mes;
    }else{
        mes = +fechaPubli.getMonth() + 1;
        texto = fechaPubli.getDate() + '/' + mes + '/' + fechaPubli.getUTCFullYear();
    }

    return(texto);
}

function eliminarPublicacion(e){
    let id = e.target.id;
    let article = e.target.closest('article');
    article.style.display = 'none';
    fetch('../../controller/EliminarPublicacion.php',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + encodeURIComponent(id)
    })
    // .then(response => response.text())
    // .then(data => {

    // });

}