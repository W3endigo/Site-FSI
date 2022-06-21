// Création du match
$("#formulaire").submit((event) => {
    event.preventDefault();
    if($("#motDePasse").val() == $("#motDePasse2").val()){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1/Site-FSI/pages/php/request.php/joueur?email="+$('#email').val()+"&mdp="+$('#motDePasse').val()+"&prenom="+$('#prenom').val()+"&nom="+$('#nom').val()+"&date_naissance="+$('#anniversaire').val()+"&photo="+$('#image_selected').val()+"&code_insee_ville="+$('#ville').val()+"&frequence="+$('#frequence').val());
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
               
                var validite = xhr.responseText;
                
            }
            if(validite == "true"){

                window.location.href = "http://127.0.0.1/site-FSI/pages/html/profil.html?email="+$('#email').val();

            }else{
                
                console.log("probleme avec la requête : " + validite);
                document.getElementById("email").borderColor="#E30613";
                document.getElementById("mauvaisEmail").style.marginBottom = "0px";
                document.getElementById("mauvaisEmail").style.color="#E30613";
                document.getElementById("mauvaisEmail").style.display="flex";

            }
        }
    }else{
        console.log("Mots de passe différents");
        document.getElementById("motDePasse2").borderColor="#E30613";
        document.getElementById("mauvaisMdp").style.marginBottom = "0px";
        document.getElementById("mauvaisMdp").style.color="#E30613";
        document.getElementById("mauvaisMdp").style.display="flex";
    }
    xhr.send();
    
});

// * Cette fonction permet de récupérer le nom des villes via requête AJAX et de les afficher dans un select.
function getVille(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/creation.html");
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
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/sport");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/creation.html");
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
