// * Faire apparaître le menu de connection
function toggle_header() {

    if(document.getElementById("connection_head").style.display == "block") {
        document.getElementById("connection_head").style.display= "none";
    }
    else {
        document.getElementById("connection_head").style.display="block";
    }
}

// * Faire apparaître les îcones du sous-header
function toggle_icons(){
    
        var rect = document.getElementById("header").getBoundingClientRect();
            if(rect.bottom < 0)
                document.getElementById("apparait_index").style.display="flex";
            else
                document.getElementById("apparait_index").style.display="none";

}

// * Change l'apparence du site si le joueur est connecté
function verif_connexion(){
    
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    
    if(queryString.get('email') != null){
        document.getElementById("button1").style.backgroundColor="#337AB7";
        document.getElementById("button1").style.color="#FFFFFF";
        document.getElementById("button1").style.borderWidth="0px";
        document.getElementById("button1").innerHTML="Mes matchs";
        document.getElementById("button2").innerHTML="Mon profil";
        document.getElementById("creer").style.display="flex";
    }
    
    
}

// * permet de cliquer sur un match pour afficher le contenu visible selon la connexion
function goMatch(id_match){

    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "pages/html/match.html?email="+queryString.get('email')+"&id_match="+id_match;
    }else{
        window.location.href = "pages/html/match.html?id_match="+id_match;
    }
}  

// * permet de gérer l'accès à la création d'un match
function goCreate(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "pages/html/creation.html?email="+queryString.get('email');
    }else{
        alert("Vous devez être connecté pour créer un match");
    }
}   

// * permet de rediriger soit vers l'inscription soit vers les matchs du joueur

function goInscriptionMatch(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "pages/html/mesmatchs.html?email="+queryString.get('email');
    }else{
        window.location.href = "pages/html/inscription.html";
    }
}  

// * permet de rediriger soit vers la connexion soit vers le profil d'un joueur
function goConnexionProfil(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "pages/html/profil.html?email="+queryString.get('email');
    }else{
        window.location.href = "pages/html/connexion.html";
    }
}

// * Cette fonction permet de récupérer le nom des villes via requête AJAX et de les afficher dans un select.
function getVille(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pages/php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "pages/html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var villes = JSON.parse(xhr.responseText);
            var select = document.getElementById("villes");
            for(var i = 0; i < villes.length; i++){
                var option = document.createElement("option");
                option.value = villes[i].code_insee_ville;
                option.text = villes[i].nom_ville;
                select.appendChild(option);
            }
        }
    }
    xhr.send();
}

// * Cette fonction permet de récupérer le nom des sports via requête AJAX et de les afficher dans un select.
function getSport(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pages/php/request.php/sport");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "index.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var sports = JSON.parse(xhr.responseText);
            var select = document.getElementById("sports");
            for(var i = 0; i < sports.length; i++){
                var option = document.createElement("option");
                option.value = sports[i].nom_sport;
                option.text = sports[i].nom_sport;
                select.appendChild(option);
            }
        }
    }
    xhr.send();
}

// * permet de naviguer entre les filtres
function selectFiltre(filtre){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    switch(filtre){

        case(1): // * aucun
            document.getElementById("aucun").style.display = "block";

            document.getElementById("villes").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("complet").selectedIndex = 0;

            if(queryString.has('email')){
                window.location.href = "index.html?email="+queryString.get('email');
            }else{
                window.location.href = "index.html?";
            }


            break;

        case(2): // * villes
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

        case(3): // * sports
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

        case(4): // * periode
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

        case(5): // * complet
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

function getMatch(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    switch(queryString.get('type_filtre')){
        case("ville"):
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/matchbyville?code_insee_ville="+queryString.get('value_filtre'));
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    match = JSON.parse(xhr1.responseText);
                    //console.log(match);
                    match.forEach(createDiv);
                }
            }        
            xhr1.send();
            break;

        case("sports"):
                    
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/matchbysport?nom_sport="+queryString.get('value_filtre'));
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    match = JSON.parse(xhr1.responseText);
                    //console.log(match);
                    match.forEach(createDiv);
                }
            }        
            xhr1.send();
            break;
                
        case("periode"):
                    
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/matchbyperiode?periode="+queryString.get('value_filtre'));
               xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    match = JSON.parse(xhr1.responseText);
                    console.log(match);
                    match.forEach(createDiv);
                }
            }        
            xhr1.send();
            break;
                
        case("complet"):

            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/matchbyperiode?periode="+queryString.get('value_filtre'));
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    match = JSON.parse(xhr1.responseText);
                    //console.log(match);
                    match.forEach(createDiv);
                }
            }        
            xhr1.send();
            break;

        default:
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/matchs");
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    match = JSON.parse(xhr1.responseText);
                    //console.log(match);
                    match.forEach(createDiv);
                }
            }        
            xhr1.send();
            break;
    }
}

