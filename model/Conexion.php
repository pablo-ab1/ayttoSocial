<?php


class Conexion {
    private $host = 'localhost';        // Database host
    private $dbname = 'aytoSocial';  // Database name
    private $username = 'root';// Database username
    private $password = 'root';// Database password
    protected $pdo;

    public function __construct() {
        // Attempt to establish a PDO connection
        try {
            // Create a new PDO instance and store it in $pdo
            $this->pdo = new PDO("mysql:host=$this->host;dbname=$this->dbname", 
                                 $this->username, 
                                 $this->password);
            
            // Set PDO error mode to exception for error handling
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully to the database!";
        } catch (PDOException $e) {
            // If connection fails, catch the exception and display the error message
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
?>
