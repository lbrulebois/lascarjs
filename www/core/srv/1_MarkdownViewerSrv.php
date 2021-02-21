<?php
/** core/srv/MarkdownViewerSrv.php
 * Classe permettant de générer un service en charge
 * d'afficher des pages Markdown.
 */
class MarkdownViewerSrv implements IViewerSrv {

    /** Service en charge du parsage des données Markdown */
    protected $parsedownSrv;

    /** Constructeur permettant d'initialiser les paramètres
     * nécessaires et issus de la configuration.
     */
    public function __construct($config = null) {
        // Si une configuration est fournie, on intègre
        // les paramètres dans l'objet ...
        if(is_array($config)) {
            foreach($config as $key => $value) $this->{$key} = $value;
        }
        // On initialise également le service Markdown ...
        $this->parsedownSrv = new ParsedownExtra();
    }

    /** Méthode permettant de référencer la visionneuse
     * des pages d'erreur.
     */
    public function setErrorViewer($viewer) {
        // on référence le service en charge d'afficher 
        // les pages d'erreur ...
        $this->errorViewer = $viewer;
    }

    /** Méthode permettant de charger une page à partir
     * de son code via la visionneuse. */
    public function Load($code, $context = null) {
        // Si le code de la page, on utilise le code de la page par défaut ...
        if($code == null || $code == "") $code = $this->defaultPage;
        // On vérifie que le conteneur des pages gérées par
        // la visionneuse existe sans quoi on retourne une erreur ...
        if(!isset($this->container) || !file_exists($this->container)) 
            throw new Exception("Le conteneur de pages n'existe pas.");
        // On vérifie que la page souhaitée existe sans quoi on
        // affiche la page d'erreur NOT_FOUND ...
        $pagePath = $this->container . "$code";
        if(!file_exists($pagePath)) return $this->errorViewer->Load(ErrorViewerSrv::NOT_FOUND, $context);
        // On charge les utilitaires des en-têtes ...
        $params = array(
            "bodyClass" => "flex",
            "buildFooter" => true
        );
        foreach($this->headers as $header) require_once "core/utils/$header.php";
        // On parse le contenu et on l'affiche ...
        echo $this->parsedownSrv->text(file_get_contents($pagePath));
        // On charge les utilitaires de pied de page ...
        foreach($this->footers as $footer) require_once "core/utils/$footer.php";
    }

}

// On initialise le service en charge de l'affichage 
// des pages web par défaut ...
if(!isset($srv)) $srv = array();
if(!array_key_exists("viewer", $srv)) $srv["viewer"] = array();
$srv["viewer"]["md"] = new MarkdownViewerSrv($config["srv"]["viewer"]["md"]);