<?php

require_once 'Conexion.php';

class ConexionUsuario extends Conexion
{

    public function __construct()
    {
        parent::__construct();
    }

    public function insertarUsuario($username, $email, $password, $nombre, $apellidos, $fechaNac)
    {

        try {

            $query = "INSERT INTO usuario (username, email, password, nombre, apellidos, fechaNacimiento) VALUES (:username, :email, :password, :nombre, :apellidos, :fechaNac)";

            $preparada = $this->pdo->prepare($query);


            $preparada->bindParam(':username', $username);
            $preparada->bindParam(':email', $email);
            $preparada->bindParam(':password', $password);
            $preparada->bindParam(':fechaNac', $fechaNac);
            $preparada->bindParam(':nombre', $nombre);
            $preparada->bindParam(':apellidos', $apellidos);

            if ($preparada->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage($username, $email, $nombre, $apellidos, $fechaNac);
        }
    }

    public function actualizarUsuario($username, $email, $nombre, $apellidos, $fechaNac, $id)
    {
        if (isset($_FILES["fotoPerfil"]) && $_FILES["fotoPerfil"]["error"] === UPLOAD_ERR_OK) {
            $directorio = "../resources/imgUsuario/";
            $nombreArchivo = uniqid() . "_" . basename($_FILES["fotoPerfil"]["name"]);
            $ruta = $directorio . $nombreArchivo;

            if (move_uploaded_file($_FILES["fotoPerfil"]["tmp_name"], $ruta)) {
                try {
                    $rutaBD = '../' . $ruta;

                    $query = "UPDATE usuario 
                          SET username = :username, email = :email, nombre = :nombre, 
                              apellidos = :apellidos, fotoPerfil = :fotoPerfil, fechaNacimiento = :fechaNac 
                          WHERE id = :id";

                    $preparada = $this->pdo->prepare($query);
                    $preparada->bindParam(':username', $username);
                    $preparada->bindParam(':email', $email);
                    $preparada->bindParam(':fechaNac', $fechaNac);
                    $preparada->bindParam(':nombre', $nombre);
                    $preparada->bindParam(':apellidos', $apellidos);
                    $preparada->bindParam(':fotoPerfil', $rutaBD);
                    $preparada->bindParam(':id', $id);

                    return $preparada->execute();
                } catch (PDOException $e) {
                    error_log("Error al actualizar usuario con imagen: " . $e->getMessage());
                    return false;
                }
            } else {
                return "Error moviendo el archivo";
            }
        } else {
            try {
                $query = "UPDATE usuario 
                      SET username = :username, email = :email, nombre = :nombre, 
                          apellidos = :apellidos, fechaNacimiento = :fechaNac 
                      WHERE id = :id";

                $preparada = $this->pdo->prepare($query);
                $preparada->bindParam(':username', $username);
                $preparada->bindParam(':email', $email);
                $preparada->bindParam(':fechaNac', $fechaNac);
                $preparada->bindParam(':nombre', $nombre);
                $preparada->bindParam(':apellidos', $apellidos);
                $preparada->bindParam(':id', $id);

                return $preparada->execute();
            } catch (PDOException $e) {
                error_log("Error al actualizar usuario sin imagen: " . $e->getMessage());
                return false;
            }
        }
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

    public function getPassword($email)
    {
        try {
            $query = "SELECT password FROM usuario WHERE email = :email";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':email', $email);

            if ($preparada->execute()) {
                return $preparada->fetchAll(PDO::FETCH_COLUMN);
            } else {
                return "Peticion fallida";
            }
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function getDatosConEmail($email)
    {
        try {
            $query = "SELECT * FROM usuario WHERE email = :email";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':email', $email);

            if ($preparada->execute()) {
                return $preparada->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return "Peticion fallida";
            }
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function getDatosConId($id)
    {
        try {
            $query = "SELECT nombre, apellidos, email, username, fechaNacimiento, fotoPerfil FROM usuario WHERE id = :id";
            $preparada = $this->pdo->prepare($query);

            $preparada->bindParam(':id', $id);

            if ($preparada->execute()) {
                return $preparada->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return "Peticion fallida";
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
                return $preparada->fetch(PDO::FETCH_ASSOC)['id'];
            } else {
                echo "Insercion fallida";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
