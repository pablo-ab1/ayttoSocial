<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionEncuesta.php');

$categorias = new ConexionEncuesta();
echo json_encode($categorias->getEncuestas());