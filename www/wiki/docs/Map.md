[&larr; Retour à la documentation](/documentation.md)

# Map

(version 0.3.0)   
**Map** - Classe permettant de générer une carte Leaflet avec un identifiant et des options.   
<i class="fas fa-link"></i> hérite de 🍃 [L.Map](https://leafletjs.com/reference.html#map)[^1]

## Constructeurs

| Méthode | Description |
|---------|-------------|
| `Lascar.map()` | Méthode permettant de générer une carte avec l'identifiant DOM et les propriétés configurés par défaut. |
| `Lascar.map(<String> id)` | Méthode permettant de générer une carte avec un identifiant DOM personnalisé et les propriétés par défaut. |
| `Lascar.map(<Object> options)` | Méthode permettant de générer une carte avec l'identifiant DOM par défaut et des propriétés personnalisées. |
| `Lascar.map(<String> id, <Object> options)` | Méthode permettant de générer une carte avec un identifiant DOM et des propriétés personnalisés. |

## Options
Les propriétés issues de 🍃 [L.Map](https://leafletjs.com/reference.html#map)[^1] servent de base et sont complétées par les propriétés décrites ci-dessous (et qui sont disponibles via `<Map>.options.lascar`).

| Option | Type | Valeur par défaut | Description |
|--------|------|-------------------|-------------|
| `attributionControl` | `Boolean` | `false` | Indicateur permettant de neutraliser la génération automatique du contrôle d'attribution. |
| `_attribution` | [`Attribution.options`](https://leafletjs.com/reference.html#control-attribution-option) | *cf. code source* | Les propriétés permettant de générer le nouveau contrôle d'attribution. |
| `zoom` | `Number` | `6` | Niveau de zoom par défaut de la carte. |
| `zoomControl` | `Boolean` | `false` | Indicateur permettant de neutraliser la génération automatique du contrôle de zoom. |
| `_zoom` | [`Zoom.options`](https://leafletjs.com/reference.html#control-zoom-option) | *cf. code source* | Les propriétés permettant de générer le nouveau contrôle de zoom. |
| `_scale_` | [`Scale.options`](https://leafletjs.com/reference.html#control-scale-option) | *cf. code source* | Les propriétés permettant de générer le nouveau contrôle pour l'échelle. |
| `style` | `Object` | *cf. code source* | Propriétés de style CSS à appliquer sur la carte lors de sa génération. |
| `center` |  [`LatLng`](https://leafletjs.com/reference.html#latlng) | `L.latLng(46.53972, 2.43028)` | Coordonnnées par défaut du centre de la carte. |
| `_dataLayers` | `LayerOpts[]` | *cf. code source* | Tableau de l'ensemble des options de layers à intégrer sur la carte. |

### Options d'un layer
Les options d'un layer ou `LayerOpts` permettent de fournir l'ensemble des paramètres pour générer un fond de carte.   
Ceux-ci sont décrits ci-après :

| Option | Type | Description |
|--------|------|-------------|
| `id` | `String` | L'identifiant unique du layer - permet son exploitation via la méthode `apply()` |
| `title` | `String` | Le libellé du layer retourné aux utilisateurs. |
| `url` | `String` | L'URL permettant d'accéder aux tuiles du fond de carte. |
| `attribution` | `String` | L'attribution affichée lorsque le fond de carte est sélectionné. |
| `maxZoom` | `Number` | Le niveau de zoom maximal pouvant être exploité pour ce fond. |
| `minZoom` | `Number` | Le niveau de zoom minimal pouvant être exploité pour ce fond. |

## Méthodes
Les méthodes issues de 🍃 [L.Map](https://leafletjs.com/reference.html#map)[^1] sont disponibles et complétées par les méthodes décrites ci-dessous :

| Méthode | Retourne | Description |
|---------|----------|-------------|
| `apply(<MapApplyOptions> options?)` | `void` | Méthode permettant de modifier le niveau de zoom, le centre, le fond de la carte en fonction des options fournies. Si aucune option n'est mise à disposition, la carte est réintialisée à son état initial. |

### Option de mise à jour d'une carte
L'option de mise à jour d'une carte ou `MapApplyOptions` permettent de modifier une carte "à la volée" en fonction des propriétés fournies.
Les paramètres possibles sont décrits ci-après :

| Option | Type | Description |
|--------|------|-------------|
| `zoom` | `Number` | Le niveau de zoom souhaité. |
| `lat` | `Number` | La latitude du centre souhaité (nécessite également le paramètre `lng`). |
| `lng` | `Number` | La longitude du centre souhaité (nécessite également le paramètre `lat`). |
| `layer` | `String` | L'identifiant unique du layer à appliquer. |

## Exemple d'utilisation

Ci-dessous un exemple d'utilisation de la classe `Map` permettant ainsi de personnaliser tant l'identifiant DOM de la carte, que les propriétés telles que les fonds à exploiter et en supprimant l'échelle.

```javascript
var options = { 
    _scale: null, 
    _dataLayers: [{
        // Identifiant 
        "id": "wikimedia",
        // Titre du layer
        "title": "Wikimedia",
        // Url du layer 
        "url": "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
        // Origine de la source des tuiles
        "attribution": "Fond fourni par <a href=\"https://www.mediawiki.org/wiki/Maps\">Wikimedia Maps</a>",
        // Zoom maxmimal
        "maxZoom": 19,
        // Zoom minimal
        "minZoom": 0
    }, {
        // Identifiant 
        "id": "thunderforest_out",
        // Titre du layer
        "title": "Thunderforest Outdoors",
        // Url du layer 
        "url" : "http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
        // Origine de la source des tuiles
        "attribution": "Fond fourni par <a href=\"http://www.thunderforest.com/outdoors/\">Thunderforest</a>",
        // Zoom maxmimal
        "maxZoom": 19,
        // Zoom minimal
        "minZoom": 0
    }]
};
var map = new Lascar.Map("my-map", options); // ou Lascar.map("my-map2", options);
map.apply({ zoom: 9, lat: 46, lng: 2.5, layer: "thunderforest_out"});
map.apply();
``` 


<script type="text/javascript">
window.onload = function() {
    var options = { 
        _scale: null, 
        _dataLayers: [{
            // Identifiant 
            "id": "wikimedia",
            // Titre du layer
            "title": "Wikimedia",
            // Url du layer 
            "url": "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
            // Origine de la source des tuiles
            "attribution": "Fond fourni par <a href=\"https://www.mediawiki.org/wiki/Maps\">Wikimedia Maps</a>",
            // Zoom maxmimal
            "maxZoom": 19,
            // Zoom minimal
            "minZoom": 0
        }, {
            // Identifiant 
            "id": "thunderforest_out",
            // Titre du layer
            "title": "Thunderforest Outdoors",
            // Url du layer 
            "url" : "http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
            // Origine de la source des tuiles
            "attribution": "Fond fourni par <a href=\"http://www.thunderforest.com/outdoors/\">Thunderforest</a>",
            // Zoom maxmimal
            "maxZoom": 19,
            // Zoom minimal
            "minZoom": 0
        }]
    };
    var map = new Lascar.Map("my-map", options); // ou Lascar.map("my-map2", options);
    // map.apply({ zoom: 9, lat: 46, lng: 2.5, layer: "thunderforest_out"});
    // map.apply();
}
</script>

[^1]: Documentation de la classe 🍃 [L.Map](https://leafletjs.com/reference.html#map)