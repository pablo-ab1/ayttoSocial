let botonDenuncia = document.querySelector('#crear');
let numPagDenuncia = 5;
let mesesDenuncias = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
let siguienteDenuncia = document.getElementById('siguientePagina');
let mostrarSiguienteDenuncia = document.getElementById('mostrarSiguiente');
getDenuncias();



// botonDenuncia.addEventListener('click', () => {
//     main = document.querySelector('main');
//     txtUsuario = document.querySelector('#usuario');
//     txtCategoria = document.querySelector('#categoria');
//     txtContenido = document.querySelector('#comentario');
//     main.prepend(crearPublicacion(txtUsuario.value, txtCategoria.value, txtContenido.value));
//     // txtUsuario.value = txtCategoria.value = txtContenido.value = "";
// });



let denuncias =[];
let publicaciones = [];
let denunciasPublicaciones =[];


async function getDenuncias() {
    let url = '../../controller/GetDenuncias.php';
    console.log(url);

    try{
        
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        
        datos = await respuesta.text();
        denuncias = JSON.parse(datos);
        for( let denuncia in denuncias) {
            denuncias[denuncia].tipo = 'denuncia';
            denunciasPublicaciones.push(denuncias[denuncia]);
        };
        // console.log(denunciasPublicaciones);
        getPublicaciones();
        

    }catch (error){
        console.error(error.message);
    }
}

async function getPublicaciones() {
    let url = '../../controller/GetPublicaciones.php';
    console.log(url);

    try{
        
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        
        datos = await respuesta.text();
        publicaciones = JSON.parse(datos);
        for(let publicacion in publicaciones){
            publicaciones[publicacion].tipo = 'publicacion';
            denunciasPublicaciones.push(publicaciones[publicacion]);
        }
        console.log(publicaciones);
        console.log(denunciasPublicaciones);
        mostrarDenunciasPublicaciones();

    }catch (error){
        console.error(error.message);
    }
}

mostrarSiguienteDenuncia.addEventListener('click', (e)=>{
    numPagDenuncia += 5;
    mostrarDenunciasPublicaciones();
})

function mostrarDenunciasPublicaciones() {
    for(i = numPagDenuncia-5; i <= numPagDenuncia-1; i++ ){
        principal = document.querySelector('main .principal form');
        if(denunciasPublicaciones[i] == 'denuncia'){
            principal.append(crearDenuncia(denunciasPublicaciones[i].username, denunciasPublicaciones[i].categoria, denunciasPublicaciones[i].fotoPerfil, denunciasPublicaciones[i].texto, denunciasPublicaciones[i].fechaCreacion, denunciasPublicaciones[i].imagen, denunciasPublicaciones[i].votosFavor, denunciasPublicaciones[i].votosContra, denunciasPublicaciones[i].id));    
        }else{
            principal.append(crearPublicacion(denunciasPublicaciones[i].username, denunciasPublicaciones[i].fotoPerfil, denunciasPublicaciones[i].categoria, denunciasPublicaciones[i].texto, denunciasPublicaciones[i].fechaCreacion, denunciasPublicaciones[i].imagen, denunciasPublicaciones[i].id)); 
        }
    }
        
}

function crearDenuncia(txtUsuario, txtCategoria, imagenUsuario, txtContenido, fechaPublicacion, imagen, votosFavor, votosContra, id){
    let txtFecha = comprobarFecha(fechaPublicacion);

    let publicacion = document.createElement('article');
    let postHead = document.createElement('div');
    let spanUsu = document.createElement('span');
    let span = document.createElement('span');
    let postBody = document.createElement('div');
    let contenedorImagen = document.createElement('div');
    let postFooter = document.createElement('div');
    let spanVotos = document.createElement('span');

    publicacion.classList.add('publicacion', 'denuncia');
    publicacion.id = id;
    postHead.classList.add('postHead');
    postBody.classList.add('postBody');
    postFooter.classList.add('postFooter');
    contenedorImagen.classList.add('contenedorImagen');
    spanVotos.classList.add('votos');
    crearSpanVotos(votosFavor, votosContra, spanVotos, id);

    let usuario = document.createElement('p');
    let category = document.createElement('p');
    let icon = document.createElement('i');
    let botonDenuncia = document.createElement('button');
    let iconUsu = document.createElement('img'); 
    let contenido =  document.createElement('p');
    let fecha = document.createElement('p');
    usuario.classList.add('usuario');
    category.classList.add('category');
    contenido.classList.add('contenido');

    usuario.textContent = txtUsuario;
    iconUsu.classList.add('imgUsuario');
    iconUsu.src = imagenUsuario;
    iconUsu.classList.add('fa-solid', 'fa-user', 'usuario');
    iconUsu.style.color = "#800040";
    icon.classList.add('fa-solid', 'fa-trash');
    icon.style.color = 'red';
    icon.id = id;
    icon.addEventListener('click', e => eliminarDenuncia(e));
    category.textContent = txtCategoria;
    contenido.innerHTML = txtContenido;
    botonDenuncia.type = 'submit';
    botonDenuncia.name = 'perfil';
    botonDenuncia.value = txtUsuario;
    fecha.textContent = txtFecha;
    
    botonDenuncia.append(iconUsu);
    spanUsu.append(iconUsu, usuario);
    postHead.append(spanUsu);
    span.append(category);
    span.append(icon);
    postHead.append(span);
    postBody.append(contenido);
    postFooter.append(spanVotos, fecha);
    publicacion.append(postHead);
    if(imagen != null){
        contenedorImagen.append(crearImagen(imagen));
        publicacion.append(contenedorImagen);
    }
    publicacion.append(postBody);
    publicacion.append(postFooter);

    return publicacion;
}

