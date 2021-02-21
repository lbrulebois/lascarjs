<?php
/** core/utils/footer_nav.php
 * Page permettant de générer le pied de page commun à toutes
 * les pages web utilisant la barre de navigation.
 */
?>
    </div>
<?php
// S'il faut générer le pied de page, on le génère ...
if($params["buildFooter"]) {
    echo "<footer>
        <p>Construite par <a href=\"https://twitter.com/lbrulebois\">@lbrulebois</a> &bull; <a href=\"https://github.com/lbrulebois/lascarjs\">Github</a></p>
        <p>Toutes les ressources liées à cette librairie sont distribuées sous licence CeCILL-2.1 - <a href=\"https://cecill.info/licences/Licence_CeCILL_V2.1-fr.html\">🇫🇷</a> / <a href=\"https://cecill.info/licences/Licence_CeCILL_V2.1-en.html\">🇬🇧</a><br/>
            &#128076; Remerciements à <a href=\"https://parsedown.org/\">Parsedown</a> et <a href=\"https://prismjs.com/\">Prism.js</a> pour leurs librairies</p>
    </footer>";
}
?>
</div>