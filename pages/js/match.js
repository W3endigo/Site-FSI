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
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/matchbyid?id_match="+queryString.get('id_match'));
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

            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/participants?id_match="+queryString.get('id_match'));
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
                                    console.log('erreur dans la recherche de status');
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

function getOrganisateur(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/matchbyid?id_match="+queryString.get('id_match'));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            match = JSON.parse(xhr.responseText);

            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/joueur?email="+match.email);
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
    }        
    xhr.send();

}

function getParticipants(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/participants?id_match="+queryString.get('id_match'));

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            participants = JSON.parse(xhr.responseText);
            //for(var i = 0; i < participants.length; i++){
            participants.forEach(createDiv);

        }

    }
    xhr.send();
}


function createDiv(participant){
    var participants_div = document.getElementById("participants");
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/joueur?email="+participant.email);

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
            if(participant.status == 0){}
                
        }
    }
    xhr1.send();

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