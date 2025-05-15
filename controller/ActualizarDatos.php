<?php
session_start();
if (isset($_POST['enviar'])) {
    require_once('../model/Conexion.php');
    require_once('../model/ConexionUsuario.php');
    $usuario = htmlspecialchars($_POST['usuario']);
    $email = htmlspecialchars($_POST['email']);
    $contraseña = htmlspecialchars($_POST['pswd']);
    $contraseña2 = htmlspecialchars($_POST['pswd2']);
    $nombre = htmlspecialchars($_POST['nombre']);
    $apellidos = htmlspecialchars($_POST['apellidos']);
    $fechaNac = htmlspecialchars($_POST['fechaNac']);

    $usu = new ConexionUsuario();
    $fechaNacimiento = date('Y-m-d', strtotime($fechaNac));
    $usu->actualizarUsuario($usuario, $email, $nombre, $apellidos, $fechaNacimiento, $_SESSION['usuarioActual']);

    header("Location: " . $_SERVER['HTTP_REFERER']);

}