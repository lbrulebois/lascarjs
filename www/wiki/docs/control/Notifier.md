[&larr; Retour à la documentation](/documentation.md)

# Notifier

(version 0.3.0)   
**Notifier** - Classe permettant de générer un composant en charge d'afficher des notifications sur une carte.   
<i class="fas fa-link"></i> hérite de 🍃 [L.Control](https://leafletjs.com/reference.html#control)[^1]

## Constructeurs

| Méthode | Description |
|---------|-------------|
| `Lascar.control.Notifier()` | Méthode permettant de générer le composant avec les propriétés configurées par défaut. |
| `Lascar.control.Notifier(<Object> options)` | Méthode permettant de générer le composant avec des propriétés personnalisées. |

## Options
Les propriétés issues de 🍃 [L.Control](https://leafletjs.com/reference.html#control)[^1] servent de base et sont complétées par les propriétés décrites ci-dessous.

| Option | Type | Valeur par défaut | Description |
|--------|------|-------------------|-------------|

### Options du message par défaut
Les options du message par défaut ou `DefaultMsg` permettent de fournir l'ensemble des paramètres pour générer une notification.   
Ceux-ci sont décrits ci-après :

| Option | Type | Description |
|--------|------|-------------|

## Méthodes
Les méthodes issues de 🍃 [L.Control](https://leafletjs.com/reference.html#control)[^1] sont disponibles et complétées par les méthodes décrites ci-dessous :

| Méthode | Retourne | Description |
|---------|----------|-------------|

## Exemple d'utilisation

Ci-dessous un exemple d'utilisation du composant `Notifier` permettant ainsi de notifier l'utilisateur que des modifications ont eu lieu.

[^1]: Documentation de la classe 🍃 [L.Control](https://leafletjs.com/reference.html#control)