// * Lorque le formulaire d'inscription est envoyé, les données sont géré par cette fonction
$("#formulaire").submit((event) => {
    event.preventDefault();

    // * Vérification de des mots de passe.
    if($("#motDePasse").val() == $("#motDePasse2").val()){

        // * Préparation de la requête AJAX.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../php/request.php/joueur?email="+$('#email').val()+"&mdp="+$('#motDePasse').val()+"&prenom="+$('#prenom').val()+"&nom="+$('#nom').val()+"&date_naissance="+$('#anniversaire').val()+"&photo="+$('#image_selected').val()+"&code_insee_ville="+$('#ville').val()+"&frequence="+$('#frequence').val());
        xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
               
                var validite = xhr.responseText;
                
            }
            // * Si la requête AJAX a réussi, on redirige l'utilisateur vers la page du match.
            if(validite == "true"){

                window.location.href = "../html/profil.html?email="+$('#email').val();

            // * Sinon, on affiche un message d'erreur.
            }else{
                
                console.log("probleme avec la requête : " + validite);
                document.getElementById("email").borderColor="#E30613";
                document.getElementById("mauvaisEmail").style.marginBottom = "0px";
                document.getElementById("mauvaisEmail").style.color="#E30613";
                document.getElementById("mauvaisEmail").style.display="flex";

            }
        }
    // * Si les mots de passe ne sont pas identiques, on affiche un message d'erreur.
    }else{
        console.log("Mots de passe différents");
        document.getElementById("motDePasse2").borderColor="#E30613";
        document.getElementById("mauvaisMdp").style.marginBottom = "0px";
        document.getElementById("mauvaisMdp").style.color="#E30613";
        document.getElementById("mauvaisMdp").style.display="flex";
    }
    xhr.send();
});

// * Fonction qui permet de passer d'une image de profil à une autre.
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


// * Cette fonction permet de voir les caractère dans le champ "motDePasse" si les caractère sont caché et inversement.
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

    // * Préparation de la requête AJAX.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            var villes = JSON.parse(xhr.responseText);
            var select = document.getElementById("ville");

            // * Pour chaque ville, on crée une option dans le select.
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

// * Cette fonction permet de récupérer les fréquences via requête AJAX et de les afficher dans un select.
function getFrequence(){

    // * Préparation de la requête AJAX.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/frequence");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){

            // * Récupération des données.
            var frequence = JSON.parse(xhr.responseText);
            var select = document.getElementById("frequence");

            // * Pour chaque fréquence, on crée une option dans le select.
            for(var i = 0; i < frequence.length; i++){
                var option = document.createElement("option");
                option.value = frequence[i].frequence_sport;
                option.text = frequence[i].frequence_sport;
                select.appendChild(option);
            }
        }
    }
    // * Envoi de la requête AJAX.
    xhr.send();
}
