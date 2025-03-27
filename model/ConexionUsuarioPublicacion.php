<?php

require_once 'Conexion.php';

class ConexionUsuarioPublicacion extends Conexion{

    public function __construct(){
        parent::__construct();
    }


    public function getUsername($id){
        try {
            $query = "SELECT username FROM usuario WHERE id = :id";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id', $id);

            if ($preparada->execute()) {
                return $preparada->execute();
            }else {
                return "Insercion fallida";
            }
            
        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

    public function getUserId($username){
        try {
            $query = "SELECT id FROM usuario WHERE usuario.username LIKE :username";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':username', $username);

            if ($preparada->execute()) {
                return $preparada->execute();
            }else {
                echo "Insercion fallida";
            }
            
        }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
        }
    }

    public function obtenerInfoUsuarioPubli($username){
        try{

            $query = "SELECT username, categoria, texto  FROM publicacion LEFT JOIN usuario ON publicacion.id_usuario = usuario.id where usuario.username LIKE :username";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':username', $username);

            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }
}