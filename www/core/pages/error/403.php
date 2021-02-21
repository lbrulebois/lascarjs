<?php
/** core/pages/error/403.php 
 * Page HTTP:FORBIDDEN
 * Page d'erreur permettant d'indiquer à l'utilisateur que
 * ses accès ne lui permettent pas d'accéder à la page souhaitée.
 */

$params = array(
    "title" => "Accès refusé ...",
    "htmlClass" => "fullscreen",
    "bodyClass" => "flex"
);  

// On importe l'en-tête commune à toutes les pages ...
require_once "core/utils/header.php";
?>

<div class="container error">
    <span class="pic">&#129320;</span>
    <h1>Mmmmmm ...</h1>
    <pre>HTTP/403 - Accès refusé</pre>
    <p>Vous ne disposez pas ou plus des accès nécessaire pour cette page.<br/>
    Veuillez réitérer ultérieurement votre demande.<br/>
    Si le problème persiste, signalez-nous l'anomalie en <a href="https://github.com/lbrulebois/lascarjs/issues">cliquant ici</a>.</p>
    <p><a href="/">&larr; Retourner à l'accueil</a></p>
</div>

<?php
// Enfin le pied de page ...
require_once "core/utils/footer.php";