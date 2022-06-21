// * Gérer les modifications de profil.
$("#profil").submit((event) =>{
    event.preventDefault();

    // let paramString = window.location.href.split('?')[1];
    // let queryString = new URLSearchParams(paramString);

    // var joueur_default = getJoueur('send');
    // console.log(joueur_default);

    // if($("#image_selected").val() != joueur_default.photo){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://127.0.0.1/Site-FSI/pages/php/request.php/photo?email="+$('#email').val()+"&new_photo="+$('#image_selected').val());
    //     xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
               
    //             if(xhr.responseText == "true"){
    //                 console.log("Photo modifiée avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification de la photo !");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }

    // if($("#prenom").val() != joueur_default.prenom){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://127.0.0.1/Site-FSI/pages/php/request.php/prenom?email="+$('#email').val()+"&new_prenom="+$('#prenom').val());
    //     xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
               
    //             if(xhr.responseText == "true"){
    //                 console.log("Prénom modifié avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification du prénom!");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }

    // if($("#nom").val() != joueur_default.nom){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://127.0.0.1/Site-FSI/pages/php/request.php/nom?email="+$('#email').val()+"&new_nom="+$('#nom').val());
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
                                       
    //             if(xhr.responseText == "true"){
    //                 console.log("Nom modifié avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification du nom !");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }

    // if($("#email").val() != queryString.get('email')){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://127.0.0.1/Site-FSI/pages/php/request.php/email?email="+queryString.get('email')+"&new_email="+$('#email').val());
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
               
    //             if(xhr.responseText == "true"){
    //                 console.log("Email modifié avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification de l'email !");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }
    // // TODO : Gérer les modifications de mot de passe.
    // if($("#password").val() != joueur_default.password){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://127.0.0.1/Site-FSI/pages/php/request.php/mdp?email="+$('#email').val()+"&new_mdp="+$('#password').val());
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
               
    //             if(xhr.responseText == "true"){
    //                 console.log("Mot de passe modifié avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification du mot de passe !");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }

    // if($("#anniversaire").val() != joueur_default.naissance){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://127.0.0.1/Site-FSI/pages/php/request.php/date_naissance?email="+$('#email').val()+"&new_date_naissance="+$('#anniversaire').val());
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
               
    //             if(xhr.responseText == "true"){
    //                 console.log("Date de naissance modifiée avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification de la date de naissance !");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }

    // if($("#ville").val() != joueur_default.code_insee_ville){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://127.0.0.1/Site-FSI/pages/php/request.php/code_insee_ville?email="+$('#email').val()+"&new_code_insee_ville="+$('#ville').val());
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
               
    //             if(xhr.responseText == "true"){
    //                 console.log("Ville modifiée avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification de la ville !");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }

    // if($("#frequence").val() != joueur_default.frequence_sport){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", "http://localhost/Site-FSI/pages/php/request.php/frequence?email="+$('#email').val()+"&new_frequence="+$('#frequence').val());
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState == 4 && xhr.status == 200){
               
    //             if(xhr.responseText == "true"){
    //                 console.log("Fréquence de sport modifiée avec succès !");
    //             }else{
    //                 console.log("Erreur lors de la modification de la fréquence de sport !");
    //             }
    //         }
    //     }
    //     xhr.send();
    // }
});

// * Permettre de modifier les informations dans le profil.
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



//Afficher mot de passe
function toggle_mdp() {
    
    if(document.getElementById("motDePasse").type == "password"){
        document.getElementById("motDePasse").type="text";
        document.getElementById("voir").style.color = "#2196F3";
        document.getElementById("motDePasse2").type="text";
    }
    else{
        document.getElementById("motDePasse").type="password";
        document.getElementById("voir").style.color = "#000000";
        document.getElementById("motDePasse2").type="password";
    }
    
}
function getJoueur(mode = 'use'){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/joueur?email="+queryString.get('email'));
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/inscription.html");
    console.log(mode);
    if(mode == 'use'){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(xhr.responseText);
                var joueur = JSON.parse(xhr.responseText);
                document.getElementById("image_selected").value = joueur.photo;
                document.getElementById("prenom").value = joueur.prenom;
                document.getElementById("nom").value = joueur.nom;
                document.getElementById("email").value = queryString.get('email');
                document.getElementById("anniversaire").value = joueur.naissance;
                document.getElementById("ville").value = joueur.code_insee_ville;
                document.getElementById("frequence").value = joueur.frequence_sport;  
            }
        }
    }else{
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                return JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.send();

}'n'
