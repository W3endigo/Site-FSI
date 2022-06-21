// * Une fois la checkbox validée, le créateur peut annuler le match

function activer_annuler() {
    
    if(document.getElementById("bouton_annuler").disabled == false)
        document.getElementById("bouton_annuler").disabled=true;
    else
        document.getElementById("bouton_annuler").disabled=false;
}



// * Modifie la page selon la connexion
function verif_connexion(){
    
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    
    if(queryString.get('email') != null){
       
        document.getElementById("annuler").style.display="flex";
        document.getElementById("cloture").style.display="block";
        document.getElementById("inscription").style.display="block";
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