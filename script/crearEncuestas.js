let encuestas =[];

getEncuestas();

async function getEncuestas() {
    let url = '../../controller/GetEncuestas.php';

    try{
        
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        
        datos = await respuesta.text();
        encuestas = JSON.parse(datos);
        encuestas.forEach(encuesta => {
            principal = document.querySelector('main .principal form');
            principal.append(crearEncuesta(encuesta));
        });

    }catch (error){
        console.error(error.message);
    }
}

function crearEncuesta(encuesta){
    let article = document.createElement('article');
    article.id = encuesta.id;
    let form = document.createElement('form');
    form.action = '../../controller/ActualizarEncuesta.php';
    form.method = 'POST';
    form.classList.add('formEncuestas');

    max = Math.max(encuesta.resultadoOpcion1, encuesta.resultadoOpcion2, encuesta.resultadoOpcion3, encuesta.resultadoOpcion4);
    let titulo = document.createElement('h3');
    titulo.textContent = encuesta.titulo;

    form.append(titulo);

    article.classList.add('encuesta');
    let primeraOpcion = [encuesta.opcion1, encuesta.resultadoOpcion1];
    let primerSpan = crearSpan(encuesta.id, 1, primeraOpcion[0]);
    let primerDiv = crearDiv(max, primeraOpcion[1]);
    form.append(primerSpan, primerDiv);

    let segundaOpcion = [encuesta.opcion2, encuesta.resultadoOpcion2];
    let segundoSpan = crearSpan(encuesta.id, 2, segundaOpcion[0]);
    segundoDiv = crearDiv(max, segundaOpcion[1]);
    form.append (segundoSpan, segundoDiv);

    if(encuesta.opcion3 != null && encuesta.opcion4 != ''){
        let terceraOpcion = [encuesta.opcion3, encuesta.resultadoOpcion3];
        let tercerSpan = crearSpan(encuesta.id, 3, terceraOpcion[0]);
        let tercerDiv = crearDiv(max, terceraOpcion[1]);
        form.append(tercerSpan,tercerDiv)
    }
    if(encuesta.opcion4 != null && encuesta.opcion4 != ''){
        let cuartaOpcion = [encuesta.opcion4, encuesta.resultadoOpcion4];
        let cuartoSpan = crearSpan(encuesta.id, 4, cuartaOpcion[0]);
        let cuartoDiv = crearDiv(max, cuartaOpcion[1]);
        form.append(cuartoSpan,cuartoDiv)
    }

    let button = document.createElement('button');
    button.type = 'submit';
    button.name = 'actualizarEncuesta';
    button.value = encuesta.id;
    button.classList.add('btn-encuesta');
    button.textContent = 'Votar';

    form.append(button);

    article.append(form);
    return article;
}

function crearSpan(idEncuesta, idOpcion, texto){
    let span = document.createElement('span');
    let radio = document.createElement('input');
    let label = document.createElement('label')
    radio.type = 'radio';
    radio.value = idOpcion;
    radio.name= idEncuesta;
    label.textContent = texto;

    span.append(radio, label);

    return span;
}

function crearDiv(max, votos){
    div = document.createElement('div');
    div.classList.add('votos');
    if(votos == max){
        div.classList.add('primera');
        div.style.width = '80%'
    }else{
        size = votos * 80/max;
        div.classList.add('otra');
        div.style.width = size + '%';
    }

    return div;
}