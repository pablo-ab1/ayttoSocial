<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionPublicacion.php');

$cPubli = new ConexionPublicacion();

echo json_encode($cPubli->obtenerPublicaciones());