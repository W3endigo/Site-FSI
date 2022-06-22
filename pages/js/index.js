// * Faire apparaître le menu de connection

function toggle_header() {

    if(document.getElementById("connection_head").style.display == "block") {
        document.getElementById("connection_head").style.display= "none";
    }
    else {
        document.getElementById("connection_head").style.display="block";
    }
}

// * Faire apparaître les îcones du sous-header

function toggle_icons(){
    
        var rect = document.getElementById("header").getBoundingClientRect();
            if(rect.bottom < 0)
                document.getElementById("apparait_index").style.display="flex";
            else
                document.getElementById("apparait_index").style.display="none";

}

// * Change l'apparence du site si le joueur est connecté

function verif_connexion(){
    
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    
    if(queryString.get('email') != null){
        document.getElementById("button1").style.backgroundColor="#337AB7";
        document.getElementById("button1").style.color="#FFFFFF";
        document.getElementById("button1").style.borderWidth="0px";
        document.getElementById("button1").innerHTML="Mes matchs";
        document.getElementById("button2").innerHTML="Mon profil";
        document.getElementById("username").style.display="flex";

        document.getElementById("big_user_image").src="ressources/femme.png";
        document.getElementById("user_image").src="ressources/femme.png";
        
        document.getElementById("creer").style.display="flex";
    }
    
    
}



// * permet de cliquer sur un match pour afficher le contenu visible selon la connexion


function ouvrir_match(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../Site-FSI/pages/html/match.html?email="+queryString.get('email');
    }else{
        window.location.href = "../Site-FSI/pages/html/match.html";
    }
}  






// * permet de gérer l'accès à la création d'un match

function goCreate(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../Site-FSI/pages/html/creation.html?email="+queryString.get('email');
    }else{
        alert("Vous devez être connecté pour créer un match");
    }
}   

// * permet de rediriger soit vers l'inscription soit vers les matchs du joueur

function goInscriptionMatch(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../Site-FSI/pages/html/mesmatchs.html?email="+queryString.get('email');
    }else{
        window.location.href = "../Site-FSI/pages/html/inscription.html";
    }
}  



// * permet de rediriger soit vers la connexion soit vers le profil d'un joueur

function goConnexionProfil(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../Site-FSI/pages/html/profil.html?email="+queryString.get('email');
    }else{
        window.location.href = "../Site-FSI/pages/html/connexion.html";
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
            var select = document.getElementById("villes");
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
function getSport(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/sport");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/index.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var sports = JSON.parse(xhr.responseText);
            var select = document.getElementById("sports");
            for(var i = 0; i < villes.length; i++){
                var option = document.createElement("option");
                option.value = sports[i].nom_sport;
                option.text = sports[i].nom_sport;
                select.appendChild(option);
            }
        }
    }
    xhr.send();
}











// * permet de naviguer entre les filtres

//
function selectFiltre(filtre){
    switch(filtre){

        case(1): // * aucun
            document.getElementById("aucun").style.display = "block";

            document.getElementById("villes").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("complet").selectedIndex = 0;
            break;

        case(2): // * villes
        document.getElementById("villes").style.display = "block";

            document.getElementById("aucun").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("aucun").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("complet").selectedIndex = 0;
            break;

        case(3): // * sports
        document.getElementById("sports").style.display = "block";

            document.getElementById("villes").style.display = "none";
            document.getElementById("aucun").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("aucun").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("complet").selectedIndex = 0;
            break;

        case(4): // * periode
        document.getElementById("periode").style.display = "block";

            document.getElementById("villes").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("aucun").style.display = "none";
            document.getElementById("complet").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("aucun").selectedIndex = 0;
            document.getElementById("complet").selectedIndex = 0;
            break;

        case(5): // * complet
        document.getElementById("complet").style.display = "block";
        document.getElementById("complet").selectedIndex = 0;

            document.getElementById("villes").style.display = "none";
            document.getElementById("sports").style.display = "none";
            document.getElementById("periode").style.display = "none";
            document.getElementById("aucun").style.display = "none";

            document.getElementById("villes").selectedIndex = 0;
            document.getElementById("sports").selectedIndex = 0;
            document.getElementById("periode").value = 0;
            document.getElementById("aucun").selectedIndex = 0;
            break;
    }
}