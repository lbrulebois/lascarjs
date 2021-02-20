import { strIsNullOrEmpty } from './String';

/* Méthode permettant de vérifier qu'un identifiant
 * est bien un identifiant DOM valide sans quoi on
 * retourne une erreur.
 */
export function checkId(id) {
    // Si l'identifiant n'est pas une chaîne de
    // caractères ou que la chaîne est nulle ou vide,
    // on retourne une erreur ...
    if(strIsNullOrEmpty(id)) throw new Error("La chaîne n'est pas un identifiant valide.");
    // On vérifie ensuite que l'identifiant existe
    // bien dans le DOM sans quoi on retourne une erreur ... ...
    if(jQuery(id).length != 1) throw new Error("L'identifiant n'existe pas dans le DOM.");
};