function createDiv(match){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pages/php/request.php/participants?id_match="+match.id_match);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "pages/php/request.php/ville");
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){

                    var participant_confirme = 0;
                    participant_max = match.participant_max;
                    date = new Date(match.horaire);

                    participants = JSON.parse(xhr.responseText);
                    villes = JSON.parse(xhr1.responseText);

                    for(var i = 0; i < participants.length; i++){
                        if(participants[i].status == 1){
                            participant_confirme++;
                            console.log(participant_confirme);
                        }
                    }

                    for(var i = 0; i < villes.length; i++){
                        if(villes[i].code_insee_ville == match.code_insee_ville){
                            nom_ville = villes[i].nom_ville;
                        }
                    }

                    var div_match = document.createElement("div");
                    div_match.className = "match";
                    div_match.onclick = function(){goMatch(match.id_match);};

                    var div_date = document.createElement("div");
                    div_date.className = "date";

                    var h4_date = document.createElement("h4");
                    h4_date.innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                    div_date.appendChild(h4_date);

                    var h5_heure = document.createElement("div");
                    h5_heure.innerHTML = date.getHours()+":"+date.getMinutes();
                    div_date.appendChild(h5_heure);

                    div_match.appendChild(div_date);

                    var div_titre = document.createElement("div");
                    div_titre.className = "titre_match";

                    var h1_titre = document.createElement("h1");
                    h1_titre.innerHTML = match.titre;
                    div_titre.appendChild(h1_titre);



                    var h3_adresse = document.createElement("h3");
                    h3_adresse.innerHTML = match.adresse+", "+nom_ville;
                    div_titre.appendChild(h3_adresse);

                    div_match.appendChild(div_titre);

                    var div_joueur = document.createElement("div");
                    div_joueur.className = "nb_joueurs";

                    var img_joueur = document.createElement("img");
                    img_joueur.src = "ressources/utilisateur.png";
                    div_joueur.appendChild(img_joueur);

                    var container_div = document.createElement("div");

                    var small_sports = document.createElement("small");
                    small_sports.innerHTML = match.nom_sport;
                    container_div.appendChild(small_sports);

                    var h4_participant = document.createElement("h4");
                    h4_participant.innerHTML = participant_confirme+"/"+match.participant_max;
                    container_div.appendChild(h4_participant);

                    div_joueur.appendChild(container_div);

                    div_match.appendChild(div_joueur);

                    document.getElementById("liste_match").appendChild(div_match);
                }
            }
            xhr1.send();

        }
            
    }
    xhr.send();

}

function chargeJoueur(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.has('email')){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "pages/php/request.php/joueur?email="+queryString.get('email'));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                joueur = JSON.parse(xhr.responseText);
                
                // * Comme le fichier se trouve dans le dossier principal, il faut retirer le début du chemin qui est stocké dans joueur.photo
                document.getElementById("big_user_image").src = joueur.photo.split('/')[2]+"/"+joueur.photo.split('/')[3];
                document.getElementById("user_image").src = joueur.photo.split('/')[2]+"/"+joueur.photo.split('/')[3];
                document.getElementById("username").innerHTML = joueur.nom+" "+joueur.prenom;

            }
        }
        xhr.send();
    }else{
        document.getElementById("big_user_image").src = "ressources/deconnecte.png";
        document.getElementById("username").innerHTML = "Déconnecté";
    }

}

function setFiltre(type = "", value = ""){

    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    // if(type == ""){

    //         if(queryString.has('email')){
    //             window.location.href = "index.html?email="+queryString.get('email');
    //         }else{
    //             window.location.href = "index.html";
    //         }
    // }else{
    if(type == "periode"){
            console.log('voila');
            if(queryString.has('email')){
                window.location.href = "index.html?email="+queryString.get('email')+"&type_filtre="+type+"&value_filtre="+document.getElementById("periode").value;
            }else{
                window.location.href = "index.html?type_filtre="+type+"&value_filtre="+value;
            }
    }else{
        if(queryString.has('email')){
            window.location.href = "index.html?email="+queryString.get('email')+"&type_filtre="+type+"&value_filtre="+value;
        }else{
            window.location.href = "index.html?type_filtre="+type+"&value_filtre="+value;
        }
    }
}