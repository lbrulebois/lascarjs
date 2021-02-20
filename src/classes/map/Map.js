import {checkId} from '../../utils/fonctions';
import { strIsNullOrEmpty } from '../../utils/String';

var baseOptions = L.Map.prototype.options;
export var Map = L.Map.extend({

    // On définit ici les options par défaut permettant
    // de générer la carte Lascar basée sur la carte Leaflet.
    options: jQuery.extend(baseOptions, {
        lascar: {
            // Identifiant du conteneur 
            id: "lmap", 
            options: {
                // On supprime la génération automatique de l'attribution
                attributionControl: false, 
                // On définit les propriétés du nouveau contrôle d'attributions
                _attribution: { 
                    prefix: "🗻 <a href=\"http://lascar.brulebois.fr\">lascarjs</a> basée sur 🍃 <a href=\"https://leafletjs.com\">Leaflet</a>"
                },
                // Niveau de zoom par défaut
                zoom: 6, 
                // On supprime la génération automatique du contrôle du zoom
                zoomControl: false,
                // On définit les propriétés du nouveau contrôle de zoom
                _zoom: {
                    position: "topright",
                    zoomInTitle: "Zoomer",
                    zoomOutTitle: "Dézoomer"
                },
                // On définit les propriétés du contrôle d'échelle
                _scale: {
                    position: "bottomright"
                },
                // Style de la carte
                style: { 
                    "width": "100%",
                    "height": "100%",
                    "position": "absolute",
                    "top": "0",
                    "left": "0"
                },
                // Centre de la carte
                center: new L.LatLng(46.53972, 2.43028), 
                // Informations sur les layers à utiliser 
                _dataLayers: [{
                    // Identifiant 
                    "id": "osm",
                    // Titre du layer
                    "title": "OpenStreetMap",
                    // Url du layer 
                    "url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    // Origine de la source des tuiles
                    "attribution": "Fond fourni par <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>",
                    // Zoom maxmimal
                    "maxZoom": 19,
                    // Zoom minimal
                    "minZoom": 0
                }, {
                    // Identifiant 
                    "id": "osm_fr",
                    // Titre du layer
                    "title": "OpenStreetMap (France)",
                    // Url du layer 
                    "url": "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
                    // Origine de la source des tuiles
                    "attribution": "Fond fourni par <a href=\"http://tile.openstreetmap.fr/\">OpenStreetMap France</a>",
                    // Zoom maxmimal
                    "maxZoom": 18,
                    // Zoom minimal
                    "minZoom": 0
                }]
            }
        }
    }),

    // Méthode permettant d'intialiser la carte
    // en fonction des arguments fournis :
    // - 0 : id et options par défaut
    // - 1 : id personnalisé et options par défaut 
    //       ou id par défaut et options personnalisées
    // - 2 : id et options personnalisés
    initialize: function () {
        var id = this.options.lascar.id,
            lascarOpts = this.options.lascar.options;
        
        // En fonction des arguments fournis, on vérifie 
        // les paramètres et on les exploite ...
        if(arguments.length == 1) {
            if(typeof(arguments[0]) == "string") {
                checkId("#{0}".format(arguments[0]));
                id = arguments[0];
            } else if(typeof(arguments[0]) == "object" && arguments[0] != null) {
                lascarOpts = jQuery.extend(lascarOpts, arguments[0]);
            }
        } else if(arguments.length == 2) {
            checkId("#{0}".format(arguments[0]));
            id = arguments[0];
            lascarOpts = jQuery.extend(lascarOpts, arguments[1]);
        }

        this.options.id = id;
        // On initialise la carte de base Leaflet ...
        L.Map.prototype.initialize.call(this, id, jQuery.extend(this.options, lascarOpts));
        
        // Avant de la personnaliser :
        // - On applique le style ...
        if(typeof(lascarOpts.style) == "object" && lascarOpts.style != null) 
            $("#{0}".format(id)).css(lascarOpts.style);
        // Si des layers sont définis, on génère le contrôle permettant
        // de naviguer rapidement de l'un à l'autre ...
        if(typeof(lascarOpts._dataLayers) == "object" && lascarOpts._dataLayers instanceof Array) {
            var layers = {}, _this = this; this.options._layers = [];
            // Pour chaque layer disponible dans les options ...
            jQuery.each(lascarOpts._dataLayers, function(i, dataLayer) {
                // On commence par générer le layer ...
                var layer = null;
                _this.options._layers.push(layer = L.tileLayer(dataLayer.url, dataLayer));
                layer.options._type = "base_layer";
                // et on les référence dans le contrôle ...
                layers[dataLayer.title] = layer;
            });
            // On génère le contrôle des layers ...
            (this.layersControl = L.control.layers(layers)).addTo(this);
            // et on ajoute le premier layer comme layer par défaut
            this.addLayer(layers[lascarOpts._dataLayers[0].title]);
        }
        // - On génère le contrôle d'attribution ...
        if(typeof(lascarOpts._attribution) == "object" && lascarOpts._attribution != null)
            L.control.attribution(lascarOpts._attribution).addTo(this);
        // - On génère le contrôle de zoom ...
        if(typeof(lascarOpts._zoom) == "object" && lascarOpts._zoom != null)
            L.control.zoom(lascarOpts._zoom).addTo(this);
        // - On génère le contrôle d'échelle
        if(typeof(lascarOpts._scale) == "object" && lascarOpts._scale != null)
            L.control.scale(lascarOpts._scale).addTo(this);
        // On invalide la taille pour forcer sa regénération ...
        // + d'infos : https://github.com/Asymmetrik/ngx-leaflet/issues/104
        this.invalidateSize();
    },

    // Méthode pemrettant d'appliquer des éléments de
    // configuration ou réappliquer la configuration par
    // défaut à la carte actuelle
    apply: function(data) {
        function changeLayer(layer) {
            // Si le layer n'est pas défini ou qu'il n'est pas du 
            // bon type, on arrête la procédure de mise à jour 
            // du fond de carte ici ...
            if(typeof(layer) != "object" && !(layer instanceof L.Layer)) return false;

            // On désactive les layers actuellement en place ...
            $.each(this._layers, function(id, layer) { if(layer.options._type == "base_layer") { _this.removeLayer(layer); } });
            // ... et on applique le layer ...
            this.addLayer(layer);
        };

        var _this = this;
        // Si le paramètre n'existe pas ou vaut null ou qu'il ne
        // contient aucun paramètre attendu alors on réapplique 
        // la configuration par défaut ...
        if(typeof(data) == "undefined" || data == null || 
            (typeof(data.zoom) != "number" && typeof(data.layer) != "string" && 
             typeof(data.lat) != "number" && typeof(data.lng) != "number")) {
            // On réinitialise la vue (zoom et centre) ...
            this.setView(this.options.center, this.options.zoom);
            // ... et on réapplique le premier layer ...
            changeLayer.call(this, this.options._layers[0]);
        }
        // Autrement, on prend en compte les informations fournies 
        // mais on les applique uniquement si la valeur diffère de celle
        // actuellement en place ...
        else {
            // Si un niveau de zoom est défini, on l'exploite ...
            if(typeof(data.zoom) == "number" && data.zoom != this.getZoom()) this.setZoom(data.zoom);
            // Si un nouveau point est défini, on l'exploite ...
            if(typeof(data.lat) == "number" && typeof(data.lng) == "number") this.setView(new L.LatLng(data.lat, data.lng));
            // Si un fond de carte est souhaité, on cherche s'il existe et
            // on l'applique sur la carte ...
            if(typeof(data.layer) == "string" && !strIsNullOrEmpty(data.layer)) {}
                changeLayer.call(this, $.grep(this.options._layers, function(l) { return l.options.id == data.layer; })[0]);
        }
    }

});

/* Lascar.map([id][,[options]]) 
 * méthode permettant de générer une carte rapidement.
 */
export function createMap() {
    if(arguments.length == 1) return new Map(arguments[0]);
    else if(arguments.length == 2) return new Map(arguments[0], arguments[1]);
    else return new Map();
}