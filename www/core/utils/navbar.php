<?php
/** core/utils/navbar.php
 * Page permettant de générer la barre de navigation
 * pour l'ensemble des pages.
 */
?>

<nav>
    <header>
        <h1><?php echo $context["title"]; ?></h1>
        <h2><?php echo $context["subtitle"]; ?></h2>
    </header>

    <ul>
<?php
// Pour chaque item du menu on le génère lui et ses
// potentiels sous-items ...
foreach($context["navs"] as $item) {
    $isActive = strpos($_GET["p"], $item["code"]) !== FALSE;
    echo "<li><a href=\"$item[href]\" class=\"".($isActive ? "active" : "")."\">$item[label]</a></li>";
}
?>
    </ul>

</nav>

<div class="root">
    <div>