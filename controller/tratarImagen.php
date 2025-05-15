<?php


if (isset($_FILES["imagenPublicacion"])) {
    $directorio = "../resources/images/";
    $pathTemporal = $_FILES["imagenPublicacion"]["tmp_name"];
    $nombreArchivo = basename($_FILES["imagenPublicacion"]["name"]);
    $ruta = $directorio . $nombreArchivo;


    if (move_uploaded_file($pathTemporal, $ruta)) {
        return "La imagen se ha subido correctamente: <a href='$ruta'>$nombreArchivo</a>";
    } else {
        return "Error moviendo el archivo";
    }
} else {
    return "No se ha subido ningun archivo o ha ocurrido un error";
}
