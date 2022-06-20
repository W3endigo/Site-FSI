
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
