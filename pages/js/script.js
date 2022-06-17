
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
