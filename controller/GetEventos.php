<?php
require_once('../model/Conexion.php');
require_once('../model/ConexionEvento.php');
session_start();
$cEvento = new ConexionEvento();

echo json_encode($cEvento->getEventos());