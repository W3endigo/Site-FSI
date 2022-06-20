// Inscription
$("#formulaire").submit((event) => {
    event.preventDefault();
    if($("#motDePasse").val() == $("#motDePasse2").val()){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1/Site-FSI/pages/php/request.php/joueur?email="+$('#email').val()+"&mdp="+$('#motDePasse').val()+"&prenom="+$('#prenom').val()+"&nom="+$('#nom').val()+"&date_naissance="+$('#anniversaire').val()+"&photo=/img/homme.png&code_insee_ville="+$('#ville').val()+"&frequence="+$('#frequence').val());
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
               
                var validite = xhr.responseText;
                
            }
            if(validite == "true"){

                window.location.href = "http://127.0.0.1/site-FSI/pages/html/profil.html?email=" + $("#email").val();

            }else{
                
                console.log("probleme avec la requête.");
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
});
//Changement d'image


function toggle_image() {   
    
    if(document.getElementById("image_selected").value == "../../ressources/homme.png"){
        document.getElementById("form_image").src = "../../ressources/femme.png";
        document.getElementById("image_selected").value = "../../ressources/femme.png";
    }
    else{
        document.getElementById("form_image").src = "../../ressources/homme.png";
        document.getElementById("image_selected").value = "../../ressources/homme.png";
    }
}


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
