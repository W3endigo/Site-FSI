// * Variable globale permettant de juger de la validité du match
validité = 1;

// * Une fois la checkbox validée, le créateur peut annuler le match

function activer_annuler() {

    if(document.getElementById("bouton_annuler").disabled == false)
        document.getElementById("bouton_annuler").disabled=true;
    else
        document.getElementById("bouton_annuler").disabled=false;
}

// * Fonction qui permet de récupérer les informations des matchs via requête AJAX et de les afficher.
function getMatch(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour récupérer un match par son id.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/matchbyid?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Préparation de la requête AJAX pour récupérer les noms des villes.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "../php/request.php/ville");
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    // * Récupération des données.
                    match = JSON.parse(xhr.responseText);
                    villes = JSON.parse(xhr1.responseText);

                    // * Association du nom de la ville à son code INSEE.
                    for(var i = 0; i < villes.length; i++){
                        if(villes[i].code_insee_ville == match.code_insee_ville){
                            nom_ville = villes[i].nom_ville;
                        }
                    }

                    date = new Date(match.horaire);
                    participant_max = match.participant_max;

                    // * Affichage des informations du match.
                    document.getElementById("date").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                    document.getElementById("heure").innerHTML = date.getHours()+":"+date.getMinutes();
                    document.getElementById("titre").innerHTML = match.titre;
                    document.getElementById("adresse").innerHTML = match.adresse+", "+nom_ville;
                    document.getElementById("sport").innerHTML = match.nom_sport;
                    document.getElementById("description_match").innerHTML = match.description;

                    // * Gestion de l'affichage du prix en fontion de ce dernier.
                    if(match.prix != 0){
                        document.getElementById("prix").innerHTML = "Une participation de "+match.prix+"€ vous sera demandé au début du match.";
                    }else{
                        document.getElementById("prix").innerHTML = "Ce match est gratuit !";

                    }

                    // * Préparation de la requête AJAX pour récupérer les informations des participants.
                    var xhr2 = new XMLHttpRequest();
                    xhr2.open("GET", "../php/request.php/participants?id_match="+queryString.get('id_match'));
                    xhr2.onreadystatechange = function(){
                        if(xhr2.readyState == 4 && xhr2.status == 200){
                            participants = JSON.parse(xhr2.responseText);
                            participant_accepte = 0;

                            // * Gestion de l'état de la participation du joueur.
                            for(let i = 0; i < participants.length; i++){
                                if(participants[i].email == queryString.get('email')){
                                    switch(participants[i].status) {
                                        case '0' :
                                            document.getElementById("status").innerHTML = "En attente";
                                            break;

                                        case '1' :
                                            document.getElementById("status").innerHTML = "Accepté";
                                            break;

                                        case '2' :
                                            document.getElementById("status").innerHTML = "Refusé";
                                            break;
                                        default:
                                            break;
                                    }
                                }

                                // * Vérification du nombre de joueurs acceptés et mise à jour de la capacité de match à accepter de nouveaux joueurs
                                if(participants[i].status == 1 && participant_accepte +1 < participant_max){
                                    participant_accepte += 1;
                                }
                                else{
                                    participant_accepte += 1;
                                    validité = 0;
                                }
                            }

                            document.getElementById("participant").innerHTML = participant_accepte+"/"+participant_max;

                        }
                    }
                    // * Envoi de la requête AJAX.
                    xhr2.send();
                }
            }
            // * Envoi de la requête AJAX.
            xhr1.send();
        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}

// * Fonction qui permet d'afficher les informations de l'organisateur du match.
function getOrganisateur(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour récupérer les informations du match.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/matchbyid?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            match = JSON.parse(xhr.responseText);

            // * Préparation de la requête AJAX pour récupérer les informations de l'organisateur.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "../php/request.php/joueur?email="+match.email);
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    // * Récupération des données.
                    organisateur_fiche = JSON.parse(xhr1.responseText);

                    // * Affichage des informations de l'organisateur.
                    document.getElementById("createur").src = organisateur_fiche.photo;
                    document.getElementById("createur_nom").innerHTML = organisateur_fiche.prenom+" "+organisateur_fiche.nom;
                    document.getElementById("createur_email").innerHTML = match.email;
                }
            }
            // * Envoi de la requête AJAX.
            xhr1.send();


            // * On vérifie si l'utilisateur est l'organisateur du match
            if(queryString.get('email') == match.email && match.termine == 0){
                document.getElementById("annuler").style.display="flex";
                document.getElementById("cloture").style.display="block";
            }

            if(match.termine == 1){ // * Si le matche est terminé, les inscriptions sont closes
                document.getElementById("inscription").style.display="none";
            }
        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}


// * Fonction qui permet d'afficher les informations des participants du match.
function getParticipantsAffichage(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour récupérer les informations du match.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/participants?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            participants = JSON.parse(xhr.responseText);
            participants.forEach(createDiv);// * On crée les divs pour chaque participant

            // * On récupère le mail de l'utilisateur dans l'url pour ensuite vérifier s'il est connecté et s'il est inscrit à ce match
            let paramString = window.location.href.split('?')[1];
            let queryString = new URLSearchParams(paramString);
            
            for(let i = 0; i < participants.length; i++){
                if(participants[i].email == queryString.get('email')){ // * L'utilisateur est inscrit
                    document.getElementById("inscription").style.display="none";
                }
                else if(queryString.get('email') != null){ // * L'utilisateur est connecté
                    document.getElementById("inscription").style.display="block";
                }
            }
            
            if(participants.length == 0){
                document.getElementById("inscription").style.display="block"; // * Si il n'y a personne inscrit, on affiche le bouton d'inscription, l'utilisateur n'y est forcément pas inscrit.
            }


            getOrganisateur(); // * On affiche maintenant les informations liées à l'organisateur

        }

    }
    // * Envoi de la requête AJAX.
    xhr.send();
}

