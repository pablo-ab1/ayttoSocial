<?php
session_start();

if (isset($_COOKIE['usuarioActual'])) {
    $_SESSION['usuarioActual'] = $_COOKIE['usuarioActual'];
    switch (json_decode($_COOKIE['permisos'])) {
        case 1:
            header('Location: vista/vistaUsuario/prueba.html');
            break;
        case 2:
            header('Location: vista/vistaAyuntamiento/prueba.html');
            break;
        case 3:
            header('Location: vista/vistaAdmin/prueba.html');
    }
}

if (isset($_POST['enviar'])) {
    require_once('../model/Conexion.php');
    require_once('../model/ConexionUsuario.php');

    $email = htmlspecialchars($_POST['email']);
    $contraseña = htmlspecialchars($_POST['pswd']);
    $recordar = ($_POST['recordar']);
    $nuevoUsuario = new ConexionUsuario();
    $passwd = $nuevoUsuario->getPassword($email);

    if ($contraseña === $passwd[0]) {
        $_SESSION['usuarioActual'] = ($nuevoUsuario->getDatosConEmail($email)[0]['id']);
        $permisos = $nuevoUsuario->getDatosConEmail($email)[0]['permisos'];
        setcookie('permisos', json_encode($permisos), time() + (7 * 24 * 60 * 60), '/');
        if ($recordar) {
            setcookie('usuarioActual', json_encode($_SESSION['usuarioActual']), time() + (7 * 24 * 60 * 60), '/');
        }
        switch ($permisos) {
            case 1:
                header('Location: ../vista/vistaUsuario/prueba.html');
                break;
            case 2:
                header('Location: ../vista/vistaAyuntamiento/prueba.html');
                break;
            case 3:
                header('Location: ../vista/vistaAdmin/prueba.html');
                break;
        }
    } else {
        header('Location: ../vista/inicioSesion.html');
    }
}
