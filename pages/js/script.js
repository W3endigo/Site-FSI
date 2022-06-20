
//Faire apparaître le menu de connection

function toggle_header() {

    if(document.getElementById("connection_head").style.display == "block") {
        document.getElementById("connection_head").style.display= "none";
    }
    else {
        document.getElementById("connection_head").style.display="block";
    }
}

//Faire apparaître les îcones du sous-header

function toggle_icons(){
    
        var rect = document.getElementById("header").getBoundingClientRect();
            if(rect.bottom < 0)
                document.getElementById("apparait").style.display="flex";
            else
                document.getElementById("apparait").style.display="none";

}


//Vérification du mot de passe 

function validation(){
    if( document.Form.motDePasse.value == document.Form.motDePasse2.value){
        return(true);
    }
    else{
        document.Form.motDePasse2.style.borderColor="#E30613";
        document.getElementById("mauvaisMdp").style.marginBottom = "0px";
        document.getElementById("mauvaisMdp").style.color="#E30613";
        document.getElementById("mauvaisMdp").style.display="flex";
        return(false);
    }
}


//Afficher mot de passe

function toggle_mdp() {
    
    if(document.Form.motDePasse.type == "password"){
        document.Form.motDePasse.type="text";
        document.Form.motDePasse2.type="text";
        document.getElementById("voir").style.color = "#2196F3";
    }
    else{
        document.Form.motDePasse.type="password";
        document.Form.motDePasse2.type="password";
        document.getElementById("voir").style.color = "#000000";
    }
    
}

// * Cette fonction permet de récupérer le nom des villes via requête AJAX et de les afficher dans un select.
function getVille(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
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

// * Cette fonction permet de récupérer les fréquences via requête AJAX et de les afficher dans un select.
function getFrequence(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/frequence");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var frequence = JSON.parse(xhr.responseText);
            var select = document.getElementById("frequence");
            for(var i = 0; i < frequence.length; i++){
                var option = document.createElement("option");
                option.value = frequence[i].frequence_sport;
                option.text = frequence[i].frequence_sport;
                select.appendChild(option);
            }
        }
    }
    xhr.send();
}

