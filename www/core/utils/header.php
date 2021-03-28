<?php
/** core/utils/header.php
 * Page permettant de générer l'en-tête commune à toutes
 * les pages web.
 */
?>

<!doctype html>
<html lang="fr" <?php echo isset($params["htmlClass"]) ? "class=\"$params[htmlClass]\"" : ""; ?>>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Styles -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="/assets/css/prism-1.20.0/prism.min.css?v=<?php echo $context["version"]; ?>" />
    <link rel="stylesheet" href="/assets/css/lascarweb.css?v=<?php echo $context["version"]; ?>" />

    <!-- Métadonnées -->
    <meta name="language" content="FR" />
    <meta name="robots" content="index,follow" />
    <meta name="author" content="Brulebois Loïc, loic.brulebois@outlook.com" />
    

    <title><?php echo (isset($params["title"]) ? "$params[title] | " : ""). $context["title"]; ?></title>
</head>

<body <?php echo isset($params["bodyClass"]) ? "class=\"$params[bodyClass]\"" : ""; ?>>