<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionDenuncia.php');
require_once('../model/ConexionUsuarioDenuncia.php');
session_start();
$cDenun = new ConexionDenuncia;
$cUsuDenun = new ConexionUsuarioDenuncia;

if (isset($_SESSION['usuarioElegido'])) {
    if ($_SESSION['usuarioElegido'] == 'propio') {
        $usuarioActual = $cUsuDenun->obtenerInfoIdUsuarioDenun($_SESSION['usuarioActual']);
        echo json_encode($usuarioActual);
    } else {
        echo ('hola');
    }
} else if (isset($_COOKIE['filtros'])) {
    $filtros = json_decode($_COOKIE['filtros']);
    if (isset($filtros[1])) {
        echo json_encode($cDenun->obtenerDenunciasFechaCategoria($filtros[0], $filtros[1]));
    } else {
        echo json_encode($cDenun->obtenerDenunciasFecha($filtros[0]));
    }
} else if (isset($_COOKIE['busqueda'])) {
    $texto = '%' . $_COOKIE['busqueda'] . '%';
    echo json_encode($cDenun->obtenerDenunciasTexto($texto));
} else {
    echo json_encode($cDenun->obtenerDenuncias());
}
