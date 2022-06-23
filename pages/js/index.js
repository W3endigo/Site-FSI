
// * Fonction pour remonter en haut de la page.
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

// * Fonction pour faire apparaître le menu de connection
function toggle_header() {

    if(document.getElementById("connection_head").style.display == "block") {
        document.getElementById("connection_head").style.display= "none";
    }
    else {
        document.getElementById("connection_head").style.display="block";
    }
}

// * Fonction pour faire apparaître les îcones du sous-header
function toggle_icons(){
    
        var rect = document.getElementById("header").getBoundingClientRect();
            if(rect.bottom < 0)
                document.getElementById("apparait_index").style.display="flex";
            else
                document.getElementById("apparait_index").style.display="none";

}

// * Fonction pour changer l'apparence du site si le joueur est connecté
function verif_connexion(){
    
    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    
    // * Si le joueur est connecté, on change les boutons de connexion/inscription en bouton mes matchs/profil.
    if(queryString.get('email') != null){
        document.getElementById("button1").style.backgroundColor="#337AB7";
        document.getElementById("button1").style.color="#FFFFFF";
        document.getElementById("button1").style.borderWidth="0px";
        document.getElementById("button1").innerHTML="Mes matchs";
        document.getElementById("button2").innerHTML="Mon profil";
        document.getElementById("creer").style.display="flex";
    }
}

// * Fonction qui permet de cliquer sur un match pour rediriger vers la page de détail du match.
function goMatch(id_match){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le joueur est connecté, on redirige vers la page de détail du match en étant connecté.
    if(queryString.get('email') != null){
        window.location.href = "pages/html/match.html?email="+queryString.get('email')+"&id_match="+id_match;
    }else{
        window.location.href = "pages/html/match.html?id_match="+id_match;
    }
}  

// * Fonction qui permet de gérer l'accès à la création d'un match
function goCreate(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le joueur est connecté, on redirige vers la page de création d'un match.
    if(queryString.get('email') != null){
        window.location.href = "pages/html/creation.html?email="+queryString.get('email');
    }else{
        alert("Vous devez être connecté pour créer un match");
    }
}   

// * Fonction qui permet de rediriger soit vers l'inscription soit vers les matchs du joueur
function goInscriptionMatch(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le joueur est connecté, on redirige vers la page mes matchs.
    if(queryString.get('email') != null){
        window.location.href = "pages/html/mesmatchs.html?email="+queryString.get('email');
    }else{
        window.location.href = "pages/html/inscription.html";
    }
}  

// * Fonction qui permet de rediriger soit vers la connexion soit vers le profil d'un joueur
function goConnexionProfil(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le joueur est connecté, on redirige vers la page profil.
    if(queryString.get('email') != null){
        window.location.href = "pages/html/profil.html?email="+queryString.get('email');
    }else{
        window.location.href = "pages/html/connexion.html";
    }
}

// * Fonction qui permet de récupérer le nom des villes via requête AJAX et de les afficher dans un select.
function getVille(){

    // * Préparation de la requête AJAX.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pages/php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "pages/html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            var villes = JSON.parse(xhr.responseText);
            var select = document.getElementById("villes");

            // * Ajout des options de villes dans le select.
            for(var i = 0; i < villes.length; i++){
                var option = document.createElement("option");
                option.value = villes[i].code_insee_ville;
                option.text = villes[i].nom_ville;
                select.appendChild(option);
            }
        }
    }
    // * Envoi de la requête.
    xhr.send();
}

// * Fonction qui permet de récupérer le nom des sports via requête AJAX et de les afficher dans un select.
function getSport(){

    // * Préparation de la requête AJAX.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pages/php/request.php/sport");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "index.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            var sports = JSON.parse(xhr.responseText);
            var select = document.getElementById("sports");

            // * Ajout des options de sports dans le select.
            for(var i = 0; i < sports.length; i++){
                var option = document.createElement("option");
                option.value = sports[i].nom_sport;
                option.text = sports[i].nom_sport;
                select.appendChild(option);
            }
        }
    }
    // * Envoi de la requête.
    xhr.send();
}

