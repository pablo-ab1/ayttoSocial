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
    // echo $_SESSION['usuarioElegido'];
    // echo json_encode($usuPubli->obtenerInfoUsuarioPubli($_SESSION['usuarioElegido']));
}

if(isset($_POST['crear'])){
    $usuId = $usu->getUserId($_POST['usuario']); 
    $cPubli->insertarPublicacion($usuId, $_POST['categoria'], $_POST['comentario']); 
    
    header('Location: ../vista/prueba.html');    
}




