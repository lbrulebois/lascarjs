/* Méthode permettant d'intégrer des valeurs dans une 
 * chaîne de caractères à l'aide de son indice dans le 
 * tableau des arguments.
 */
export var strFormat = function (str) {
    // On vérifie que le premier argument est bien
    // une chaîne de caractères.
    if (typeof str !== "string" || str == null)
        throw new Error("Aucune chaîne valide n'a été identifiée.");

    // On commence par récupérer les potentiels
    // arguments permettant de replacer les balises
    // {x} (avec x un nombre entier > à 0) par
    // l'argument approprié.
    var args = (function (args) {
        var _args = new Array();
        jQuery.each(args, function (i, arg) {
            if (i > 0) _args.push(arg);
        });
        return _args;
    })(arguments);


    // On peut enfin remplacer les balises dans
    // la chaîne de caractères fournie ...
    return str.replace(/{(\d+)}/g, function (match, value) {
        // Si aucun argument n'existe pour cet indice, on
        // retourne une erreur !
        if (value >= args.length)
            throw new Error("Aucune valeur n'existe pour l'indice n°".concat(value).concat("."));
        // Sinon on retourne la valeur associée !
        return args[value];
    });
};

// On attache la méthode précédente à la fonction "format()"
// afin de profiter de son potentiel directement depuis une 
// chaîne de caractères.
String.prototype.format = function() {
    return strFormat.apply(this, (function (src, args) {
        var _args = new Array();
        _args.push(src);
        jQuery.each(args, function (i, arg) {
            _args.push(arg);
        });
        return _args;
    })(this, arguments));
};

/* Méthode permettant de vérifier qu'un objet
 * est bien une chaîne de caractère, non vide
 * et non nulle.
 */
export var strIsNullOrEmpty = function(str) {
    // S'il ne s'agît pas d'une chaîne de caractères
    // on retourne true.
    if(typeof(str) != "string") return true;
    // Si la chaîne est nulle ou vide on retourne true.
    if(str == null || $.trim(str) == "") return true;
    // Autrement on retourne false.
    return false;
};

// On attache la méthode précédente à la fonction "isNullOrEmpty()"
// afin de profiter de son potentiel directement depuis la classe String.
String.isNullOrEmpty = function(str) {
    return strIsNullOrEmpty(str);
};