import { strIsNullOrEmpty } from "../../utils/String";

export var UrlHash = L.Class.extend({

    // On définit ici les options par défaut permettant
    // de générer le composant. 
    options: {
        // Tableau des méthodes à appliquer lors d'un changement
        // détecté sur la partie hash de l'URL ...
        onhashchange: Array(),

        // Liste des cartes associées au composant ...
        maps: Array()
    },

    // Méthode permettant d'initialiser le composant.
    initialize: function () {
        var _this = this;
        // On affecte une méthode permettant d'exécuter les
        // fonctions contenues dans le composant dès lors 
        // qu'un changement est détecté ...
        window.onhashchange = function (event) {
            // On commence par parser les données pour mieux
            // les transmettres aux fonctions associées ...
            var data = _this.unserialize();
            // pour chaque fonction disponible, on lui transmet
            // les informations ...
            jQuery.each(_this.options.onhashchange, function (i, func) {
                func.call(_this, { oldUrl: event.oldURL, newUrl: event.newURL, data: data });
            });
        };
    },

    // Méthode permettant d'intégrer les paramètres
    // des cartes 
    serialize: function() {
        var hashData = [];
        jQuery.each(this.options.maps, function(i, map) {
            hashData.push(
                "{0}={1}/{2}/{3},layer={4}".format(
                    map.options.id,
                    map.getZoom(),
                    map.getCenter().lat,
                    map.getCenter().lng,
                    jQuery.map(map._layers, function(l,i) { if(l.options._type == "base_layer") { return l; } })[0].options.id)
            );
        });
        window.location.hash = hashData.join("&");
    },

    // Méthode permettant de parser une chaîne de caractères 
    // conctenant des informations cartographiques ...
    unserialize: function () {
        var str = window.location.hash.substr(1);
        // Si la chaîne de caractères est vide ou null,
        // on ne va pas plus loin dans le traitement ...
        if (strIsNullOrEmpty(str)) return {};
        
        var data = {};
        // Pour chaque élément de données dans l'URL, on
        // le traite de manière à en extraire la configuration
        // des éléments gérés par ce composant.
        jQuery.each(str.split("&"), function (i, d) {
            // Si la donnée est de la forme (id)=(...) 
            // on peut envisager de la traiter, ...
            if (d.match(/([a-zA-Z0-9_-]+)=(.*)/)) {
                // Pour traiter correctement la donnée
                // associée à la clé, il nous faut identifier
                // s'il s'agît de données cartographiques ou
                // de marqueurs.
                var sepPosition = d.indexOf("="),
                    dataKey = d.substr(0, sepPosition),
                    dataValue = d.substr(++sepPosition),
                    dataValueMap = undefined;
                // S'il s'agît de données cartographiques on
                // les traite en tant que tel !
                if ((dataValueMap = dataValue.match(/(-?[0-9]*\.?[0-9]*)\/(-?[0-9]*\.?[0-9]*)\/(-?[0-9]*\.?[0-9]*),layer=(.+)/))) {
                    data[dataKey] = {
                        zoom: parseInt(dataValueMap[1]),
                        lng: parseFloat(dataValueMap[3]),
                        lat: parseFloat(dataValueMap[2]),
                        layer: dataValueMap[4]
                    };
                }
            }
            // sinon on part du principe que la valeur 
            // associée vaut 'null' ...
            else {
                data[d] = null;
            }
        });

        return data;
    },

    // Méthode permettant d'ajouter une carte au gestionnaire 
    // des hashs dans l'URL afin d'encoder et décoder rapidement
    // les informations associées.
    addTo: function (map) {
        // Si la carte dispose déjà du composant, on 
        // retourne celui qui est déjà existant ...
        if (map.urlControl instanceof UrlHash) {
            return map.urlControl;
        }

        this.options.maps.push(map);
        // Autrement, on génère les fonctions nécessaires
        // à la bonne transmission et exploitation des informations ...
        this.options.onhashchange.push(map._onhashchange = function (args) {
            // Si l'URL contient des propriétés pour la carte
            // actuelle, on les applique ...
            if(typeof(args.data[map.options.id]) != "undefined") {
                map.apply(args.data[map.options.id]);
            } 
        });
        map.on("moveend baselayerchange", function (event) {
            this.serialize();
        }, this);
    }

});

/* Lascar.control.UrlHash() 
 * méthode permettant de générer un gestionnaire de hashs rapidement.
 */
export function createUrlHash() {
    return new UrlHash();
}