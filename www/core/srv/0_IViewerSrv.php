<?php
/** core/srv/IViewerSrv.php
 * Interface permettant de définir la structure de base
 * de l'ensemble des services en charge d'afficher une
 * page (quelle que soit son type).
 */

interface IViewerSrv {

    /** Méthode permettant de charger une page à partir
     * de son code via la visionneuse.
     */
    public function Load($code, $context = null);

}