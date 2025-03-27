<?php

require_once 'Conexion.php';

class ConexionPublicacion extends Conexion{

    public function __construct()
    {
        parent::__construct();
    }

    public function insertarPublicacion($id_usuario, $categoria, $texto) {
        try{

            $query = "INSERT INTO publicacion (id_usuario, categoria, texto) VALUES (:id_usuario, :categoria, :texto)";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id_usuario', $id_usuario);
            $preparada->bindParam(':categoria', $categoria);
            $preparada->bindParam(':texto', $texto);

            if($preparada->execute()){
                return "Publicacion creada";
            }else{
                return "La publicacion no se ha podido crear";
            }

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerPublicaciones(){
        try{

            $query = "SELECT username, categoria, texto, publicacion.id  FROM publicacion LEFT JOIN usuario ON publicacion.id_usuario = usuario.id";
            $preparada = $this->pdo->prepare($query);

            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }
}