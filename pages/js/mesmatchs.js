// * Permet de cliquer sur un match pour se rendre sur sa page
function ouvrir_match(){

    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../html/match.html?email="+queryString.get('email');
    }else{
        window.location.href = "../html/match.html";
    }
}

// * Fonction permettant de revenir au menu en restant connecté (si l'on est connecté)
function goHome(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../../index.html?email="+queryString.get('email');
    }else{
        window.location.href = "../../index.html";
    }
}

// * Cette fonction permet de récupérer les informations du joueur via requête AJAX et de les afficher en haut dans le profil.
 function getJoueur(){

    // * Préparation à la récupération des données de l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/joueur?email="+queryString.get('email'));
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            var joueur = JSON.parse(xhr.responseText);
            document.getElementById("user_image").src = joueur.photo;        
        }
    }
    // * Envoi de la requête.
    xhr.send();
}

function getMatch(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour récupérer les matchs sans filtre.
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "../php/request.php/participations?email="+queryString.get('email'));
    xhr1.onreadystatechange = function(){
        if(xhr1.readyState == 4 && xhr1.status == 200){

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "../php/request.php/organise?email="+queryString.get('email'));
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){

                    // * Récupération des données et envoie à la fonction qui permet d'afficher les matchs.
                    match = JSON.parse(xhr1.responseText);
                    organise = JSON.parse(xhr.responseText);

                    for(let i = 0; i < organise.length; i++){
                            match.push(organise[i]);
                    }
                    
                    match.forEach(createDiv);
                }
            }
            // * Envoi de la requête.
            xhr.send();
        }
    }
    // * Envoie de la requête AJAX.  
    xhr1.send();
}

// * Fonction qui permet de créer les divs des matchs pour les afficher.
function createDiv(match1){
    console.log(match1);
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Préparation de la requête AJAX pour récupérer les informations du match.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/matchbyid?id_match="+match1["id_match"]);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

                // * Préparation de la requête AJAX pour récupérer les informations des participants du match.
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "../php/request.php/participants?id_match="+match1["id_match"]);
            xhr2.onreadystatechange = function(){
                if(xhr2.readyState == 4 && xhr2.status == 200){

                    // * Préparation de la requête AJAX pour récupérer les informations des villes afin de convertir le code INSEE en nom de ville.
                    var xhr1 = new XMLHttpRequest();
                    xhr1.open("GET", "../php/request.php/ville");
                    xhr1.onreadystatechange = function(){
                        if(xhr1.readyState == 4 && xhr1.status == 200){

                            // * Récupération des données.
                            var match = JSON.parse(xhr.responseText);
                            participants = JSON.parse(xhr2.responseText);
                            villes = JSON.parse(xhr1.responseText);

                            var participant_confirme = 0;
                            participant_max = match.participant_max;
                            date = new Date(match.horaire);

                            // * Calcul du nombre de participants.
                            for(var i = 0; i < participants.length; i++){
                                if(participants[i].status == 1){
                                    participant_confirme++;
                                }
                            }

                            // * Récupération du nom de la ville.
                            for(var i = 0; i < villes.length; i++){
                                if(villes[i].code_insee_ville == match.code_insee_ville){
                                    nom_ville = villes[i].nom_ville;
                                }
                            }

                            // * Création de la div qui contiendra les informations du match.
                            var div_match = document.createElement("div");
                            div_match.className = "match";
                            div_match.onclick = function(){goMatch(match.id_match);};

                            // * Création de la div qui contiendra la date et l'heure du match.
                            var div_date = document.createElement("div");
                            div_date.className = "date";

                            // * Création de la div qui contiendra la date du match.
                            var h4_date = document.createElement("h4");
                            h4_date.innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                            div_date.appendChild(h4_date);

                            // * Création du h5 qui contiendra l'heure du match
                            var h5_heure = document.createElement("h5");
                            h5_heure.innerHTML = date.getHours()+":"+date.getMinutes();
                            div_date.appendChild(h5_heure);

                            // * Si l'organisateur est la personne connectée, on affiche une couronne dans le match.
                            if(queryString.get('email') == match.email){
                                // * Création de la div qui contiendra la couronne de l'organisateur.
                                img_courronne = document.createElement("img");
                                img_courronne.src = "../../ressources/couronne.png";
                                div_date.appendChild(img_courronne);
                            }

                            // * Ajout de la div contenant la date et l'heure du match dans la div contenant les informations du match.
                            div_match.appendChild(div_date);

                            // * Création de la div qui contiendra le titre et l'adresse du match.
                            var div_titre = document.createElement("div");
                            div_titre.className = "titre_match";

                            // * Création du h1 qui contiendra le titre du match.
                            var h1_titre = document.createElement("h1");
                            h1_titre.innerHTML = match.titre;
                            div_titre.appendChild(h1_titre);


                            // * Création de la h3 qui contiendra l'adresse du match.
                            var h3_adresse = document.createElement("h3");
                            h3_adresse.innerHTML = match.adresse+", "+nom_ville;
                            div_titre.appendChild(h3_adresse);


                            // * Création de la h5 qui précisera si le match est terminé
                            if(match.termine == 1){
                                var h5_terminer = document.createElement("h5");
                                h5_terminer.innerHTML = "Terminé";
                                h5_terminer.className = "terminer";
                                div_titre.appendChild(h5_terminer);
                            }

                            // * Ajout de la div contenant le titre et l'adresse du match dans la div contenant les informations du match.
                            div_match.appendChild(div_titre);

                            // * Création de la div qui contiendra le nombre de participants.
                            var div_joueur = document.createElement("div");
                            div_joueur.className = "nb_joueurs";

                            // * Création de l'img qui contiendra l'image du nombre de participants.
                            var img_joueur = document.createElement("img");
                            img_joueur.src = "../../ressources/utilisateur.png";
                            div_joueur.appendChild(img_joueur);

                            // * Création du div qui contiendra le nombre de participants, le nombre max de participants et le sport du match.
                            var container_div = document.createElement("div");

                            // * Création du small qui contiendra le nom du sport du match.
                            var small_sports = document.createElement("small");
                            small_sports.innerHTML = match.nom_sport;
                            container_div.appendChild(small_sports);

                            // * Création du h4 qui contiendra le nombre de participants et le nomber max de participants.
                            var h4_participant = document.createElement("h4");
                            h4_participant.innerHTML = participant_confirme+"/"+match.participant_max;
                            container_div.appendChild(h4_participant);

                            // * Ajout du div contenant le nombre de participants, le nombre max de participants et le sport du match dans la div contenant la l'icone des participants.
                            div_joueur.appendChild(container_div);

                            // * Ajout de la div contenant l'icone des les informations relatifs au participants du match dans la div contenant les informations du match.
                            div_match.appendChild(div_joueur);

                            // * Ajout de la div contenant les informations du match dans la div contenant les matchs.
                            document.getElementById("liste_match").appendChild(div_match);
                        }
                    }
                    // * Envoi de la requête AJAX.
                    xhr1.send();
                }
            }
            // * Envoi de la requête AJAX.
            xhr2.send();

        }
            
    }
    // * Envoi de la requête AJAX.
    xhr.send();

}

// * Fonction qui permet de cliquer sur un match pour rediriger vers la page de détail du match.
function goMatch(id_match){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le joueur est connecté, on redirige vers la page de détail du match en étant connecté.
    if(queryString.get('email') != null){
        window.location.href = "match.html?email="+queryString.get('email')+"&id_match="+id_match;
    }else{
        window.location.href = "match.html?id_match="+id_match;
    }
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