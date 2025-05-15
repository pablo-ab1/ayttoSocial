<?php
session_start();
if (isset($_POST['enviar'])) {
    require_once('../model/Conexion.php');
    require_once('../model/ConexionUsuario.php');
    $usuario = htmlspecialchars($_POST['usuario']);
    $email = htmlspecialchars($_POST['email']);
    $nombre = htmlspecialchars($_POST['nombre']);
    $apellidos = htmlspecialchars($_POST['apellidos']);
    $fechaNac = htmlspecialchars($_POST['fechaNac']);
    $fotoPerfil = htmlspecialchars($_POST['fotoPerfil']);

    $usu = new ConexionUsuario();
    $fechaNacimiento = date('Y-m-d', strtotime($fechaNac));
    echo ($usu->actualizarUsuario($usuario, $email, $nombre, $apellidos, $fechaNacimiento, $_SESSION['usuarioActual']));

    header("Location: " . $_SERVER['HTTP_REFERER']);
}
