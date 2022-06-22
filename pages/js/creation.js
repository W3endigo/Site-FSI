// Création du match regarde si le min est inférieur au maximum
$("#formulaire").submit((event) => {
    console.log("submit");
    event.preventDefault();
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/request.php/match?titre="+$('#nom').val()+"&horaire="+$('#debut').val()+"&duree="+$('#duree').val()+"&description="+$('#description').val()+"&participant_min="+$('#min').val()+"&participant_max="+$('max').val()+"&prix="+$('#prix').val()+"&adresse="+$('#adresse').val()+"&code_insee_ville="+$('#ville').val()+"&nom_sport="+$('#sport').val()+"&email_organisateur="+queryString.get('email'));
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
               
            var validite = xhr.responseText;
            console.log(validite);
                
        }
        if(validite != false){


            window.location.href = "../html/match.html?email="+queryString.get('email')+"&id_match="+validite;

        }

    }
    xhr.send();
    
})

// * Cette fonction permet de récupérer le nom des villes via requête AJAX et de les afficher dans un select.
function getVille(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/creation.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var villes = JSON.parse(xhr.responseText);
            var select = document.getElementById("ville");
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
function getSports(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/sport");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/creation.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var sports = JSON.parse(xhr.responseText);
            var select = document.getElementById("sport");
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

function goHome(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../../index.html?email="+queryString.get('email');
    }else{
        window.location.href = "../../index.html";
    }
}   

function goProfil(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    window.location.href = "../html/profil.html?email="+queryString.get('email');
}   
