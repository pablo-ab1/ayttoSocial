<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionPublicacion.php');
require_once('../model/ConexionUsuario.php');
require_once('../model/ConexionDenuncia.php');

session_start();
$cPubli = new ConexionPublicacion();
$cDenun = new ConexionDenuncia();
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
            if (isset($_POST['imagenPublicacion'])) {
                $cPubli->insertarPublicacionImagen($usuId, $_POST['categoria'], $_POST['texto'], $_POST['imagenPublicacion']);
            } else {
                $cPubli->insertarPublicacion($usuId, $_POST['categoria'], $_POST['texto']);
            }
            volver('prueba.html');
            break;

        case 'denuncia':
            if (isset($_POST['imagenPublicacion'])) {
                ($cDenun->insertarDenunciaImagen($usuId, $_POST['categoria'], $_POST['texto'], $_POST['imagenPublicacion']));
            } else {
                ($cDenun->insertarDenuncia($usuId, $_POST['categoria'], $_POST['texto']));
            }
            volver('denuncias.html');
            break;
    }
}

if (isset($_POST['filtrar'])) {
    $filtro = array(($_POST['filtroFecha'] . '%'), $_POST['categoria']);
    echo $filtro[0];
    echo $filtro[1];
    setcookie('filtros', json_encode($filtro), time() + 60, '/');

    volver('prueba.html');
}

if (isset($_POST['buscar'])) {
    $termino = htmlspecialchars($_POST['busqueda']);
    setcookie('busqueda', $termino, time() + 30, '/');

    volver('prueba.html');
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
