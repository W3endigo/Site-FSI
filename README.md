# Site-FSI

Fonction Hash JS : const digest = shajs('sha256').update(data).digest('hex') (nécessite sha.js)

Type retour selon la requête : 
    requête GET: 

        false = problème duant la requete SQL 
        [] = pas de resultat
        [remplis] = resultat
        400 = requete mal formulee (manque argument dans l'URL)
    
    requête DELETE:

        true = requête bien éxectué
        false = problème duant la requete SQL
        400 = requete mal formulee (manque argument dans l'URL)

    request POST:
        true = requête bien éxectué
        false = problème duant la requete SQL
        400 = requete mal formulee (manque argument dans l'URL)


PUT -> modifier (update)
POST -> ajouter (INSERT)
postman.com