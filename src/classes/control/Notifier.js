var baseOptions = L.Control.prototype.options;
export var Notifier = L.Control.extend({

    // On définit ici les options par défaut permettant
    // de générer le contrôle.
    options: jQuery.extend(baseOptions, {
        position: "topleft", // Position du composant
        maxMessages: 5, // Nombre maximum de messages à afficher
        defaultMsg: {
            message: "Un événement est survenu ...", // Message par défaut
            showIcon: true, // Booléen permettant d'afficher l'icône
            icon: $("<span>", { // Icône à intégrer par défaut
                class: "alert", html: " ! ",
                css: { "color": "red", "font-weight": "bold" }
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
            $container = jQuery("<div>", { class: "leaflet-control lascar-notifier" });
        // on ajoute le bouton permettant de masquer le
        // composant lorsque l'utilisateur le souhaite ...
        jQuery("<a>", { href: "#", html: "&times;", class: "lascar-notifier-close", title: "Fermer" })
            // La fermeture du composant provoque son masquage et la 
            // purge des messages en place actuellement ...
            .click(function (event) { _this.hide(); event.preventDefault(); })
            .appendTo($container);
        $container.hide(); // On masque le conteneur par défaut 
        // avant de le retourner ...
        return this._container = $container[0];
    },

    // Méthode permettant d'afficher le composant
    // et intégrer un nouveau message ...
    show: function (data) {
        function integrateMessage(message) {
            var $container = $(this._container);
            $container.parent().addClass("lascar-notifier-container");
            // S'il y a plus de messages que permis, on supprime
            // le plus ancien pour permettre l'intégration du
            // nouveau message de notification.
            if ($container.find(".message").length >= this.options.maxMessages) {
                while ($container.find(".message").length >= this.options.maxMessages) {
                    $container.find(".message").first().remove();
                }
            }

            // Pour tous les messages actuellement en place, on stop
            // l'animation de l'icône actuelle
            $container.find(".message .notifier-icon").children().addClass("no-anim");

            // On peut dorénavant intégrer le nouveau message
            var $ctMessage = $("<div>", { class: "message" });
            $("<span>", { class: "notifier-icon", html: $(message.icon).clone() }).appendTo($ctMessage);
            $("<span>", { class: "notifier-msg", html: message.message }).appendTo($ctMessage);
            $ctMessage.appendTo($container);
        };

        // Si le paramètre est une chaîne de caractères, il
        // s'agît d'un message à intégrer ...
        if (typeof (data) == "string") {
            integrateMessage.call(this, jQuery.extend({}, this.options.defaultMsg, { message: data }));
        }
        // Et si les informations sont un objet, il s'agît d'un
        // message personnalisé à intégrer ...
        else if (typeof (data) == "object" && data != null && typeof (data.message) == "string") {
            integrateMessage.call(this, jQuery.extend({}, this.options.defaultMsg, data));
        }
        // S'il n'y a aucune donnée de définie, on intègre
        // le message par défaut ...
        else {
            integrateMessage.call(this, this.options.defaultMsg);
        }

        // On affiche le composant ...
        $(this._container).show();
        return this;
    },

    // Méthode permettant de masquer le composant
    // et purger les messages par la même occasion ...
    hide: function () {
        var $container = $(this._container);
        $container.parent().removeClass("lascar-notifier-container");
        $container.children(".message").remove();
        $container.hide();
        return this;
    }

});

/* Lascar.control.Notifier([options]) 
 * méthode permettant de générer un notifier rapidement.
 */
export function createNotifier(options) {
    return new Notifier(options);
};