// * Fonction qui permet de créer les divs pour chaque participant.
function createDiv(participant){

    // * Création de la div pour chaque participant.
    var participants_div = document.getElementById("participants");

    // * Préparation de la requête AJAX pour récupérer les informations du participant.
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "../php/request.php/joueur?email="+participant.email);
    xhr1.onreadystatechange = function(){
        if(xhr1.readyState == 4 && xhr1.status == 200){

            // * Récupération des données.
            joueur = JSON.parse(xhr1.responseText);

            // * Remplissage de la div.
            var div = document.createElement("div");
            div.class = "d-flex flex-row";

            var img = document.createElement("img");
            img.src = joueur.photo;
            div.appendChild(img);

            var h5 = document.createElement("h5");
            h5.textContent = joueur.prenom+" "+joueur.nom;
            div.appendChild(h5);

            // * Ajout de la div à la page.
            participants_div.appendChild(div);
        }
    }
    // * Envoi de la requête AJAX.
    xhr1.send();

}

// * Fonction qui permet d'inscrire un utilisateur à un match.
function inscription(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour inscrire l'utilisateur.
    var xhr = new XMLHttpRequest();

    // * S'il reste de la place pour le match, on inscrit l'utilisateur.
    if(validité == 1){
        xhr.open("POST", "../php/request.php/participant?id_match="+queryString.get('id_match')+"&email="+queryString.get('email'));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                alert("Vous êtes inscrit");
                window.location.reload();
            }else{
                console.log(xhr.responseText);
            }
        }
        xhr.send();
    }else
        alert("Match complet !!");
}

// * Fonction permettant de revenir au menu en restant connecté
function goHome(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Redirection vers la page d'accueil en gardant la connexion de l'utilisateur (si elle existe). 
    if(queryString.get('email') != null){
        window.location.href = "../../index.html?email="+queryString.get('email');
    }else{
        window.location.href = "../../index.html";
    }
}

// * Fonction qui permet de récupérer les participant du match pour sélectionner le meilleur.
function getParticipants(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour récupérer les participants du match.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/participants?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            var participants = JSON.parse(xhr.responseText);
            var select = document.getElementById("meilleur_joueur");

            // * Remplissage du select.
            for(var i = 0; i < participants.length; i++){
                if(participants[i].status == 1){

                    var option = document.createElement("option");
                    option.value = participants[i].email;
                    option.text = participants[i].email;
                    select.appendChild(option);
                }
            }

        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}

// * Fonction qui permet de supprimer un match.
function supprimerMatch(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour supprimer le match.
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "../php/request.php/match?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Alerte de confirmation.
            alert("Match supprimé");

            // * Redirection vers la page d'accueil en gardant la connexion de l'utilisateur (si elle existe).
            if(queryString.get('email') != null){
                window.location.href = "../../index.html?email="+queryString.get('email');
            }else{
                window.location.href = "../../index.html";
            }
        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}

// * Fonction qui permet de cloturer un match.
function cloturerMatch(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour cloturer le match.
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "../php/request.php/match?id_match="+queryString.get('id_match')+"&score_home="+$("#score_home").val()+"&score_away="+$("#score_away").val()+"&email_joueur="+$("#meilleur_joueur").val());
       xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Gestion de la réponse de la requête AJAX.
            if(JSON.parse(xhr.responseText) == true){
                alert("Match cloturé");   
                window.location.reload();
            }else{
                alert("Erreur lors de la cloture du match");
                console.log(JSON.parse(xhr.responseText));
            }

        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}

// * Fonction qui permet de mettre la photo de profil du joueur ainsi que sont nom et prénom en haut de la page
function chargeJoueur(){

    // * Préparation de la récupération des informations de l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le joueur est connecté.
    if(queryString.has('email')){

        // * Préparation de la requête AJAX.
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../php/request.php/joueur?email="+queryString.get('email'));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){

                // * Récupération des informations du joueur.
                joueur = JSON.parse(xhr.responseText);
                
                // * Comme le fichier se trouve dans le dossier principal, il faut retirer le début du chemin qui est stocké dans joueur.photo
                document.getElementById("user_image").src = joueur.photo;
                document.getElementById("user_image").onclick = function(){goConnexionProfil()};

            }
        }
        // * Envoi de la requête AJAX.
        xhr.send();

    // * Si le joueur n'est pas connecté, on affiche une image de profil par défaut.
    }else{
        document.getElementById("user_image").src = "ressources/deconnecte.png";
        document.getElementById("username").innerHTML = "Déconnecté";
    }

}

// * Fonction qui permet de rediriger vers la page de connexion ou le profil si l'utilisateur est connecté.
function goConnexionProfil(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le joueur est connecté, on redirige vers la page profil.
    if(queryString.get('email') != null){
        window.location.href = "profil.html?email="+queryString.get('email');
    }else{
        window.location.href = "connexion.html";
    }
}