<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionEncuesta.php');

$cEncu = new ConexionEncuesta();

if (isset($_POST['actualizarEncuesta'])) {
    $id = $_POST['actualizarEncuesta'];
    echo $id;
    $cEncu->aumentarVoto($_POST['actualizarEncuesta'], $_POST['' . $id]);
}
