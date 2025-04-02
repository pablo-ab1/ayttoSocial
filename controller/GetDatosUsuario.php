<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionUsuario.php');
session_start();

$usuario = new ConexionUsuario();
echo json_encode($usuario->getDatosConId($_SESSION['usuarioActual']));