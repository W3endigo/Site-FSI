//Vérification du mot de passe 

function validation(){
    if( document.getElementById("motDePasse").value == document.Form.motDePasse2.value){
        return(true);
    }
    else{
        document.getElementById("motDePasse2").borderColor="#E30613";
        document.getElementById("mauvaisMdp").style.marginBottom = "0px";
        document.getElementById("mauvaisMdp").style.color="#E30613";
        document.getElementById("mauvaisMdp").style.display="flex";
        return(false);
    }
}

//Envoie les données
function envoi(){}



//Afficher mot de passe

function toggle_mdp() {
    
    if(document.getElementById("motDePasse").type == "password"){
        document.getElementById("motDePasse").type="text";
        document.getElementById("voir").style.color = "#2196F3";
        document.getElementById("motDePasse2").type="text";
    }
    else{
        document.getElementById("motDePasse").type="password";
        document.getElementById("voir").style.color = "#000000";
        document.getElementById("motDePasse2").type="password";
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
