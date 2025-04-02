<?php
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

    if ($contraseña != $contraseña2) {
        return false;
    } else {
        $nuevoUsuario = new ConexionUsuario();
        $fechaNacimiento = date('Y-m-d', strtotime($fechaNac));
        if($nuevoUsuario->insertarUsuario($usuario, $email, $contraseña, $nombre, $apellidos, $fechaNacimiento)){
            header('Location: ../vista/inicioSesion.html');
        }else{
            header('Location: ../controller/registro.html');
        }
        
        
        
    }
}