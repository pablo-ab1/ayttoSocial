<?php


class Conexion
{
    private $host = 'sql201.infinityfree.com';        // Database host
    private $dbname = 'if0_38928031_aytoSocial';  // Database name
    private $username = 'if0_38928031'; // Database username
    private $password = 'Ew0da7KzJYLSRr'; // Database password

    // private $host = 'localhost';        // Database host
    // private $dbname = 'aytoSocial';  // Database name
    // private $username = 'root';// Database username
    // private $password = 'root';// Database password

    protected $pdo;

    public function __construct()
    {
        // Attempt to establish a PDO connection
        try {
            // Create a new PDO instance and store it in $pdo
            $this->pdo = new PDO(
                "mysql:host=$this->host;dbname=$this->dbname",
                $this->username,
                $this->password
            );

            // Set PDO error mode to exception for error handling
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully to the database!";
        } catch (PDOException $e) {
            // If connection fails, catch the exception and display the error message
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
