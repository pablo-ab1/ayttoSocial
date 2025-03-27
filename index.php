<?php
session_start();

$usuario = 'Prueba';
$_SESSION['usuario'] = $usuario;


header('Location: vista/prueba.html');
    
?>