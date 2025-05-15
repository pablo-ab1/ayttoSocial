<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionPublicacion.php');
require_once('../model/ConexionUsuario.php');
require_once('../model/ConexionDenuncia.php');
require_once('../model/ConexionEncuesta.php');

session_start();
$cPubli = new ConexionPublicacion();
$cDenun = new ConexionDenuncia();
$cEncu = new ConexionEncuesta();
$usu = new ConexionUsuario();


$permisos = $usu->getDatosConId($_SESSION['usuarioActual'])['permisos'];
echo ($permisos);

if (isset($_POST['perfil'])) {

    if ($_POST['perfil'] == 'propio') {
        $_SESSION['usuarioElegido'] = 'propio';
        volver('perfilUsuario.html');
    }

    // $_SESSION['usuarioElegido'] = $_POST['perfil'];
    // // echo $_SESSION['usuarioElegido'];
    // header('Location: ../vista/perfilUsuario.html');
}

if (isset($_POST['getDatos'])) {
    $usuPubli = new ConexionUsuarioPublicacion();
    echo $_SESSION['usuarioElegido'];
    echo json_encode($usuPubli->obtenerInfoUsuarioPubli($_SESSION['usuarioElegido']));
}

if (isset($_POST['crear'])) {
    $usuId = $_SESSION['usuarioActual'];
    // var_dump($_POST['crear']);
    switch ($_POST['crear']) {
        case 'publicacion':
            var_dump($_FILES['imagenPublicacion']);
            if ((strlen($_FILES['imagenPublicacion']['name']) != 0)) {
               $cPubli->insertarPublicacionImagen($usuId, $_POST['categoria'], $_POST['texto'], $_POST['imagenPublicacion']);
            } else {
                $cPubli->insertarPublicacion($usuId, $_POST['categoria'], $_POST['texto']);
            }
            header("Location: " . $_SERVER['HTTP_REFERER']);
            break;

        case 'denuncia':
            if (isset($_POST['imagenPublicacion'])) {
                ($cDenun->insertarDenunciaImagen($usuId, $_POST['categoria'], $_POST['texto'], $_POST['imagenPublicacion']));
            } else {
                ($cDenun->insertarDenuncia($usuId, $_POST['categoria'], $_POST['texto']));
            }
            header("Location: " . $_SERVER['HTTP_REFERER']);
            break;

        case 'encuesta':
            echo($cEncu->insertarEncuesta($_POST['categoria'], $_POST['titulo'], $usuId, $_POST['opcion1'], $_POST['opcion2'], $_POST['opcion3'], $_POST['opcion4']));
            // header("Location: " . $_SERVER['HTTP_REFERER']);
            break;
    }
}

if (isset($_POST['filtrar'])) {
    $filtro = array(($_POST['filtroFecha'] . '%'), $_POST['categoria']);
    echo $filtro[0];
    echo $filtro[1];
    setcookie('filtros', json_encode($filtro), time() + 60, '/');

    header("Location: " . $_SERVER['HTTP_REFERER']);
}

if (isset($_POST['buscar'])) {
    $termino = htmlspecialchars($_POST['busqueda']);
    setcookie('busqueda', $termino, time() + 30, '/');

    header("Location: " . $_SERVER['HTTP_REFERER']);
}

if(isset($_POST['cerrarSesion'])){
    setcookie('usuarioActual', '', time() - (7 * 24 * 60 * 60), '/');
    setcookie('permisos', '', time() - (7 * 24 * 60 * 60), '/');
    session_unset();       
    session_destroy();
    header('Location: ../vista/inicioSesion.html');
}

function volver($documento)
{
    switch (json_decode($_COOKIE['permisos'])) {
        case 1:
            header('Location: ../vista/vistaUsuario/' . $documento);
            break;
        case 2:
            header('Location: ../vista/vistaAyuntamiento/' . $documento);
            break;
        case 3:
            header('Location: ../vista/vistaAdmin/' . $documento);
    }
}
