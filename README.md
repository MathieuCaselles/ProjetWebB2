# Projet Dev Web

## Groupe

Mathieu Caselles, Rémi Feydit

## Présentation

Il s’agit d’un site e-Commerce de vente de produit alimentaires. Les utilisateurs peuvent acheter toute sorte de produits alimentaires.  
Lorsqu’un utilisateur en achète un, il recevra un email avec une facture en PDF. Cette facture se
retrouvera également dans son espace membre sur le site.   
Il y a aussi des revendeurs qui peuvent gérer leur propre page de vente.  
Ces revendeurs servent à avoir des points de vente un peu partout pour ceux qui ne veulent pas acheter en ligne.  
Il est possible de réserver des produits en lignes et d'aller les chercher et payer directement chez les revendeurs.  
Un membre ne peut acheter un produit que s’il dispose d’un solde suffisant. Également, les produits ont une quantité définie, il faudra
vérifier le stock avant d’autoriser un achat.  
  
Un espace administration permet de gérer les produits en vente et les informations des membres.  
  
### Pages:  
Le site se composera obligatoirement des pages suivantes :  
* page d'accueil  
* page produit (description)  
* page du panier d’achat  
* tunnel d'achat  
* page d’espace membre  
* page d’inscription / connexion
* page de contact avec système reCAPTCHA.

L'administration se composera obligatoirement des pages suivantes :  
* page tableau de bord  
* page des revendeurs
* page des membres  
* page des produits  
* page de connexion
* page de contact
* page de FAQ
  

### Fonctionnalités  

#### Partie publique
* la page d’accueil :
    * Présentation "Qui somme nous ?"
    * Liste des produits alimentaires;
* La page de boutique
    * liste de tous les produits disponibles avec un système de pagination / difficulté : 3
    * un système de recherche par le nom du produit / difficulté : 2
    * système de tri (alphabétique, prix, quantité, type de produits, ...)
* les utilisateurs peuvent se créer un compte et se connecter. Ils pourront compléter et modifier leur profil / difficulté : 5
    * chaque profil utilisateur possède :
        * un prénom
        * un nom
        * une adresse email
        * adresse de livraison
        * un solde (factice)
    * fonction de mot de passe oublié
* la page produit contient : / difficulté : 7
    * l'image du produit
    * le nom du produit
    * le prix du produit
    * la description du produit
    * un bouton d’achat / réservation (pour revendeurs)
* Tunnel d'achat
* un email automatique est envoyé à l’acheteur après la vente/réservation avec : / difficulté : 5
    * la facture en PDF

#### Partie administrateur
* un espace administrateur est mis en place avec une authentification / difficulté : 3
* un tableau de bord est présent dans l’espace administrateur avec des informations tels que : / difficulté : 2
    * nombre de membres
    * nombre de ventes
    * nombre de réservations
    * nombre de nouvelles ventes sur les 7 derniers jours
    * les revenus du site totaux
    * les revenus du site sur les 7 derniers jours
    * détails des réservations
* les administrateurs peuvent gérer les produits avec un CRUD : / difficulté : 5
    * le CRUD permet d'ajouter/modifier/supprimer un produit avec :
        * un nom
        * une description
        * une photo
        * une quantité
        * une description
        * un prix
    * les administrateurs peuvent consulter :
        * Les messages provenenant de la page contacts
        * Les réservations en datail
* les administrateurs peuvent gérer les utilisateur : / difficulté : 4
    * Ils peuvent modifier le rôle:
        * utilisateur
        * vendeur
        * administrateur
        * banni
    * les administrateurs peuvent consulter :
        * les achats de produits
        * les factures en PDF
* Les adminstrateurs peuvent ajouter, consulter et modifier les pages de revendeurs
* Les revendeurs ont leurs propre partie d'administration :
    * nombre de réservations
    * nombre de nouvelles réservations sur les 7 derniers jours
    * Détail des réservations
    * Ajouter leurs produits
