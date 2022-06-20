
//Permettre de modifier les informations dans le profil


function modifier_profil(){
    
    var elements = document.getElementsByClassName("info_profil");
    
    if(elements[0].disabled == true){
        document.getElementById("changer").style.display = "block";
        document.getElementById("modifieur").src="../../ressources/greypen.png";
        for(var x =0; x < elements.length; x++)
            elements[x].disabled=false;
    }
    else {
        document.getElementById("changer").style.display = "none";
        document.getElementById("modifieur").src="../../ressources/pen.png";
        for(var x =0; x < elements.length; x++)
            elements[x].disabled=true;
    }
}


function toggle_image() {   

    if(document.getElementById("image_selected").value == "../../ressources/homme.png"){
        document.getElementById("form_image").src = "../../ressources/femme.png";
        document.getElementById("image_selected").value = "../../ressources/femme.png";
    }
    else{
        document.getElementById("form_image").src = "../../ressources/homme.png";
        document.getElementById("image_selected").value = "../../ressources/homme.png";
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
            var select = document.getElementById("ville");
            console.log(select);
            console.log(villes);
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



// * Cette fonction permet de récupérer les fréquences via requête AJAX et de les afficher dans un select.
function getFrequence(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/frequence");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var frequence = JSON.parse(xhr.responseText);
            var select = document.getElementById("frequence");
            for(var i = 0; i < frequence.length; i++){
                var option = document.createElement("option");
                option.value = frequence[i].frequence_sport;
                option.text = frequence[i].frequence_sport;
                select.appendChild(option);
            }
        }
    }
    xhr.send();
}