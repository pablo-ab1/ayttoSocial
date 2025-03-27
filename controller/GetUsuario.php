<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionUsuarioPublicacion.php');

session_start();
$cUsuPubli = new ConexionUsuarioPublicacion();

// echo json_encode($_SESSION['usuarioElegido']);
echo json_encode($cUsuPubli->obtenerInfoUsuarioPubli($_SESSION['usuarioElegido']));