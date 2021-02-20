import { Request } from '../control/Request';
import jQuery from 'jquery';
import L from 'leaflet';

export var Geojson = L.GeoJSON.extend({

    // Gestionnaire de requêtage des données
    // GeoJSON issues d'une source externe. 
    _request: new Request(),

    // Constructeur d'une nouvelle instance, permettant
    // ainsi de gérer les options de la classe.
    initialize: function (options) {
        this.options = jQuery.extend(this.options, {
            // Fonctions par défaut pour traiter les données
            // récupérées auprès du webservice ...
            funcs: {
                "success": function(event) { this.addData(event.data); },
                "fail": function(event) {
                    if(typeof(opts.fail) == "function") opts.fail(event);
                    else if(typeof(console) == "object" && console != null) console.log("[ERR] La requête n'a pas abouti.");
                }
            }
        }, options);
        this._layers = {};
    },

    // Méthode permettant de provoquer la génération de
    // la couche GeoJSON à partir d'une source de données 
    // externe (URL ou API).
    build: function(options) {
        // On commence par intégrer toutes les options pour
        // configurer ensuite la requête à envoyer ...
        var opts = this.options;
        if (typeof (options) == "object" && options != null) opts = jQuery.extend({}, this.options, options);

        // Puis on vérifie que les paramètres requis sont 
        // présents pour provoquer l'envoi ...
        if(typeof opts.url != "string")
            throw new Exception("La configuration ne permet pas de générer le layer.");
        
        var _this = this, pos = -1;
        // Si tout est conforme, on génère la requête pour
        // collecter les données et intégrer celles-ci dans
        // le layer. Pour ce faire, on supprime l'ancienne
        // référence de traitement des événements associés au requêteur ...
        if(this._request._events && "sending" in this._request._events && (pos = jQuery.inArray(this.options.funcs.sending, this._request._events["sending"])) != -1) 
            this._request._events["sending"].splice(pos, 1);
        if(this._request._events && "fail" in this._request._events && (pos = jQuery.inArray(this.options.funcs.fail, this._request._events["fail"])) != -1) 
            this._request._events["fail"].splice(pos, 1);
        if(this._request._events && "success" in this._request._events && (pos = jQuery.inArray(this.options.funcs.success, this._request._events["success"])) != -1) 
            this._request._events["success"].splice(pos, 1);
        // On regénère les fonctions associées pour récupérer 
        // les données potentielles et les exploiter ...
        this._request.on("success", this.options.funcs.success, this);
        this._request.on("fail", this.options.funcs.fail, this);
        this._request.send(opts);
        // Enfin on renvoie l'objet actuel pour qu'il puisse
        // être manipulé aisément ...
        return this;
    }

});

/* Lascar.layer.Geojson([options]) 
 * méthode permettant de générer un layer GeoJSON rapidement.
 */
export function createGeojson(options) {
    return new Geojson(options);
};