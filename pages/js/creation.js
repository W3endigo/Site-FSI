

// * Formulaire permettant la création d'un match.
$("#formulaire").submit((event) => {
    event.preventDefault();

    // * On vérifie que le nombre minimum de joueurs soit bien infériuer au nombre maximum de joueurs.
    if( parseFloat($("#min").val()) < parseFloat($("#max").val())){
        alert("Le minimum doit être inférieur au maximum.");
    }else{

        // * Formattage de la date
        datetime = $('#date').val()+" "+$('#debut').val()+":00";

        // * Préparation à la récupération des données dans l'URL.
        let paramString = window.location.href.split('?')[1];
        let queryString = new URLSearchParams(paramString);

        // * Préparation de la requête AJAX.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../php/request.php/match?titre="+$('#nom').val()+"&horaire="+datetime+"&duree="+$('#duree').val()+"&description="+$('#description').val()+"&participant_min="+$('#min').val()+"&participant_max="+$('#max').val()+"&prix="+$('#prix').val()+"&adresse="+$('#adresse').val()+"&code_insee_ville="+$('#ville').val()+"&nom_sport="+$('#sport').val()+"&email_organisateur="+queryString.get('email'));
        xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                
                var validite = xhr.responseText;
                    
            }

            // * Si la requête AJAX a réussi, on redirige vers la page du match créé.
            if(validite != false){ 
                window.location.href = "../html/match.html?email="+queryString.get('email')+"&id_match="+validite;

            }

        }
        // * Envoi de la requête AJAX.
        xhr.send();
    }  
})

// * Cette fonction permet de récupérer le nom des villes via requête AJAX et de les afficher dans un select.
function getVille(){

    // * Préparation de la requête AJAX.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/creation.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            var villes = JSON.parse(xhr.responseText);
            var select = document.getElementById("ville");

            // * Création d'une option pour chaque ville.
            for(var i = 0; i < villes.length; i++){
                var option = document.createElement("option");
                option.value = villes[i].code_insee_ville;
                option.text = villes[i].nom_ville;
                select.appendChild(option);
            }
        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}


// * Cette fonction permet de récupérer le nom des sports via requête AJAX et de les afficher dans un select.
function getSports(){

    // * Préparation de la requête AJAX.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/sport");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/creation.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            var sports = JSON.parse(xhr.responseText);
            var select = document.getElementById("sport");

            // * Création d'une option pour chaque sport.
            for(var i = 0; i < sports.length; i++){
                var option = document.createElement("option");
                option.value = sports[i].nom_sport;
                option.text = sports[i].nom_sport;
                select.appendChild(option);
            }
        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}

// * Cette fonction permet de récupérer les informations du joueur via requête AJAX et de les afficher dans le profil.
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



// * Fonction permettant de revenir au menu en restant connecté (si on est connecté).
function goHome(){

    // * Préparation à la récupération des données dans l'URL.
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    if(queryString.get('email') != null){
        window.location.href = "../../index.html?email="+queryString.get('email');
    }else{
        window.location.href = "../../index.html";
    }
}   

// * Fonction permettant d'aller vers son profil.
function goProfil(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    window.location.href = "../html/profil.html?email="+queryString.get('email');
}   
