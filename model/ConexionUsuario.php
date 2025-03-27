<?php

require_once 'Conexion.php';

class ConexionUsuario extends Conexion{

    public function __construct(){
        parent::__construct();
    }


    public function insertarUsuario ($username, $email, $password){
        try {
            $query = "INSERT INTO usuario (username, email, password) VALUES (:username, :email, :password)";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':username', $username);
            $preparada->bindParam(':email', $email);
            $preparada->bindParam(':password', $password);

            if ($preparada->execute()) {
                return "Insercion correcta";
            }else {
                return "Insercion fallida";
            }


        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
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
}