<?php

require_once 'Conexion.php';

class ConexionUsuarioDenuncia extends Conexion
{

    public function __construct()
    {
        parent::__construct();
    }


    public function getUsername($id)
    {
        try {
            $query = "SELECT username FROM usuario WHERE id = :id";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id', $id);

            if ($preparada->execute()) {
                return $preparada->execute();
            } else {
                return "Insercion fallida";
            }
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function getUserId($username)
    {
        try {
            $query = "SELECT id FROM usuario WHERE usuario.username LIKE :username";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':username', $username);

            if ($preparada->execute()) {
                return $preparada->execute();
            } else {
                echo "Insercion fallida";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function obtenerInfoUsuarioDenun($username)
    {
        try {

            $query = "SELECT username, fotoPerfil, categoria, texto  FROM denuncia LEFT JOIN usuario ON denuncia.id_usuario = usuario.id where usuario.username LIKE :username";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':username', $username);

            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerInfoIdUsuarioDenun($id)
    {
        try {

            $query = "SELECT username, fotoPerfil, imagen, votosFavor, votosContra, categoria, texto, denuncia.fechaCreacion, denuncia.id  FROM denuncia LEFT JOIN usuario ON denuncia.id_usuario = usuario.id where usuario.id LIKE :id ORDER BY fechaCreacion DESC";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id', $id);

            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
