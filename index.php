<?php
session_start();

// var_dump($_COOKIE);
// var_dump(isset($_COOKIE['usuarioActual']));

if(isset($_COOKIE['usuarioActual'])){
    $_SESSION['usuarioActual'] = $_COOKIE['usuarioActual'];
    header('Location: vista/prueba.html');
}else{
    header('Location: vista/inicioSesion.html');
}

?>