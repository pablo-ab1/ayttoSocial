<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionPublicacion.php');
require_once('../model/ConexionUsuario.php');
session_start();
$cPubli = new ConexionPublicacion();
$usu = new ConexionUsuario();

if(isset($_POST['perfil'])){
            $_SESSION['usuarioElegido'] = $_POST['perfil'];
            // echo $_SESSION['usuarioElegido'];
            header('Location: ../vista/perfilUsuario.html');
}

if(isset($_POST['getDatos'])){
    $usuPubli = new ConexionUsuarioPublicacion();
    echo 'Hola';
    echo $_SESSION['usuarioElegido'];
    echo json_encode($usuPubli->obtenerInfoUsuarioPubli($_SESSION['usuarioElegido']));
}

if(isset($_POST['crear'])){
    $usuId = $_SESSION['usuarioActual'];
    $cPubli->insertarPublicacion($usuId, $_POST['categoria'], $_POST['texto']);
    header('Location: ../vista/prueba.html');    
}

if(isset($_POST['filtrar'])){
    
    $filtro = array (($_POST['filtroFecha'] . '%'), $_POST['categoria']);
    echo $filtro[0];
    echo $filtro[1];
    setcookie('filtros',json_encode($filtro), time()+60, '/');
    header('Location: ../vista/prueba.html');
}

if(isset($_POST['buscar'])){
    $termino = htmlspecialchars($_POST['busqueda']);
    setcookie('busqueda',$termino, time()+30, '/');
    header('Location: ../vista/prueba.html');
}



