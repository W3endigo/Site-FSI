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

        document.getElementById("annuler").style.display="flex";
        document.getElementById("cloture").style.display="block";
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
            match = JSON.parse(xhr.responseText);
            date = new Date(match.horaire);
            participant_max = match.participant_max;

            document.getElementById("date").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            document.getElementById("heure").innerHTML = date.getHours()+":"+date.getMinutes();
            document.getElementById("titre").innerHTML = match.titre;
            document.getElementById("adresse").innerHTML = match.adresse;
            document.getElementById("sport").innerHTML = match.nom_sport;

            if(match.prix != 0){
                document.getElementById("prix").innerHTML = "Une participation de "+match.prix+"€ vous sera demandé au début du match.";
            }else{
                document.getElementById("prix").innerHTML = "Ce match est gratuit !";

            }

            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "../php/request.php/participants?id_match="+queryString.get('id_match'));
            xhr1.onreadystatechange = function(){
                if(xhr1.readyState == 4 && xhr1.status == 200){
                    participants = JSON.parse(xhr1.responseText);
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
            xhr1.send();
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
            //for(var i = 0; i < participants.length; i++){
            participants.forEach(createDiv);
            console.log(participants);
            getOrganisateur();

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
            if(participant.status == 0){
                article = document.createElement("article");
                article.className = "petits_boutons";
                article.innerHTML = "<button type='button' class='btn btn-success'> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check2-circle' viewBox='0 0 16 16'>  <path d='M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z'></path><path d='M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z'></path></svg>Accepter</button><button type='button' class='btn btn-outline-danger'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' class='bi bi-x' viewBox='0 0 16 16'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'></path></svg>Refuser</button>";
                participants_div.appendChild(article);
            }

        }
    }
    xhr1.send();

}


function getOrganisateur(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/matchbyid?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            match = JSON.parse(xhr.responseText);

            if(queryString.get('email') == match.email){
                boutons = document.getElementsByClassName("petits_boutons");
                //alert(boutons.length);
                for(let i = 0; i < boutons.length; i++){
                    boutons[i].style.display="flex";
                }
                console.log(boutons);
            }
            }


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

        }
    
    xhr.send();
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
            for(var i = 0; i < frequence.length; i++){
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

