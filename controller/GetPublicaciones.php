<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionPublicacion.php');
session_start();
$cPubli = new ConexionPublicacion();

if(isset($_COOKIE['filtros'])){
    $filtros = json_decode($_COOKIE['filtros']);
    if(isset($filtros[1])){
        echo json_encode($cPubli->obtenerPublicacionesFechaCategoria($filtros[0], $filtros[1]));
    }else{
        echo json_encode($cPubli->obtenerPublicacionesFecha($filtros[0]));
    }
}else if(isset($_COOKIE['busqueda'])){
    $texto = '%' . $_COOKIE['busqueda'] . '%';
    echo json_encode($cPubli->obtenerPublicacionesTexto($texto));
}else{
    echo json_encode($cPubli->obtenerPublicaciones(0));
}


