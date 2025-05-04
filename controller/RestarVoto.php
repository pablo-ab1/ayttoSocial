<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionDenuncia.php');

$cDenun = new ConexionDenuncia();

if (isset($_POST['id'])) {
    $cDenun->restarVoto($_POST['id']);
}