// * Fonction qui permet de naviguer entre les filtres
function selectFiltre(filtre){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Selon le filtre sélectionné, on affiche les filtres correspondants.
    switch(filtre){

        // * Si le filtre est "Aucun".
        case(1): 

            // * On cache les filtres.
            document.getElementById("aucun").style.display = "block";

            document.getElementById("villes").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("complet").selectedIndex = 0;

            // * Redirection vers la page d'accueil sans filtre. Si le joueur est connecté, garde la connextion durant la redirection.
            if(queryString.has('email')){
                window.location.href = "index.html?email="+queryString.get('email');
            }else{
                window.location.href = "index.html?";
            }
            break;

        // * Si le filtre est "Ville".
        case(2): 

            // * On cache les filtres autres que le filtre "Ville".
            document.getElementById("villes").style.display = "block";

            document.getElementById("aucun").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("aucun").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("complet").selectedIndex = 0;
            break;

        // * Si le filtre est "Sport".
        case(3): 

            // * On cache les filtres autres que le filtre "Sport".
            document.getElementById("sports").style.display = "block";
            document.getElementById("villes").style.display = "none";
            document.getElementById("aucun").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("aucun").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("complet").selectedIndex = 0;
            break;

        // * Si le filtre est "Période".
        case(4):

            // * On cache les filtres autres que le filtre "Période".
            document.getElementById("periode").style.display = "block";

            document.getElementById("villes").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("aucun").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("aucun").selectedIndex = 0;
            document.getElementById("complet").selectedIndex = 0;
            break;

        // * Si le filtre est "Complet".
        case(5):

            // * On cache les filtres autres que le filtre "Complet".
            document.getElementById("complet").style.display = "block";
            document.getElementById("complet").selectedIndex = 0;

            document.getElementById("villes").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("aucun").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("aucun").selectedIndex = 0;
            break;
    }
}

// * Fonction qui permet de récupérer les informations des matchs en prenant compte du filtre via requête AJAX et de les afficher.
function getMatch(){

    // * Préparation à la récupération des informations dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Récupération des informations du filtre.
    switch(queryString.get('type_filtre')){

        // * Si le filtre est "Ville".
        case("ville"):

            // * Préparation de la requête AJAX pour récupérer les matchs filtrés par ville.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "pages/php/request.php/matchbyville?code_insee_ville="+queryString.get('value_filtre'));
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    // * Récupération des données et envoie à la fonction qui permet d'afficher les matchs.
                    match = JSON.parse(xhr1.responseText);
                    match.forEach(createDiv);
                }
            }      
            // * Envoie de la requête AJAX.  
            xhr1.send();
            break;

        // * Si le filtre est "Sport".
        case("sports"):
            
            // * Préparation de la requête AJAX pour récupérer les matchs filtrés par sport.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "pages/php/request.php/matchbysport?nom_sport="+queryString.get('value_filtre'));
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    // * Récupération des données et envoie à la fonction qui permet d'afficher les matchs.
                    match = JSON.parse(xhr1.responseText);
                    match.forEach(createDiv);
                }
            }    
            // * Envoie de la requête AJAX.    
            xhr1.send();
            break;
                
        // * Si le filtre est "Période".
        case("periode"):
                    
            // * Préparation de la requête AJAX pour récupérer les matchs filtrés par période.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "pages/php/request.php/matchbyperiode?periode="+queryString.get('value_filtre'));
               xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    // * Récupération des données et envoie à la fonction qui permet d'afficher les matchs.
                    match = JSON.parse(xhr1.responseText);
                    match.forEach(createDiv);
                }
            }     
            // * Envoie de la requête AJAX.   
            xhr1.send();
            break;
                
        // * Si le filtre est "Complet".
        case("complet"):

            // * Préparation de la requête AJAX pour récupérer les matchs filtrés par complet.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "pages/php/request.php/matchbycomplet?complet="+queryString.get('value_filtre'));
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    // * Récupération des données et envoie à la fonction qui permet d'afficher les matchs.
                    match = JSON.parse(xhr1.responseText);
                    match.forEach(createDiv);
                }
            }     
            // * Envoie de la requête AJAX.   
            xhr1.send();
            break;

        default:

            // * Préparation de la requête AJAX pour récupérer les matchs sans filtre.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "pages/php/request.php/matchs");
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    // * Récupération des données et envoie à la fonction qui permet d'afficher les matchs.
                    match = JSON.parse(xhr1.responseText);
                    match.forEach(createDiv);
                }
            }
            // * Envoie de la requête AJAX.  
            xhr1.send();
            break;
    }
}

