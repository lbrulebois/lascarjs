// On vérifie que la librairie JQuery est
// initialisée sans quoi on retourne une erreur !
if (typeof jQuery == "undefined")
    throw new Error("La librairie jQuery requise est absente.");

// On vérifie que la librairie Leaflet est
// initialisée sans quoi on retourne une erreur !
if (typeof L == "undefined")
    throw new Error("La librairie Leaflet requise est absente.");

// Import des fonctions du module "utils"
import * as utils from './utils/index';
// Import des éléments liés à la classe "Map"
import * as _map from './classes/map/index';
// Import des éléments liés au module "control"
import * as control from './classes/control/index';
// Import des éléments liés au module "layer"
import * as layer from './classes/layer/index';

// ----- Génération de la librairie -----
var oldLascar = window.Lascar || null;
var Lascar = {
    version: "0.3.0",
    noConflict: oldLascar,
    utils: utils,
    map: _map.map,
    Map: _map.Map,
    control: control,
    layer: layer
};
window.Lascar = Lascar;
