# Projet-Web

# Commande à utiliser pour ajouter son travail à git sur github
```
    git add .
    git commit -m "Méssage que l'on souhaite ajouter"
    git push

```

# Commande pour récupérer le projet
```
    git clone https://github.com/Chancy-maker/Projet-Web.git
    cd ./Projet-Web
    code .

```
# Commande pour récupérer les mises à jour 
```
    git pull 
```

# Explcation de l'ensemble est vues

    ## header.html et footer.html
        ### header.html
            La vues header html représente l'entête de tous le site. Dans cette entête on y retrouve une bare de navigation avec les élément suivants
                -Un formulaire de recherche qui nous redirigera vers la vue search.html 
                -si on est pas connecté :
                    -Le logo du site qui nous redirige vers la page racine du site
                    -Les lien "se connecter" et "créer un compte" qui nous redirige respectivement sur les formulaire de connexion et de création de
                    compte. 
                        
             -si on est connecté :
                    -le lien se déconnecter qui nous déconnecte et nous redirige vers la page racine du site.

        ### footer.html
            La vue footer représente le pieds de toutes les pages, on mettra ce que l'on trouvera intéréssant

/*********************************************************************************************************************************/

    ## index.html
        On aura notre page d'accueille du site .
            


    ## new_user_company.html, new_user_student.html, company_login et student_login
            les vue new_user_company, new_user_student, company_login et student_login sont les formulaires respectifs de création de compte et de connection des entreprise et des étudiants.
                -Si on est étudiant après la connection ou la création d'un compte, on est redirigé vers la page racine ou l'on peut voir des annonces et pouvoir efectué des recherche.
                -Si on est une entreprise, on est renvoyé vers la company.space qui sera l'espace permet d'un utilisateur (entreprise).


    ## company_space.html
        -Dans la vue company_space.html se trouvera l'ensembles des annonces qu'elle aura poster avec : 
            -Les liens vers création, de modification et de suppression d'une annonce
            -pour chacune d'elle le nombre de postulation par des étudiant.

    ## student_space.html
        Dans la vue student_space.html se trouvera l'ensemble des anonces auquel un étudiant aura postulé



    ## create.html, delete.html, update.html et read.html
        Les vues create.html, delete.html, update.html et read.html sont respectivement les formualaire de création, de suppression et de modification des annonces. Après la soumission des formulaire on redirigé vers la vue company_space de l'utilisateur

    #search
        La vue search nous affichera les résultat à nos recherche d'annonce.


    ## read.html
        La vue read.html permettra de voir les détails sur une annonce.

 