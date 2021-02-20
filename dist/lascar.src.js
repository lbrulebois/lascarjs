(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
"use strict";

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

var _leaflet = _interopRequireDefault((typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null));

var utils = _interopRequireWildcard(require("./utils/index"));

var _map = _interopRequireWildcard(require("./classes/map/index"));

var control = _interopRequireWildcard(require("./classes/control/index"));

var layer = _interopRequireWildcard(require("./classes/layer/index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// On vérifie que la librairie JQuery est
// initialisée sans quoi on retourne une erreur !
if (typeof _jquery.default == "undefined") throw new Error("La librairie jQuery requise est absente."); // On vérifie que la librairie Leaflet est
// initialisée sans quoi on retourne une erreur !

if (typeof _leaflet.default == "undefined") throw new Error("La librairie Leaflet requise est absente."); // Import des fonctions du module "utils"

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

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./classes/control/index":5,"./classes/layer/index":7,"./classes/map/index":9,"./utils/index":12}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNotifier = createNotifier;
exports.Notifier = void 0;

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

var _leaflet = _interopRequireDefault((typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseOptions = _leaflet.default.Control.prototype.options;

var Notifier = _leaflet.default.Control.extend({
  // On définit ici les options par défaut permettant
  // de générer le contrôle.
  options: _jquery.default.extend(baseOptions, {
    position: "topleft",
    // Position du composant
    maxMessages: 5,
    // Nombre maximum de messages à afficher
    defaultMsg: {
      message: "Un événement est survenu ...",
      // Message par défaut
      showIcon: true,
      // Booléen permettant d'afficher l'icône
      icon: (0, _jquery.default)("<span>", {
        // Icône à intégrer par défaut
        class: "alert",
        html: " ! ",
        css: {
          "color": "red",
          "font-weight": "bold"
        }
      })[0]
    }
  }),
  // Méthode permettant d'ajouter le composant à la
  // carte fournie en paramètre
  onAdd: function (map) {
    // Si la carte dispose déjà du composant, on 
    // réinitialise le contenu et on retourne celui
    // qui est déjà existant ...
    if (map.notifierControl instanceof Notifier) {
      map.notifierControl.hide();
      return map.notifierControl;
    }

    var _this = this,
        // Autrement, on génère le composant et on l'attache 
    // à la carte ...
    $container = (0, _jquery.default)("<div>", {
      class: "leaflet-control lascar-notifier"
    }); // on ajoute le bouton permettant de masquer le
    // composant lorsque l'utilisateur le souhaite ...


    (0, _jquery.default)("<a>", {
      href: "#",
      html: "&times;",
      class: "lascar-notifier-close",
      title: "Fermer"
    }) // La fermeture du composant provoque son masquage et la 
    // purge des messages en place actuellement ...
    .click(function (event) {
      _this.hide();

      event.preventDefault();
    }).appendTo($container);
    $container.hide(); // On masque le conteneur par défaut 
    // avant de le retourner ...

    return this._container = $container[0];
  },
  // Méthode permettant d'afficher le composant
  // et intégrer un nouveau message ...
  show: function (data) {
    function integrateMessage(message) {
      var $container = (0, _jquery.default)(this._container);
      $container.parent().addClass("lascar-notifier-container"); // S'il y a plus de messages que permis, on supprime
      // le plus ancien pour permettre l'intégration du
      // nouveau message de notification.

      if ($container.find(".message").length >= this.options.maxMessages) {
        while ($container.find(".message").length >= this.options.maxMessages) {
          $container.find(".message").first().remove();
        }
      } // Pour tous les messages actuellement en place, on stop
      // l'animation de l'icône actuelle


      $container.find(".message .notifier-icon").children().addClass("no-anim"); // On peut dorénavant intégrer le nouveau message

      var $ctMessage = $("<div>", {
        class: "message"
      });
      (0, _jquery.default)("<span>", {
        class: "notifier-icon",
        html: (0, _jquery.default)(message.icon).clone()
      }).appendTo($ctMessage);
      (0, _jquery.default)("<span>", {
        class: "notifier-msg",
        html: message.message
      }).appendTo($ctMessage);
      $ctMessage.appendTo($container);
    }

    ; // Si le paramètre est une chaîne de caractères, il
    // s'agît d'un message à intégrer ...

    if (typeof data == "string") {
      integrateMessage.call(this, _jquery.default.extend({}, this.options.defaultMsg, {
        message: data
      }));
    } // Et si les informations sont un objet, il s'agît d'un
    // message personnalisé à intégrer ...
    else if (typeof data == "object" && data != null && typeof data.message == "string") {
        integrateMessage.call(this, _jquery.default.extend({}, this.options.defaultMsg, data));
      } // S'il n'y a aucune donnée de définie, on intègre
      // le message par défaut ...
      else {
          integrateMessage.call(this, this.options.defaultMsg);
        } // On affiche le composant ...


    (0, _jquery.default)(this._container).show();
    return this;
  },
  // Méthode permettant de masquer le composant
  // et purger les messages par la même occasion ...
  hide: function () {
    var $container = (0, _jquery.default)(this._container);
    $container.parent().removeClass("lascar-notifier-container");
    $container.children(".message").remove();
    $container.hide();
    return this;
  }
});
/* Lascar.control.Notifier([options]) 
 * méthode permettant de générer un notifier rapidement.
 */


exports.Notifier = Notifier;

function createNotifier(options) {
  return new Notifier(options);
}

;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRequest = createRequest;
exports.Request = void 0;

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

var _leaflet = _interopRequireDefault((typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = _leaflet.default.Evented.extend({
  // On définit ici les options par défaut permettant
  // de générer la classe.
  options: {
    // Communication asynchrone avec le web service.
    async: true,
    // Non mise-en-cache des données reçues.
    cache: false,
    // Refuser le requêtage inter-domaines.
    crossDomain: false,
    // Contenu de type JSON.
    contentType: "application/json",
    // Parsage de la réponse au format JSON.
    dataType: "json",
    // En-têtes à ajouter à la requête.
    headers: {}
  },
  // Constructeur d'une nouvelle instance, permettant
  // ainsi de gérer les options de la classe.
  initialize: function (options) {
    this.options = _jquery.default.extend(this.options, options);
  },
  // Méthode permettant de provoquer l'envoi de la requête
  // et de prendre en compte de nouveaux paramètres si
  // nécessaire.
  send: function (options) {
    // On commence par intégrer toutes les options pour
    // configurer la requête à envoyer ...
    var opts = this.options;
    if (typeof options == "object" && options != null) opts = _jquery.default.extend({}, this.options, options); // Puis on vérifie que les paramètres requis sont 
    // présents pour provoquer l'envoi ...

    if (typeof opts.url != "string" || typeof opts.type != "string") throw new Exception("La configuration ne permet pas d'envoyer la requête."); // S'il y a des en-têtes à intégrer à la requête, on
    // génère la fonction permettant de les intégrer ...

    if (typeof opts.headers == "object" && opts.headers != null) {
      opts.beforeSend = function (xhr) {
        _jquery.default.map(opts.headers, function (value, key) {
          xhr.setRequestHeader(key, value);
        });
      };
    } // On averti les observateurs que l'on vient
    // d'envoyer la requête.


    this.fire("sending");

    var _this = this,
        result = null; // On peut enfin emmettre la requête !


    _jquery.default.ajax(opts).done(function (data, status, jqXHR) {
      _this.fire("success", result = {
        "data": data,
        "status": status,
        "jqXHR": jqXHR
      });
    }).fail(function (jqXHR, status, error) {
      _this.fire("fail", result = {
        "error": error,
        "status": status,
        "jqXHR": jqXHR
      });
    }); // S'il s'agît d'un appel synchrone, on retourne
    // la réponse du web service directement ...


    if (!(typeof opts.async == "boolean" ? opts.async : true)) {
      return result;
    }
  }
});
/* Lascar.control.Request([options]) 
 * méthode permettant de générer une requête rapidement.
 */


exports.Request = Request;

function createRequest(options) {
  return new Request(options);
}

;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrlHash = createUrlHash;
exports.UrlHash = void 0;

var _String = require("../../utils/String");

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

var _leaflet = _interopRequireDefault((typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UrlHash = _leaflet.default.Class.extend({
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
    var _this = this; // On affecte une méthode permettant d'exécuter les
    // fonctions contenues dans le composant dès lors 
    // qu'un changement est détecté ...


    window.onhashchange = function (event) {
      // On commence par parser les données pour mieux
      // les transmettres aux fonctions associées ...
      var data = _this.unserialize(); // pour chaque fonction disponible, on lui transmet
      // les informations ...


      _jquery.default.each(_this.options.onhashchange, function (i, func) {
        func.call(_this, {
          oldUrl: event.oldURL,
          newUrl: event.newURL,
          data: data
        });
      });
    };
  },
  // Méthode permettant d'intégrer les paramètres
  // des cartes 
  serialize: function () {
    var hashData = [];

    _jquery.default.each(this.options.maps, function (i, map) {
      hashData.push("{0}={1}/{2}/{3},layer={4}".format(map.options.id, map.getZoom(), map.getCenter().lat, map.getCenter().lng, _jquery.default.map(map._layers, function (l, i) {
        if (l.options._type == "base_layer") {
          return l;
        }
      })[0].options.id));
    });

    window.location.hash = hashData.join("&");
  },
  // Méthode permettant de parser une chaîne de caractères 
  // conctenant des informations cartographiques ...
  unserialize: function () {
    var str = window.location.hash.substr(1); // Si la chaîne de caractères est vide ou null,
    // on ne va pas plus loin dans le traitement ...

    if ((0, _String.strIsNullOrEmpty)(str)) return {};
    var data = {}; // Pour chaque élément de données dans l'URL, on
    // le traite de manière à en extraire la configuration
    // des éléments gérés par ce composant.

    _jquery.default.each(str.split("&"), function (i, d) {
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
            dataValueMap = undefined; // S'il s'agît de données cartographiques on
        // les traite en tant que tel !

        if (dataValueMap = dataValue.match(/(-?[0-9]*\.?[0-9]*)\/(-?[0-9]*\.?[0-9]*)\/(-?[0-9]*\.?[0-9]*),layer=(.+)/)) {
          data[dataKey] = {
            zoom: parseInt(dataValueMap[1]),
            lng: parseFloat(dataValueMap[3]),
            lat: parseFloat(dataValueMap[2]),
            layer: dataValueMap[4]
          };
        }
      } // sinon on part du principe que la valeur 
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

    this.options.maps.push(map); // Autrement, on génère les fonctions nécessaires
    // à la bonne transmission et exploitation des informations ...

    this.options.onhashchange.push(map._onhashchange = function (args) {
      // Si l'URL contient des propriétés pour la carte
      // actuelle, on les applique ...
      if (typeof args.data[map.options.id] != "undefined") {
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


exports.UrlHash = UrlHash;

function createUrlHash() {
  return new UrlHash();
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils/String":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Notifier", {
  enumerable: true,
  get: function () {
    return _Notifier.Notifier;
  }
});
Object.defineProperty(exports, "notifier", {
  enumerable: true,
  get: function () {
    return _Notifier.createNotifier;
  }
});
Object.defineProperty(exports, "UrlHash", {
  enumerable: true,
  get: function () {
    return _UrlHash.UrlHash;
  }
});
Object.defineProperty(exports, "urlHash", {
  enumerable: true,
  get: function () {
    return _UrlHash.createUrlHash;
  }
});
Object.defineProperty(exports, "Request", {
  enumerable: true,
  get: function () {
    return _Request.Request;
  }
});
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function () {
    return _Request.createRequest;
  }
});

var _Notifier = require("./Notifier");

var _UrlHash = require("./UrlHash");

var _Request = require("./Request");

},{"./Notifier":2,"./Request":3,"./UrlHash":4}],6:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGeojson = createGeojson;
exports.Geojson = void 0;

var _Request = require("../control/Request");

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

var _leaflet = _interopRequireDefault((typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Geojson = _leaflet.default.GeoJSON.extend({
  // Gestionnaire de requêtage des données
  // GeoJSON issues d'une source externe. 
  _request: new _Request.Request(),
  // Constructeur d'une nouvelle instance, permettant
  // ainsi de gérer les options de la classe.
  initialize: function (options) {
    this.options = _jquery.default.extend(this.options, {
      // Fonctions par défaut pour traiter les données
      // récupérées auprès du webservice ...
      funcs: {
        "success": function (event) {
          this.addData(event.data);
        },
        "fail": function (event) {
          if (typeof opts.fail == "function") opts.fail(event);else if (typeof console == "object" && console != null) console.log("[ERR] La requête n'a pas abouti.");
        }
      }
    }, options);
    this._layers = {};
  },
  // Méthode permettant de provoquer la génération de
  // la couche GeoJSON à partir d'une source de données 
  // externe (URL ou API).
  build: function (options) {
    // On commence par intégrer toutes les options pour
    // configurer ensuite la requête à envoyer ...
    var opts = this.options;
    if (typeof options == "object" && options != null) opts = _jquery.default.extend({}, this.options, options); // Puis on vérifie que les paramètres requis sont 
    // présents pour provoquer l'envoi ...

    if (typeof opts.url != "string") throw new Exception("La configuration ne permet pas de générer le layer.");

    var _this = this,
        pos = -1; // Si tout est conforme, on génère la requête pour
    // collecter les données et intégrer celles-ci dans
    // le layer. Pour ce faire, on supprime l'ancienne
    // référence de traitement des événements associés au requêteur ...


    if (this._request._events && "sending" in this._request._events && (pos = _jquery.default.inArray(this.options.funcs.sending, this._request._events["sending"])) != -1) this._request._events["sending"].splice(pos, 1);
    if (this._request._events && "fail" in this._request._events && (pos = _jquery.default.inArray(this.options.funcs.fail, this._request._events["fail"])) != -1) this._request._events["fail"].splice(pos, 1);
    if (this._request._events && "success" in this._request._events && (pos = _jquery.default.inArray(this.options.funcs.success, this._request._events["success"])) != -1) this._request._events["success"].splice(pos, 1); // On regénère les fonctions associées pour récupérer 
    // les données potentielles et les exploiter ...

    this._request.on("success", this.options.funcs.success, this);

    this._request.on("fail", this.options.funcs.fail, this);

    this._request.send(opts); // Enfin on renvoie l'objet actuel pour qu'il puisse
    // être manipulé aisément ...


    return this;
  }
});
/* Lascar.layer.Geojson([options]) 
 * méthode permettant de générer un layer GeoJSON rapidement.
 */


exports.Geojson = Geojson;

function createGeojson(options) {
  return new Geojson(options);
}

;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../control/Request":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Geojson", {
  enumerable: true,
  get: function () {
    return _Geojson.Geojson;
  }
});
Object.defineProperty(exports, "geojson", {
  enumerable: true,
  get: function () {
    return _Geojson.createGeojson;
  }
});

var _Geojson = require("./Geojson");

},{"./Geojson":6}],8:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMap = createMap;
exports.Map = void 0;

var _fonctions = require("../../utils/fonctions");

var _String = require("../../utils/String");

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

var _leaflet = _interopRequireDefault((typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseOptions = _leaflet.default.Map.prototype.options;

var Map = _leaflet.default.Map.extend({
  // On définit ici les options par défaut permettant
  // de générer la carte Lascar basée sur la carte Leaflet.
  options: _jquery.default.extend(baseOptions, {
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
        center: new _leaflet.default.LatLng(46.53972, 2.43028),
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
        lascarOpts = this.options.lascar.options; // En fonction des arguments fournis, on vérifie 
    // les paramètres et on les exploite ...

    if (arguments.length == 1) {
      if (typeof arguments[0] == "string") {
        (0, _fonctions.checkId)("#{0}".format(arguments[0]));
        id = arguments[0];
      } else if (typeof arguments[0] == "object" && arguments[0] != null) {
        lascarOpts = _jquery.default.extend(lascarOpts, arguments[0]);
      }
    } else if (arguments.length == 2) {
      (0, _fonctions.checkId)("#{0}".format(arguments[0]));
      id = arguments[0];
      lascarOpts = _jquery.default.extend(lascarOpts, arguments[1]);
    }

    this.options.id = id; // On initialise la carte de base Leaflet ...

    _leaflet.default.Map.prototype.initialize.call(this, id, _jquery.default.extend(this.options, lascarOpts)); // Avant de la personnaliser :
    // - On applique le style ...


    if (typeof lascarOpts.style == "object" && lascarOpts.style != null) (0, _jquery.default)("#{0}".format(id)).css(lascarOpts.style); // Si des layers sont définis, on génère le contrôle permettant
    // de naviguer rapidement de l'un à l'autre ...

    if (typeof lascarOpts._dataLayers == "object" && lascarOpts._dataLayers instanceof Array) {
      var layers = {},
          _this = this;

      this.options._layers = []; // Pour chaque layer disponible dans les options ...

      _jquery.default.each(lascarOpts._dataLayers, function (i, dataLayer) {
        // On commence par générer le layer ...
        var layer = null;

        _this.options._layers.push(layer = _leaflet.default.tileLayer(dataLayer.url, dataLayer));

        layer.options._type = "base_layer"; // et on les référence dans le contrôle ...

        layers[dataLayer.title] = layer;
      }); // On génère le contrôle des layers ...


      (this.layersControl = _leaflet.default.control.layers(layers)).addTo(this); // et on ajoute le premier layer comme layer par défaut


      this.addLayer(layers[lascarOpts._dataLayers[0].title]);
    } // - On génère le contrôle d'attribution ...


    if (typeof lascarOpts._attribution == "object" && lascarOpts._attribution != null) _leaflet.default.control.attribution(lascarOpts._attribution).addTo(this); // - On génère le contrôle de zoom ...

    if (typeof lascarOpts._zoom == "object" && lascarOpts._zoom != null) _leaflet.default.control.zoom(lascarOpts._zoom).addTo(this); // - On génère le contrôle d'échelle

    if (typeof lascarOpts._scale == "object" && lascarOpts._scale != null) _leaflet.default.control.scale(lascarOpts._scale).addTo(this); // On invalide la taille pour forcer sa regénération ...
    // + d'infos : https://github.com/Asymmetrik/ngx-leaflet/issues/104

    this.invalidateSize();
  },
  // Méthode pemrettant d'appliquer des éléments de
  // configuration ou réappliquer la configuration par
  // défaut à la carte actuelle
  apply: function (data) {
    function changeLayer(layer) {
      // Si le layer n'est pas défini ou qu'il n'est pas du 
      // bon type, on arrête la procédure de mise à jour 
      // du fond de carte ici ...
      if (typeof layer != "object" && !(layer instanceof _leaflet.default.Layer)) return false; // On désactive les layers actuellement en place ...

      _jquery.default.each(this._layers, function (id, layer) {
        if (layer.options._type == "base_layer") {
          _this.removeLayer(layer);
        }
      }); // ... et on applique le layer ...


      this.addLayer(layer);
    }

    ;

    var _this = this; // Si le paramètre n'existe pas ou vaut null ou qu'il ne
    // contient aucun paramètre attendu alors on réapplique 
    // la configuration par défaut ...


    if (typeof data == "undefined" || data == null || typeof data.zoom != "number" && typeof data.layer != "string" && typeof data.lat != "number" && typeof data.lng != "number") {
      // On réinitialise la vue (zoom et centre) ...
      this.setView(this.options.center, this.options.zoom); // ... et on réapplique le premier layer ...

      changeLayer.call(this, this.options._layers[0]);
    } // Autrement, on prend en compte les informations fournies 
    // mais on les applique uniquement si la valeur diffère de celle
    // actuellement en place ...
    else {
        // Si un niveau de zoom est défini, on l'exploite ...
        if (typeof data.zoom == "number" && data.zoom != this.getZoom()) this.setZoom(data.zoom); // Si un nouveau point est défini, on l'exploite ...

        if (typeof data.lat == "number" && typeof data.lng == "number") this.setView(new _leaflet.default.LatLng(data.lat, data.lng)); // Si un fond de carte est souhaité, on cherche s'il existe et
        // on l'applique sur la carte ...

        if (typeof data.layer == "string" && !(0, _String.strIsNullOrEmpty)(data.layer)) {}

        changeLayer.call(this, _jquery.default.grep(this.options._layers, function (l) {
          return l.options.id == data.layer;
        })[0]);
      }
  }
});
/* Lascar.map([id][,[options]]) 
 * méthode permettant de générer une carte rapidement.
 */


exports.Map = Map;

function createMap() {
  if (arguments.length == 1) return new Map(arguments[0]);else if (arguments.length == 2) return new Map(arguments[0], arguments[1]);else return new Map();
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils/String":10,"../../utils/fonctions":11}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function () {
    return _Map.Map;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _Map.createMap;
  }
});

var _Map = require("./Map");

},{"./Map":8}],10:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strIsNullOrEmpty = exports.strFormat = void 0;

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Méthode permettant d'intégrer des valeurs dans une 
 * chaîne de caractères à l'aide de son indice dans le 
 * tableau des arguments.
 */
var strFormat = function (str) {
  // On vérifie que le premier argument est bien
  // une chaîne de caractères.
  if (typeof str !== "string" || str == null) throw new Error("Aucune chaîne valide n'a été identifiée."); // On commence par récupérer les potentiels
  // arguments permettant de replacer les balises
  // {x} (avec x un nombre entier > à 0) par
  // l'argument approprié.

  var args = function (args) {
    var _args = new Array();

    _jquery.default.each(args, function (i, arg) {
      if (i > 0) _args.push(arg);
    });

    return _args;
  }(arguments); // On peut enfin remplacer les balises dans
  // la chaîne de caractères fournie ...


  return str.replace(/{(\d+)}/g, function (match, value) {
    // Si aucun argument n'existe pour cet indice, on
    // retourne une erreur !
    if (value >= args.length) throw new Error("Aucune valeur n'existe pour l'indice n°".concat(value).concat(".")); // Sinon on retourne la valeur associée !

    return args[value];
  });
}; // On attache la méthode précédente à la fonction "format()"
// afin de profiter de son potentiel directement depuis une 
// chaîne de caractères.


exports.strFormat = strFormat;

String.prototype.format = function () {
  return strFormat.apply(this, function (src, args) {
    var _args = new Array();

    _args.push(src);

    _jquery.default.each(args, function (i, arg) {
      _args.push(arg);
    });

    return _args;
  }(this, arguments));
};
/* Méthode permettant de vérifier qu'un objet
 * est bien une chaîne de caractère, non vide
 * et non nulle.
 */


var strIsNullOrEmpty = function (str) {
  // S'il ne s'agît pas d'une chaîne de caractères
  // on retourne true.
  if (typeof str != "string") return true; // Si la chaîne est nulle ou vide on retourne true.

  if (str == null || $.trim(str) == "") return true; // Autrement on retourne false.

  return false;
}; // On attache la méthode précédente à la fonction "isNullOrEmpty()"
// afin de profiter de son potentiel directement depuis la classe String.


exports.strIsNullOrEmpty = strIsNullOrEmpty;

String.isNullOrEmpty = function (str) {
  return strIsNullOrEmpty(str);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkId = checkId;

var _jquery = _interopRequireDefault((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));

var _String = require("./String");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Méthode permettant de vérifier qu'un identifiant
 * est bien un identifiant DOM valide sans quoi on
 * retourne une erreur.
 */
function checkId(id) {
  // Si l'identifiant n'est pas une chaîne de
  // caractères ou que la chaîne est nulle ou vide,
  // on retourne une erreur ...
  if ((0, _String.strIsNullOrEmpty)(id)) throw new Error("La chaîne n'est pas un identifiant valide."); // On vérifie ensuite que l'identifiant existe
  // bien dans le DOM sans quoi on retourne une erreur ... ...

  if ((0, _jquery.default)(id).length != 1) throw new Error("L'identifiant n'existe pas dans le DOM.");
}

;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./String":10}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _String = require("./String");

Object.keys(_String).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _String[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _String[key];
    }
  });
});

var _fonctions = require("./fonctions");

Object.keys(_fonctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fonctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fonctions[key];
    }
  });
});

},{"./String":10,"./fonctions":11}]},{},[1]);
