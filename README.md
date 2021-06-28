# Orinoco #

This is the back end server for Project 5 of the Junior Web Developer path.

### Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Installation ###

Clone this repo. From within the project folder, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.


### Réalisations et Questions ###

Organisation générale : inspirée du projet wébinaire d'OC
    - Dossier global Front End : 
    - 1 dossier view avec sous dossiers pour chaque page qui comprend le fichier HTML et le fichier JS
    - 1 dossier JS
    - 1 dossier CSS

1. HTML et CSS (Boostrap) -> finalisation détails en dernière étape

JAVASCRIPT
1. Création d'une classe Product pour instancier nos produits avec une méthode permettant d'afficher le prix au bon format
2. Page index : affichage des produits via Fetch et insertAdjacentHTML
3. Page produits : 
    - Affichage dynamique du produit (grâce au paramètre ID dans l'URL et requete fetch via l'ID)
    - Ajout produit au panier via localStorage
    - Ajouter message ou animation confirmation produit ajouté dans panier

4. Page Panier : 
    - Affichage des produits dans le panier en récupérant les données du localstorage
    - Suppression du produit du panier (avec bon ID et même option) grâce à la méthode filter => `Manque encore le cas ou l'user prend 2 produits identiques avec la même option : supprime les deux du localstorage`



    A FAIRE 
    - Fonction qui calcul le montant total des produits dans le panier (se met à jour avec les suppressions)
    - Intégrer animation panier avec compteur du nb de produit dedans 
    - Fonction qui vérifie les input du formulaire
    - Méthode POST pour envoyer les données (objet contact)
    - Fonction qui génère un numéro de commande unique
    - Page confirmation commande


    SESSION MENOTRAT
    - Ajouter quantité pour éviter le soucis des 2 appareils phots
    - Mettre P majuscule page produit car classe
    - Flash JS
    - POST 
        - Body : sera le local storage
    - Heruku pour l'hébergement