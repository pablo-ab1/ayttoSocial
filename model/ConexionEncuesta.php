<?php

require_once 'Conexion.php';

class ConexionEncuesta extends Conexion{

    public function __construct()
    {
        parent::__construct();
    }

    function getEncuestas(){
        try{

            $query = "SELECT * FROM encuesta";
            $preparada = $this->pdo->prepare($query);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

}