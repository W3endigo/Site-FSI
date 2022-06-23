// * Une fois la checkbox validée, le créateur peut annuler le match

function activer_annuler() {

    if(document.getElementById("bouton_annuler").disabled == false)
        document.getElementById("bouton_annuler").disabled=true;
    else
        document.getElementById("bouton_annuler").disabled=false;
}



// * Modifie la page selon la connexion
function verif_connexion(){

    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    if(queryString.get('email') != null){
        document.getElementById("inscription").style.display="block";
    }


}





function getMatch(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/matchbyid?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "../php/request.php/ville");
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    match = JSON.parse(xhr.responseText);
                    villes = JSON.parse(xhr1.responseText);
                    console.log(match);
                    console.log(villes);

                    for(var i = 0; i < villes.length; i++){
                        if(villes[i].code_insee_ville == match.code_insee_ville){
                            nom_ville = villes[i].nom_ville;
                        }
                    }

                    date = new Date(match.horaire);
                    participant_max = match.participant_max;

                    document.getElementById("date").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                    document.getElementById("heure").innerHTML = date.getHours()+":"+date.getMinutes();
                    document.getElementById("titre").innerHTML = match.titre;
                    document.getElementById("adresse").innerHTML = match.adresse+", "+nom_ville;
                    document.getElementById("sport").innerHTML = match.nom_sport;
                    document.getElementById("description_match").innerHTML = match.description;

                    if(match.prix != 0){
                        document.getElementById("prix").innerHTML = "Une participation de "+match.prix+"€ vous sera demandé au début du match.";
                    }else{
                        document.getElementById("prix").innerHTML = "Ce match est gratuit !";

                    }

                    var xhr2 = new XMLHttpRequest();
                    xhr2.open("GET", "../php/request.php/participants?id_match="+queryString.get('id_match'));
                    xhr2.onreadystatechange = function(){
                        if(xhr2.readyState == 4 && xhr2.status == 200){
                            participants = JSON.parse(xhr2.responseText);
                            participant_accepte = 0;

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
                                if(participants[i].status == 1){
                                    participant_accepte += 1;
                                }
                            }

                            document.getElementById("participant").innerHTML = participant_accepte+"/"+participant_max;

                        }
                    }
                    xhr2.send();
                }
            }
            xhr1.send();
        }
    }
    xhr.send();

}


function getOrganisateur(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/matchbyid?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
    
        if(xhr.readyState == 4 && xhr.status == 200){
            match = JSON.parse(xhr.responseText);

            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "../php/request.php/joueur?email="+match.email);
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    organisateur_fiche = JSON.parse(xhr1.responseText);

                    document.getElementById("createur").src = organisateur_fiche.photo;
                    document.getElementById("createur_nom").innerHTML = organisateur_fiche.prenom+" "+organisateur_fiche.nom;
                    document.getElementById("createur_email").innerHTML = match.email;
                }
            }
            xhr1.send();


            // * On vérifie si l'utilisateur est l'organisateur du match
            if(queryString.get('email') == match.email){
                console.log("passe true");
                document.getElementById("annuler").style.display="flex";
                document.getElementById("cloture").style.display="block";
                boutons = document.getElementsByClassName("petits_boutons");
                console.log(boutons);
                for(let i = 0; i < boutons.length; i++)
                    boutons[i].style.display="block";
            
            }
        }
    }
    
    xhr.send();
}



function getParticipantsAffichage(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/participants?id_match="+queryString.get('id_match'));

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            participants = JSON.parse(xhr.responseText);
            participants.forEach(createDiv); // * On crée les divs pour chaque participant
            getOrganisateur(); // * On affiche maintenant les informations liées à l'organisateur

        }

    }
    xhr.send();
}


function createDiv(participant){
    var participants_div = document.getElementById("participants");
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "../php/request.php/joueur?email="+participant.email);

    xhr1.onreadystatechange = function(){
        if(xhr1.readyState == 4 && xhr1.status == 200){
            joueur = JSON.parse(xhr1.responseText);

            var div = document.createElement("div");
            div.class = "d-flex flex-row";

            var img = document.createElement("img");
            img.src = joueur.photo;
            div.appendChild(img);

            var h5 = document.createElement("h5");
            h5.textContent = joueur.prenom+" "+joueur.nom;
            div.appendChild(h5);
            participants_div.appendChild(div);
        }
    }
    xhr1.send();

}


function inscription(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    var xhr = new XMLHttpRequest();
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

}

// * Fonction permettant de revenir au menu en restant connecté
function goHome(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../../index.html?email="+queryString.get('email');
    }else{
        window.location.href = "../../index.html";
    }
}

function getParticipants(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/participants?id_match="+queryString.get('id_match'));

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var participants = JSON.parse(xhr.responseText);
            var select = document.getElementById("meilleur_joueur");
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
    xhr.send();
}

function supprimerMatch(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "../php/request.php/match?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            alert("Match supprimé");
            if(queryString.get('email') != null){
                window.location.href = "../../index.html?email="+queryString.get('email');
            }else{
                window.location.href = "../../index.html";
            }
        }
    }
    xhr.send();
}

function cloturerMatch(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "../php/request.php/match?id_match="+queryString.get('id_match')+"&score_home="+$("#score_home").val()+"&score_away="+$("#score_away").val()+"&email_joueur="+$("#meilleur_joueur").val());
       xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            if(JSON.parse(xhr.responseText) == true){
                console.log("Match cloturé");
            }else{
                console.log("Erreur lors de la cloture du match");
                console.log(JSON.parse(xhr.responseText));
            }

        }
    }
    xhr.send();
}