<?php
/** core/srv/ErrorViewerSrv.php
 * Classe permettant de générer un service en charge
 * d'afficher les pages d'erreurs de l'application.
 */
class ErrorViewerSrv implements IViewerSrv {

    /** Code de la page "HTTP/404 : Not found" */
    const NOT_FOUND = "404";

    /** Code de la page "HTTP/403 : Forbidden" */
    const FORBIDDEN = "403";

    /** Constructeur permettant d'initialiser les paramètres
     * nécessaires et issus de la configuration.
     */
    public function __construct($config = null) {
        // Si une configuration est fournie, on intègre
        // les paramètres dans l'objet ...
        if(is_array($config)) {
            foreach($config as $key => $value) $this->{$key} = $value;
        }
    }

    /** Méthode permettant de référencer la visionneuse
     * des pages HTML.
     */
    public function setHtmlViewer($viewer) {
        // on référence le service en charge d'afficher 
        // les pages d'erreur ...
        $this->htmlViewer = $viewer;
    }

    /** Méthode permettant de charger une page à partir
     * de son code via la visionneuse. */
    public function Load($code, $context = null) {
        // Si le code de la page, on utilise le code de la page par défaut ...
        if($code == null || $code == "") throw new Exception("Aucune page n'a été trouvée");
        // On vérifie que le conteneur des pages gérées par
        // la visionneuse existe sans quoi on retourne une erreur ...
        if(!isset($this->container) || !file_exists($this->container)) 
            throw new Exception("Le conteneur de pages n'existe pas.");
        // On vérifie que la page existe sans quoi on retourne également 
        // une erreur ...
        $pagePath = $this->container . "$code.php";
        if(!file_exists($pagePath)) throw new Exception("La page d'erreur n'existe pas");
        // Si celle-ci existe, on la charge ...
        return $this->htmlViewer->Load("error/$code", $context);
    }

}

// On initialise le service en charge de l'affichage 
// des pages d'erreurs ...
if(!isset($srv)) $srv = array();
if(!array_key_exists("viewer", $srv)) $srv["viewer"] = array();
$srv["viewer"]["error"] = new ErrorViewerSrv($config["srv"]["viewer"]["error"]);
$srv["viewer"]["error"]->setHtmlViewer($srv["viewer"]["html"]);
$srv["viewer"]["html"]->setErrorViewer($srv["viewer"]["error"]);