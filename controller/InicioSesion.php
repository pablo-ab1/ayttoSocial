<?php
session_start();
if (isset($_POST['enviar'])) {
    require_once('../model/Conexion.php');
    require_once('../model/ConexionUsuario.php');

    $email = htmlspecialchars($_POST['email']);
    $contraseña = htmlspecialchars($_POST['pswd']);
    $recordar = ($_POST['recordar']);
    $nuevoUsuario = new ConexionUsuario();
        $passwd = $nuevoUsuario->getPassword($email);
        if($contraseña == $passwd){
            $_SESSION['usuarioActual'] = ($nuevoUsuario->getDatosConEmail($email)[0]['id']);
            switch($nuevoUsuario->getDatosConEmail($email)[0]['permisos']){
                case 1:
                    header('Location: ../vista/prueba.html');
                    break;
                case 2:
                    header('Location: ../vistaAyuntamiento/prueba.html');
                    break;
            }
            
            if($recordar){
                setcookie('usuarioActual',json_encode($_SESSION['usuarioActual']),time()+60*60, '/');
            }
        }else{
            header('Location: ../controller/inicioSesion.html');
        }
        
        
    
}