// * Fonction qui permet de créer les divs des matchs qui ne sont pas terminés pour les afficher.
function createDiv(match){
    if(match.termine != 1){

    // * Préparation de la requête AJAX pour récupérer les informations des participants du match.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pages/php/request.php/participants?id_match="+match.id_match);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Préparation de la requête AJAX pour récupérer les informations des villes afin de convertir le code INSEE en nom de ville.
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "pages/php/request.php/ville");
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    var participant_confirme = 0;
                    participant_max = match.participant_max;
                    date = new Date(match.horaire);

                    // * Récupération des données.
                    participants = JSON.parse(xhr.responseText);
                    villes = JSON.parse(xhr1.responseText);

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

                    // * Création du h5 qui contiendra l'heure du match.
                    var h5_heure = document.createElement("div");
                    h5_heure.innerHTML = date.getHours()+":"+date.getMinutes();
                    div_date.appendChild(h5_heure);

                    // * Création de l'image indiquant la propriété ou non du match, on vérifie d'abord si le joueur est créateur.
                    let paramString = window.location.href.split('?')[1];
                    let queryString = new URLSearchParams(paramString);
                    if(queryString.get('email') != null && queryString.get('email') == match.email){
                        var couronne = document.createElement("img");
                        couronne.className = "couronne";
                        couronne.src = "ressources/couronne.png";
                        div_date.appendChild(couronne);
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

                    // * Ajout de la div contenant le titre et l'adresse du match dans la div contenant les informations du match.
                    div_match.appendChild(div_titre);

                    // * Création de la div qui contiendra le nombre de participants.
                    var div_joueur = document.createElement("div");
                    div_joueur.className = "nb_joueurs";

                    // * Création de l'img qui contiendra l'image du nombre de participants.
                    var img_joueur = document.createElement("img");
                    img_joueur.src = "ressources/utilisateur.png";
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
    xhr.send();

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
        xhr.open("GET", "pages/php/request.php/joueur?email="+queryString.get('email'));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){

                // * Récupération des informations du joueur.
                joueur = JSON.parse(xhr.responseText);
                
                // * Comme le fichier se trouve dans le dossier principal, il faut retirer le début du chemin qui est stocké dans joueur.photo
                document.getElementById("big_user_image").src = joueur.photo.split('/')[2]+"/"+joueur.photo.split('/')[3];
                document.getElementById("user_image").src = joueur.photo.split('/')[2]+"/"+joueur.photo.split('/')[3];
                document.getElementById("username").innerHTML = joueur.nom+" "+joueur.prenom;

            }
        }
        // * Envoi de la requête AJAX.
        xhr.send();

    // * Si le joueur n'est pas connecté, on affiche une image de profil par défaut.
    }else{
        document.getElementById("big_user_image").src = "ressources/deconnecte.png";
        document.getElementById("username").innerHTML = "Déconnecté";
    }

}

// * Fonction qui permet de sauvegarder le type et la valeur du filtre dans l'URL.
function setFiltre(type = "", value = ""){

    // * Préparation de la récupération des informations de l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // * Si le filtre est "Période".
    if(type == "periode"){

            // * Si l'utilisateur est connecté
            if(queryString.has('email')){

                // * Rechargement de la page avec les information du filtre et de connection dans l'URL.
                window.location.href = "index.html?email="+queryString.get('email')+"&type_filtre="+type+"&value_filtre="+document.getElementById("periode").value;
            }else{

                // * Rechargement de la page avec les information du filtre.
                window.location.href = "index.html?type_filtre="+type+"&value_filtre="+value;
            }

    // * Pour tout les autres filtres.
    }else{

        // * Si l'utilisateur est connecté
        if(queryString.has('email')){

            // * Rechargement de la page avec les information du filtre et de connection dans l'URL.
            window.location.href = "index.html?email="+queryString.get('email')+"&type_filtre="+type+"&value_filtre="+value;
        }else{

            // * Rechargement de la page avec les information du filtre.
            window.location.href = "index.html?type_filtre="+type+"&value_filtre="+value;
        }
    }
}