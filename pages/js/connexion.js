//Afficher mot de passe

function toggle_mdp() {
    
    if(document.Form.motDePasse.type == "password"){
        document.Form.motDePasse.type="text";
        document.getElementById("voir").style.color = "#2196F3";
    }
    else{
        document.Form.motDePasse.type="password";
        document.getElementById("voir").style.color = "#000000";
    }
    
}





