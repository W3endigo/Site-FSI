// * Permet de cliquer sur un match 

function ouvrir_match(){

    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../html/match.html?email="+queryString.get('email');
    }else{
        window.location.href = "../html/match.html";
    }
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




 // * Cette fonction permet de récupérer les informations du joueur via requête AJAX et de les afficher dans le profil.
 function getJoueur(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/joueur?email="+queryString.get('email'));
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var joueur = JSON.parse(xhr.responseText);
            document.getElementById("user_image").src = joueur.photo;        
        }
    }
    xhr.send();
}
