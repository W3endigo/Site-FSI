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