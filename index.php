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
} else {
    header('Location: vista/inicioSesion.html');
}
