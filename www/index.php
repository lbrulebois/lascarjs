<?php
/** lascarjs
 * Version : 0.3.0
 * Auteur  : loic.brulebois@outlook.com
 */

try {
    // On importe l'ensemble des prérequis du site ...
    require_once __DIR__ . "/core/includes.php";

    // On récupère le code de la page à afficher
    $page = $_GET["p"];
    // et à partir de ce code, on détermine l'afficheur
    // à partir de la potentielle extension ...
    if($page != null) $viewer = pathinfo($page, PATHINFO_EXTENSION);
    // On charge ensuite la page souhaitée ...
    $srv["viewer"]["html"]->Load($page, array_key_exists("context", $config) ? $config["context"] : null);
} 
// En cas d'erreur, on affiche une page expliquant la 
// nature du problème ...
catch(Exception $ex) {
    echo "<html><head><title>Erreur critique</title></head><body>
    <h1>Désolé ...</h1>
    <p>Un problème est survenu pendant le traitement de votre demande.<br/>
    Veuillez la réitérer plus tard ou nous signaler l'anomalie à cette adresse :</p>
    <p><a href=\"https://github.com/lbrulebois/lascarjs/issues\">GitHub - lbrulebois/lascarjs : Issues</a></p>
    <hr/>
    <pre>HTTP/500 - " . $ex->getMessage() . "</pre>
    </body></html>";
}