function crearPublicacion(txtUsuario, fotoPerfil, txtCategoria, txtContenido, fechaPublicacion, imagen, id){
    let txtFecha = comprobarFecha(fechaPublicacion);

    let publicacion = document.createElement('article');
    let postHead = document.createElement('div');
    let spanUsu = document.createElement('span');
    let span = document.createElement('span');
    let postBody = document.createElement('div');
    let contenedorImagen = document.createElement('div');
    let postFooter = document.createElement('div');
    publicacion.classList.add('publicacion');
    postHead.classList.add('postHead');
    postBody.classList.add('postBody');
    postFooter.classList.add('postFooter');
    contenedorImagen.classList.add('contenedorImagen');

    let usuario = document.createElement('p');
    let category = document.createElement('p');
    let icon = document.createElement('i');
    let boton = document.createElement('button');
    let iconUsu = document.createElement('img'); 
    let contenido =  document.createElement('p');
    let fecha = document.createElement('p');
    usuario.classList.add('usuario');
    category.classList.add('category');
    contenido.classList.add('contenido');

    usuario.textContent = txtUsuario;
    iconUsu.classList.add('imgUsuario');
    iconUsu.src = fotoPerfil;
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
    spanUsu.append(iconUsu, usuario);
    postHead.append(spanUsu);
    span.append(category);
    span.append(icon);
    postHead.append(span);
    
    postBody.append(contenido);
    postFooter.append(fecha);
    publicacion.append(postHead);
    if(imagen != null){
        contenedorImagen.append(crearImagen(imagen));
        // postBody.append(contenedorImagen);
        publicacion.append(contenedorImagen);
    }
    publicacion.append(postBody);
    publicacion.append(postFooter);

    return publicacion;
}

function crearSpanVotos(votosFavor, votosContra, span, id){
    let spanFavor = document.createElement('span');
    let spanContra = document.createElement('span');
    let textoVotosFavor = document.createElement('p');
    let textoVotosContra = document.createElement('p');
    textoVotosFavor.textContent = votosFavor;
    textoVotosContra.textContent = votosContra;

    let iconoFavor = document.createElement('i');
    let iconoContra = document.createElement('i');
    iconoFavor.classList.add("fa-solid", "fa-thumbs-up");
    iconoContra.classList.add("fa-solid", "fa-thumbs-down");

    spanFavor.append(iconoFavor, textoVotosFavor);
    spanContra.append(iconoContra, textoVotosContra);

    iconoFavor.addEventListener('click', (e) =>{
        let contenedor = e.target.closest('.votos');
        if (!contenedor.classList.contains('clicked')){
            sumarVoto(id);
            textoVotosFavor.textContent = +textoVotosFavor.textContent + 1; 
            contenedor.classList.add('clicked');
        }
        
        
    } );
    iconoContra.addEventListener('click', (e) => {
        let contenedor = e.target.closest('.votos');
        if (!contenedor.classList.contains('clicked')){
            restarVoto(id);
            textoVotosContra.textContent = +textoVotosContra.textContent + 1; 
            contenedor.classList.add('clicked');
        }
    });


    span.append(spanFavor, spanContra);

}

function crearImagen(urlImagen){
    url = '../'+ urlImagen;
    imagen = document.createElement('img');
    imagen.src = url;
    imagen.loading = 'lazy';

    imagen.addEventListener('click', (e) => {
        mostrarImagenGrande(e.target.src);
    });

    return(imagen);
}

function mostrarImagenGrande(url) {
    // Crear fondo oscuro
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = 9999;

    // Crear imagen grande
    const imgGrande = document.createElement('img');
    imgGrande.src = url;
    imgGrande.style.maxWidth = '90%';
    imgGrande.style.maxHeight = '90%';

    // Cerrar al hacer clic en el fondo
    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    overlay.appendChild(imgGrande);
    document.body.appendChild(overlay);
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
        mes = mesesDenuncias[+fechaPubli.getMonth() ] ;
        texto = fechaPubli.getDate() + ' ' + mes;
    }else{
        mes = +fechaPubli.getMonth() + 1;
        texto = fechaPubli.getDate() + '/' + mes + '/' + fechaPubli.getUTCFullYear();
    }

    return(texto);
}

function eliminarDenuncia(e){
    let id = e.target.id;
    let article = e.target.closest('article');
    article.style.display = 'none';
    fetch('../../controller/EliminarDenuncia.php',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + encodeURIComponent(id)
    })
}

function sumarVoto(id){
    fetch('../../controller/SumarVoto.php',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + encodeURIComponent(id)
    })
}

function restarVoto(id){
    fetch('../../controller/RestarVoto.php',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + encodeURIComponent(id)
    })
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
}