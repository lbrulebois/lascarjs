<?php
/** core/includes.php
 * Page en charge de l'intégration automatique de 
 * la configuration du site et des composants/services
 * nécessaires à son bon fonctionnement.
 */

// Première étape, on charge la configuration, pour se 
// faire on commence par vérifier qu'elle existe ...
if(!file_exists(__DIR__ . "/app.config.json"))
    throw new Exception("La configuration de l'application n'existe pas.");
// Si celle-ci existe, on l'intègre pour une utilisation 
// ultérieure ...
$config = json_decode(file_get_contents(__DIR__ . "/app.config.json"), TRUE);

// On charge ensuite l'ensemble des librairies associées
$dirLibs = __DIR__ . "/libs/";
foreach(scandir($dirLibs) as $item) {
    $path = $dirLibs . $item;
    // S'il s'agît d'un fichier .PHP, on l'importe ...
    if(is_file($path) && strtolower(
        pathinfo($path, PATHINFO_EXTENSION)) == "php") require_once $path;
}

// Puis l'ensemble des services de l'application
$dirSrvs = __DIR__ . "/srv/";
foreach(scandir($dirSrvs) as $item) {
    $path = $dirSrvs . $item;
    // S'il s'agît d'un fichier .PHP, on l'importe ...
    if(is_file($path) && strtolower(
        pathinfo($path, PATHINFO_EXTENSION)) == "php") require_once $path;
}

// Puis l'ensemble des modules de l'application
$dirMods = __DIR__ . "/mods/";
foreach(scandir($dirMods) as $item) {
    $path = $dirMods . $item;
    // S'il s'agît d'un fichier .PHP, on l'importe ...
    if(is_file($path) && strtolower(
        pathinfo($path, PATHINFO_EXTENSION)) == "php") require_once $path;
}