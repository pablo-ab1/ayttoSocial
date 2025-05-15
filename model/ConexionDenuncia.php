<?php

require_once 'Conexion.php';

class ConexionDenuncia extends Conexion
{

    public function __construct()
    {
        parent::__construct();
    }

    public function insertarDenuncia($id_usuario, $categoria, $texto)
    {
        try {

            $query = "INSERT INTO denuncia (id_usuario, categoria, texto) VALUES (:id_usuario, :categoria, :texto)";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id_usuario', $id_usuario);
            $preparada->bindParam(':categoria', $categoria);
            $preparada->bindParam(':texto', $texto);

            if ($preparada->execute()) {
                return "Publicacion creada";
            } else {
                return "La publicacion no se ha podido crear";
            }
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function insertarDenunciaImagen($id_usuario, $categoria, $texto, $imagen)
    {
        $directorio = "../resources/imgPublicaciones/";
        $archivo = $directorio . basename($_FILES['img']['name']);

        // Optional: create the folder if it doesn't exist
        if (!file_exists($directorio)) {
            mkdir($directorio, 0777, true);
        }

        if (move_uploaded_file($_FILES['img']['tmp_name'], $archivo)) {
            echo "Image successfully uploaded to: " . $archivo;
        } else {
            echo "Error uploading the image.";
        }
    }

    public function obtenerDenuncias()
    {
        try {

            $query = "SELECT username, fotoPerfil, categoria, texto, denuncia.id, denuncia.fechaCreacion, votosFavor, votosContra  FROM denuncia LEFT JOIN usuario ON denuncia.id_usuario = usuario.id ORDER BY id DESC LIMIT 100";
            $preparada = $this->pdo->prepare($query);

            // $preparada->bindParam(':lim',(int)$limite);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerDenunciasFecha($fecha)
    {
        try {

            $query = "SELECT username, categoria, texto, denuncia.id, denuncia.fechaCreacion  FROM denuncia LEFT JOIN usuario ON denuncia.id_usuario = usuario.id WHERE fechaCreacion like :fecha ORDER BY id DESC";


            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':fecha', $fecha);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerDenunciasFechaCategoria($fecha, $categoria)
    {
        try {

            $query = "SELECT username, categoria, texto, denuncia.id, denuncia.fechaCreacion  FROM denuncia LEFT JOIN usuario ON denuncia.id_usuario = usuario.id WHERE fechaCreacion like :fecha AND categoria LIKE :cat ORDER BY id DESC";


            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':fecha', $fecha);
            $preparada->bindParam(':cat', $categoria);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function obtenerNumPublicaciones()
    {
        $query = "SELECT COUNT(*) FROM `publicacion`";
        $preparada = $this->pdo->prepare($query);

        $preparada->execute();

        return $preparada->fetchColumn();
    }

    public function obtenerDenunciasTexto($texto)
    {
        try {

            $query = "SELECT username, categoria, texto, denuncia.id, denuncia.fechaCreacion  FROM denuncia LEFT JOIN usuario ON denuncia.id_usuario = usuario.id WHERE texto like :texto ORDER BY id DESC";


            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':texto', $texto);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function borrarDenuncia($id)
    {
        try {
            $query = "DELETE FROM denuncia WHERE id = :id";

            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':id', $id);
            $preparada->execute();
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function sumarVoto($id)
    {
        try {
            $query = "UPDATE denuncia SET votosFavor = votosFavor + 1 WHERE id = :id";

            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':id', $id);
            $preparada->execute();
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function restarVoto($id)
    {
        try {
            $query = "UPDATE denuncia SET votosContra = votosContra + 1 WHERE id = :id";

            $preparada = $this->pdo->prepare($query);
            $preparada->bindParam(':id', $id);
            $preparada->execute();
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
