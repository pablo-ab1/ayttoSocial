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

    public function obtenerPublicaciones($limite){
        try{

            $query = "SELECT username, categoria, texto, publicacion.id, publicacion.fechaCreacion  FROM publicacion LEFT JOIN usuario ON publicacion.id_usuario = usuario.id ORDER BY id DESC";
            // LIMIT $limite,5
            $preparada = $this->pdo->prepare($query);

            // $preparada->bindParam(':lim',(int)$limite);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerPublicacionesFecha($fecha){
        try{

            $query = "SELECT username, categoria, texto, publicacion.id, publicacion.fechaCreacion  FROM publicacion LEFT JOIN usuario ON publicacion.id_usuario = usuario.id WHERE fechaCreacion like :fecha ORDER BY id DESC";
            
            
            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':fecha', $fecha);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerPublicacionesFechaCategoria($fecha, $categoria){
        try{

            $query = "SELECT username, categoria, texto, publicacion.id, publicacion.fechaCreacion  FROM publicacion LEFT JOIN usuario ON publicacion.id_usuario = usuario.id WHERE fechaCreacion like :fecha AND categoria LIKE :cat ORDER BY id DESC";
            
            
            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':fecha', $fecha);
            $preparada->bindParam(':cat', $categoria);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerNumPublicaciones(){
        $query = "SELECT COUNT(*) FROM `publicacion`";
        $preparada = $this->pdo->prepare($query);

        $preparada->execute();

        return $preparada->fetchColumn();
    }

    public function obtenerPublicacionesTexto($texto){
        try{

            $query = "SELECT username, categoria, texto, publicacion.id, publicacion.fechaCreacion  FROM publicacion LEFT JOIN usuario ON publicacion.id_usuario = usuario.id WHERE texto like :texto ORDER BY id DESC";
            
            
            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':texto', $texto);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
    }

    public function borrarPublicacion($id){
        try{
            $query = "DELETE FROM publicacion WHERE id = :id";

            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':id', $id);
            $preparada->execute();

        } catch(PDOException $e){
            return "Error: " . $e->getMessage();
        }
        
    }
}