<?php

require_once 'Conexion.php';

class ConexionCategoria extends Conexion{

    public function __construct()
    {
        parent::__construct();
    }

    function getCategorias(){
        try{

            $query = "SELECT * FROM categoria";
            $preparada = $this->pdo->prepare($query);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

}