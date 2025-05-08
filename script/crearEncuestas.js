let encuestas =[];

getEncuestas();

async function getEncuestas() {
    let url = '../../controller/GetEncuestas.php';
    console.log(url);

    try{
        
        let respuesta = await fetch(url);    
        if(!respuesta.ok){
            throw new Error(respuesta.statusText);
        }
        
        datos = await respuesta.text();
        // console.log(datos);
        encuestas = JSON.parse(datos);
        console.log(encuestas);
        encuestas.forEach(encuesta => {
            principal = document.querySelector('main .principal form');
            principal.append(crearEncuesta(encuesta));
        });
        // mostrarPublicaciones();

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
    form.id='formEncuestas';

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
    button.textContent = 'votar';

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

{/* <article class="encuesta">
                <h3>Titulo encuesta 3</h3>
                <span><input type="radio" name="idEncuesta" value="1" id="1"> <label for="1">Parque Central de Villa Verde</label>  </span>
                <div class="votos primera"></div>
                <span><input type="radio" name="idEncuesta" value="2" id="2"> <label for="2">Plaza Mayor de San Arcadio</span>
                </label> <div class="votos otra"></div>
                <span><input type="radio" name="idEncuesta" value="3" id="3"> <label for="3"> Paseo Marítimo de Costa Clara</label></span>
                <div class="votos otra"></div>
                <span>
                    <input type="radio" name="idEncuesta" value="4" id="4"> <label for="4">Centro Cultural El Mirador</label>
                </span>
                <div class="votos otra"></div> 
            </article> */}