<?php

require_once 'Conexion.php';

class ConexionEvento extends Conexion
{

    public function __construct()
    {
        parent::__construct();
    }

    function getEventos()
    {
        try {

            $query = "SELECT * FROM evento WHERE fecha >= NOW() ORDER BY fecha ASC";
            $preparada = $this->pdo->prepare($query);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
