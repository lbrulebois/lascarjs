<?php
/** core/pages/error/404.php 
 * Page HTTP:NOT_FOUND
 * Page d'erreur permettant d'indiquer à l'utilisateur que
 * la page souhaitée n'existe pas ou plus.
 */

$params = array(
    "title" => "Page introuvable ...",
    "htmlClass" => "fullscreen",
    "bodyClass" => "flex"
);  

// On importe l'en-tête commune à toutes les pages ...
require_once "core/utils/header.php";
?>

<div class="container error">
    <span class="pic">&#128533;</span>
    <h1>Désolé</h1>
    <pre>HTTP/404 - Page introuvable</pre>
    <p>La page que vous souhaitez consulter n'existe pas ou plus.<br/>
    Veuillez réitérer ultérieurement votre demande.<br/>
    Si le problème persiste, signalez-nous l'anomalie en <a href="https://github.com/lbrulebois/lascarjs/issues">cliquant ici</a>.</p>
    <p><a href="/">&larr; Retourner à l'accueil</a></p>
</div>

<?php
// Enfin le pied de page ...
require_once "core/utils/footer.php";