<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionPublicacion.php');
require_once('../model/ConexionUsuario.php');
session_start();
$cPubli = new ConexionPublicacion();
$usu = new ConexionUsuario();

if(isset($_POST['perfil'])){
            $_SESSION['usuarioElegido'] = $_POST['perfil'];
            echo $_SESSION['usuarioElegido'];
            header('Location: ../vista/perfilUsuario.html');
}

// $usuId = $usu->getUserId($_POST['usuario']); 
// $cPubli->insertarPublicacion($usuId, $_POST['categoria'], $_POST['mensaje']); 

// // header('Location: ../vista/prueba.html');


