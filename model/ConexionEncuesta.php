<?php

require_once 'Conexion.php';

class ConexionEncuesta extends Conexion
{

    public function __construct()
    {
        parent::__construct();
    }

    function getEncuestas()
    {
        try {

            $query = "SELECT * FROM encuesta ORDER BY fechaCreacion DESC ";
            $preparada = $this->pdo->prepare($query);
            $preparada->execute();

            return $preparada->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    function insertarEncuesta($categoria, $titulo, $id_usuario, $opcion1, $opcion2, $opcion3 = null, $opcion4 = null)
    {
        try {

            $query = "INSERT INTO encuesta (id_usuario, titulo, categoria, opcion1, opcion2, opcion3, opcion4) VALUES (:id_usuario, :titulo, :categoria, :opcion1, :opcion2, :opcion3, :opcion4)";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id_usuario', $id_usuario);
            $preparada->bindParam(':categoria', $categoria);
            $preparada->bindParam(':titulo', $titulo);
            $preparada->bindParam(':opcion1', $opcion1);
            $preparada->bindParam(':opcion2', $opcion2);
            $preparada->bindParam(':opcion3', $opcion3);
            $preparada->bindParam(':opcion4', $opcion4);

            if ($preparada->execute()) {
                return "Encuesta creada";
            } else {
                return "La encuesta no se ha podido crear";
            }
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    function aumentarVoto($id, $opcion)
    {
        try {
            switch ($opcion) {
                case 1:
                    $query = "UPDATE encuesta SET resultadoOpcion1 = resultadoOpcion1 + 1 WHERE id = :id";
                    break;
                case 2:
                    $query = "UPDATE encuesta SET resultadoOpcion2 = resultadoOpcion2 + 1 WHERE id = :id";
                    break;
                case 3:
                    $query = "UPDATE encuesta SET resultadoOpcion3 = resultadoOpcion3 + 1 WHERE id = :id";
                    break;
                case 4:
                    $query = "UPDATE encuesta SET resultadoOpcion4 = resultadoOpcion4 + 1 WHERE id = :id";
                    break;
            }

            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id', $id);

            if ($preparada->execute()) {
                return "Encuesta actualizada";
            } else {
                return "La encuesta no se ha podido actualizar";
            }
        } catch (PDOException $e) {
            return "Error " . $e->getMessage();
        }
    }
}
