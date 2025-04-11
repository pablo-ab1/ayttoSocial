<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionPublicacion.php');

$cPubli = new ConexionPublicacion();

if(isset($_POST['id'])){
    $cPubli->borrarPublicacion($_POST['id']);
}