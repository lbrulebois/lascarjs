# lascarjs

Basée sur la librairie Leaflet, **lascarjs** a pour objectifs de simplifier la génération de vos cartes javascript, de vous apporter de nouveaux composants compatibles et des exemples d'implémentations. Le tout est distribué sous licence libre CeCILL (*plus d'informations [FR](https://cecill.info/licences/Licence_CeCILL_V2.1-fr.html)/[EN](https://cecill.info/licences/Licence_CeCILL_V2.1-en.html)*) pour vous permettre d'en profiter pleinement !
 
## Pour bien débuter ...

Commencez par importer les lirairies suivantes dans votre projet :
* [jQuery](https://jquery.com/) (version >= 3.5.1)
* [Leafler](https://leafletjs.com/) (version >= 1.7.1)

*Bien évidemment, vous aurez également besoin de **lascarjs** !*

Dans votre projet, ajouter un conteneur avec pour identifiant `lmap` :
```html
<div id="lmap"></div>
```

Puis ajouter cette ligne de code Javascript :
```javascript
Lascar.map();
```

Rien de plus pour générer une carte Leaflet intégralement fonctionnelle !

## Pour aller plus loin

Pour appronfondir votre découverte de **lascarjs**, je vous invite à consulter la [documentation](/documentation.md). Vous y trouverez toutes les informations pour exploiter l'ensemble des composants mis à votre disposition et comprendre leurs aspects techniques.