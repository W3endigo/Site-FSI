// * Une fois la checkbox validée, le créateur peut annuler le match

function activer_annuler() {
    
    if(document.getElementById("bouton_annuler").disabled == false)
        document.getElementById("bouton_annuler").disabled=true;
    else
        document.getElementById("bouton_annuler").disabled=false;
}