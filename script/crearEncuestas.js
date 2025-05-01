let encuestas =[];

getEncuestas();

async function getEncuestas() {
    let url = '../controller/GetEncuestas.php';
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
            crearEncuesta(encuesta);
        });
        // mostrarPublicaciones();

    }catch (error){
        console.error(error.message);
    }
}

function crearEncuesta(encuesta){
    let article = document.createElement('article');
    article.id = encuesta.id;

    let titulo = document.createElement('h3');
    titulo.textContent = encuesta.titulo;

    article.classList.add('encuesta');
    let primeraOpcion = [encuesta.opcion1, encuesta.resultadoOpcion1];
    let primerSpan = document.createElement('span');
    let segundaOpcion = [encuesta.opcion2, encuesta.resultadoOpcion2];
    let segundoSpan = document.createElement('span');
    if(encuesta.opcion3 != null){
        let terceraOpcion = [encuesta.opcion3, encuesta.resultadoOpcion3];
        let tercerSpan = document.createElement('span');
    }
    if(encuesta.opcion4 != null){
        let cuartaOpcion = [encuesta.opcion4, encuesta.resultadoOpcion4];
        let cuartoSpan = document.createElement('span');
    }

}

function crearSpan(id, nombre){
    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.value = nombre;
    radio.id = nombre.str.replace(/\s+/g, '');

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