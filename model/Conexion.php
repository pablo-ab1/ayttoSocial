<?php


class Conexion
{
    // private $host = 'sql201.infinityfree.com';        // Database host
    // private $dbname = 'if0_38928031_aytoSocial';  // Database name
    // private $username = 'if0_38928031'; // Database username
    // private $password = 'Ew0da7KzJYLSRr'; // Database password

    private $host = 'localhost';        // Database host
    private $dbname = 'aytoSocial';  // Database name
    private $username = 'root';// Database username
    private $password = 'root';// Database password

    protected $pdo;

    public function __construct()
    {
        try {
            $this->pdo = new PDO(
                "mysql:host=$this->host;dbname=$this->dbname",
                $this->username,
                $this->password
            );

            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
