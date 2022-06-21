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

        document.getElementById("big_user_image").style.maxWidth="80%";
        document.getElementsByClassName("user_image")[1].style.maxWidth="80%";
        document.getElementById("big_user_image").src="ressources/femme.png";
        document.getElementsByClassName("user_image")[1].src="ressources/femme.png";
        
        document.getElementById("creer").style.display="flex";
        
        document.getElementById("a2").href="pages/html/profil.php";
        document.getElementById("a1").href="pages/html/mesmatchs.php";
    }
    
    
}



// * permet de cliquer sur un match

function ouvrir_match(){
    window.location.href = "pages/html/match.html";
}

function goCreate(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../Site-FSI/pages/html/creation.html?email="+queryString.get('email');
    }else{
        alert("Vous devez être connecté pour créer un match");
    }
}   