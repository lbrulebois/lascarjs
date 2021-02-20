export var Request = L.Evented.extend({

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
        this.options = jQuery.extend(this.options, options);
    },

    // Méthode permettant de provoquer l'envoi de la requête
    // et de prendre en compte de nouveaux paramètres si
    // nécessaire.
    send: function (options) {
        // On commence par intégrer toutes les options pour
        // configurer la requête à envoyer ...
        var opts = this.options;
        if (typeof (options) == "object" && options != null) opts = jQuery.extend({}, this.options, options);

        // Puis on vérifie que les paramètres requis sont 
        // présents pour provoquer l'envoi ...
        if(typeof opts.url != "string" || typeof opts.type != "string")
            throw new Exception("La configuration ne permet pas d'envoyer la requête.");

        // S'il y a des en-têtes à intégrer à la requête, on
        // génère la fonction permettant de les intégrer ...
        if (typeof (opts.headers) == "object" && opts.headers != null) {
            opts.beforeSend = function (xhr) {
                jQuery.map(opts.headers, function (value, key) {
                    xhr.setRequestHeader(key, value);
                });
            };
        }

        // On averti les observateurs que l'on vient
        // d'envoyer la requête.
        this.fire("sending");

        var _this = this,
            result = null;
        // On peut enfin emmettre la requête !
        $.ajax(opts)
            .done(function (data, status, jqXHR) {
                _this.fire("success", (result = {
                    "data": data,
                    "status": status,
                    "jqXHR": jqXHR
                }));
            }).fail(function (jqXHR, status, error) {
                _this.fire("fail", (result = {
                    "error": error,
                    "status": status,
                    "jqXHR": jqXHR
                }));
            });

        // S'il s'agît d'un appel synchrone, on retourne
        // la réponse du web service directement ...
        if (!(typeof opts.async == "boolean" ? opts.async : true)) {
            return result;
        }
    }

});

/* Lascar.control.Request([options]) 
 * méthode permettant de générer une requête rapidement.
 */
export function createRequest(options) {
    return new Request(options);
};