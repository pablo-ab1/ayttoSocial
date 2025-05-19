<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionEncuesta.php');
session_start();

$cEncu = new ConexionEncuesta();

if (isset($_COOKIE['filtros'])) {
    $filtros = json_decode($_COOKIE['filtros']);
    if (isset($filtros[1])) {
        echo json_encode($cEncu->obtenerEncuestasFechaCategoria($filtros[0], $filtros[1]));
    } else {
        echo json_encode($cEncu->obtenerEncuestasFecha($filtros[0]));
    }
} else if (isset($_COOKIE['busqueda'])) {
    $texto = '%' . $_COOKIE['busqueda'] . '%';
    echo json_encode($cEncu->obtenerEncuestasTexto($texto));
} else {
    echo json_encode($cEncu->obtenerEncuestas());
}
