
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
                document.getElementById("apparait_index").style.display="flex";
            else
                document.getElementById("apparait_index").style.display="none";

}

//Change l'apparence du site si le joueur est connecté

function verif_connexion(){
    
    var connexion = 1;
    
    if(connexion == 1){
        document.getElementById("button1").style.backgroundColor="#337AB7";
        document.getElementById("button1").style.color="#FFFFFF";
        document.getElementById("button1").style.borderWidth="0px";
        document.getElementById("button1").innerHTML="Mes matchs";
        document.getElementById("button2").innerHTML="Mon profil";
        document.getElementById("username").style.display="flex";
        document.getElementById("user_image").style.maxWidth="80%";
        document.getElementById("user_image").src="ressources/femme.png"
        
        document.getElementById("a2").href="pages/html/profil.html";
        document.getElementById("a1").href="pages/html/mesmatchs.html";
    }
    
    
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

//Envoie les données
function envoi(){}



//Afficher mot de passe

function toggle_mdp() {
    
    if(document.Form.motDePasse.type == "password"){
        document.Form.motDePasse.type="text";
        document.getElementById("voir").style.color = "#2196F3";
        if(document.Form.motDePasse2)
            document.Form.motDePasse2.type="text";
    }
    else{
        document.Form.motDePasse.type="password";
        document.getElementById("voir").style.color = "#000000";
        if(document.Form.motDePasse2)
            document.Form.motDePasse2.type="password";
    }
    
}




//Permettre de modifier les informations dans le profil


function modifier_profil(){
    
    var elements = document.getElementsByClassName("info_profil");
    
    if(elements[0].disabled == true){
        document.getElementById("modifieur").src="../../ressources/greypen.png";
        for(var x =0; x < elements.length; x++)
            elements[x].disabled=false;
    }
    else {
        document.getElementById("modifieur").src="../../ressources/pen.png";
        for(var x =0; x < elements.length; x++)
            elements[x].disabled=true;
        
    }
}

