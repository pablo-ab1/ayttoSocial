<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionCategoria.php');

$categorias = new ConexionCategoria();
echo json_encode($categorias->getCategorias());