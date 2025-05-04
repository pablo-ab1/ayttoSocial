let boton = document.querySelector('#crear');
let numPag = 5;
let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
let siguiente = document.getElementById('siguientePagina');
let mostrarSiguiente = document.getElementById('mostrarSiguiente');
getDenuncias();



// boton.addEventListener('click', () => {
//     main = document.querySelector('main');
//     txtUsuario = document.querySelector('#usuario');
//     txtCategoria = document.querySelector('#categoria');
//     txtContenido = document.querySelector('#comentario');
//     main.prepend(crearPublicacion(txtUsuario.value, txtCategoria.value, txtContenido.value));
//     // txtUsuario.value = txtCategoria.value = txtContenido.value = "";
// });



let denuncias =[];

async function getDenuncias() {
    let url = '../../controller/GetDenuncias.php';
    console.log(url);

    try{
        
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        
        datos = await respuesta.text();
        // console.log(datos);
        denuncias = JSON.parse(datos);
        console.log(denuncias);
        mostrarDenuncias();

    }catch (error){
        console.error(error.message);
    }
}

mostrarSiguiente.addEventListener('click', (e)=>{
    numPag += 5;
    mostrarDenuncias();
})

function mostrarDenuncias() {
    for(i = numPag-5; i <= numPag-1; i++ ){
        principal = document.querySelector('main .principal form');
        console.log(denuncias.actual);
        if(denuncias.actual){
            principal.append(crearPublicacion(denuncias[i].username, denuncias[i].categoria, denuncias[i].texto, denuncias[i].fechaCreacion, denuncias[i].votosFavor, denuncias[i].votosContra, denuncias[i].id, denuncias.actual));    
        }else{
            principal.append(crearPublicacion(denuncias[i].username, denuncias[i].categoria, denuncias[i].texto, denuncias[i].fechaCreacion, denuncias[i].votosFavor, denuncias[i].votosContra, denuncias[i].id));    
        }
    }
        
}

function crearPublicacion(txtUsuario, txtCategoria, txtContenido, fechaPublicacion, votosFavor, votosContra, id, actual = false){
    let txtFecha = comprobarFecha(fechaPublicacion);

    let publicacion = document.createElement('article');
    let postHead = document.createElement('div');
    let spanUsu = document.createElement('span');
    let span = document.createElement('span');
    let postBody = document.createElement('div');
    let postFooter = document.createElement('div');
    let spanVotos = document.createElement('span');

    publicacion.classList.add('publicacion', 'denuncia');
    publicacion.id = id;
    postHead.classList.add('postHead');
    postBody.classList.add('postBody');
    postFooter.classList.add('postFooter');
    spanVotos.classList.add('votos');
    crearSpanVotos(votosFavor, votosContra, spanVotos, id);

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
    postBody.append(contenido);
    postFooter.append(spanVotos, fecha);
    publicacion.append(postHead);
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
    iconoFavor.classList.add("fa-solid", "fa-up-long");
    iconoContra.classList.add("fa-solid", "fa-down-long");

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
    fetch('../controller/EliminarPublicacion.php',{
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