// * Gérer les modifications de profil.
$("#profil").submit((event) =>{
    event.preventDefault();
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/joueur?email="+queryString.get('email'));
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var joueur_default = JSON.parse(xhr.responseText);
            if(document.getElementById("form_image").src != joueur_default.photo){
                var xhr1 = new XMLHttpRequest();
                xhr1.open("PUT", "../php/request.php/photo?email="+$('#email').val()+"&new_photo="+$('#image_selected').val());
                xhr1.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
                xhr1.onreadystatechange = function(){
                    if(xhr1.readyState == 4 && xhr1.status == 200){
                    
                        if(xhr1.responseText == "true"){
                            console.log("Photo modifiée avec succès !");
                        }else{
                            console.log("Erreur lors de la modification de la photo !");
                        }
                    }
                }
                xhr1.send();
            }

            if($("#prenom").val() != joueur_default.prenom){
                var xhr2 = new XMLHttpRequest();
                xhr2.open("PUT", "../php/request.php/prenom?email="+$('#email').val()+"&new_prenom="+$('#prenom').val());
                xhr2.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
                xhr2.onreadystatechange = function(){
                    if(xhr2.readyState == 4 && xhr2.status == 200){
                    
                        if(xhr2.responseText == "true"){
                            console.log("Prénom modifié avec succès !");
                        }else{
                            console.log("Erreur lors de la modification du prénom!");
                        }
                    }
                }
                xhr2.send();
            }

            if($("#nom").val() != joueur_default.nom){
                var xhr3 = new XMLHttpRequest();
                xhr3.open("PUT", "../php/request.php/nom?email="+$('#email').val()+"&new_nom="+$('#nom').val());
                xhr3.onreadystatechange = function(){
                    if(xhr3.readyState == 4 && xhr3.status == 200){
                                            
                        if(xhr3.responseText == "true"){
                            console.log("Nom modifié avec succès !");
                        }else{
                            console.log("Erreur lors de la modification du nom !");
                        }
                    }
                }
                xhr3.send();
            }

            // if($("#email").val() != queryString.get('email')){
            //     var xhr3 = new XMLHttpRequest();
            //     xhr3.open("PUT", "../php/request.php/email?email="+queryString.get('email')+"&new_email="+$('#email').val());
            //     xhr3.onreadystatechange = function(){
            //         if(xhr3.readyState == 4 && xhr3.status == 200){
                    
            //             if(xhr3.responseText == "true"){
            //                 console.log("Email modifié avec succès !");
            //             }else{
            //                 console.log("Erreur lors de la modification de l'email !");
            //             }
            //         }
            //     }
            //     xhr3.send();
            // }
            if($("#motDePasse").val() != ""){
                console.log($("#motDePasse").val());
                var xhr4 = new XMLHttpRequest();
                xhr4.open("PUT", "../php/request.php/mdp?email="+$('#email').val()+"&new_mdp="+$('#motDePasse').val());
                xhr4.onreadystatechange = function(){
                    if(xhr4.readyState == 4 && xhr4.status == 200){
                    
                        console.log(xhr4.responseText);

                        if(xhr4.responseText == "true"){
                            console.log("Mot de passe modifié avec succès !");
                            document.getElementById("motDePasse").value = '';
                        }else{
                            console.log("Erreur lors de la modification du mot de passe !");
                        }
                    }
                }
                xhr4.send();
                
            }

            if($("#anniversaire").val() != joueur_default.naissance){
                var xhr5 = new XMLHttpRequest();
                xhr5.open("PUT", "../php/request.php/date_naissance?email="+$('#email').val()+"&new_date_naissance="+$('#anniversaire').val());
                xhr5.onreadystatechange = function(){
                    if(xhr5.readyState == 4 && xhr5.status == 200){
                    
                        if(xhr5.responseText == "true"){
                            console.log("Date de naissance modifiée avec succès !");
                        }else{
                            console.log("Erreur lors de la modification de la date de naissance !");
                        }
                    }
                }
                xhr5.send();
            }

            if($("#ville").val() != joueur_default.code_insee_ville){
                var xhr6 = new XMLHttpRequest();
                xhr6.open("PUT", "../php/request.php/code_insee_ville?email="+$('#email').val()+"&new_code_insee_ville="+$('#ville').val());
                xhr6.onreadystatechange = function(){
                    if(xhr6.readyState == 4 && xhr6.status == 200){
                    
                        if(xhr6.responseText == "true"){
                            console.log("Ville modifiée avec succès !");
                        }else{
                            console.log("Erreur lors de la modification de la ville !");
                        }
                    }
                }
                xhr6.send();
            }

            if($("#frequence").val() != joueur_default.frequence_sport){
                var xhr7 = new XMLHttpRequest();
                xhr7.open("PUT", "../php/request.php/frequence?email="+$('#email').val()+"&new_frequence="+$('#frequence').val());
                xhr7.onreadystatechange = function(){
                    if(xhr7.readyState == 4 && xhr7.status == 200){
                    
                        if(xhr7.responseText == "true"){
                            console.log("Fréquence de sport modifiée avec succès !");
                        }else{
                            console.log("Erreur lors de la modification de la fréquence de sport !");
                        }
                    }
                }
                xhr7.send();
            }
        }
    }
    xhr.send();
    alert("profil modifié avec succès !");
});

// * Permettre de modifier les informations dans le profil.
function modifier_profil(){
    
    var elements = document.getElementsByClassName("info_profil");
    
    if(elements[0].disabled == true){
        document.getElementById("changer").style.display = "block";
        document.getElementById("modifieur").src="../../ressources/greypen.png";
        alert(' ! Attention ! \n Vous pouvez maintenant modifier votre profil !');
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
    xhr.open("GET", "../php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
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
    xhr.open("GET", "../php/request.php/frequence");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
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

 // * Cette fonction permet de récupérer les informations du joueur via requête AJAX et de les afficher dans le profil.
function getJoueur(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/joueur?email="+queryString.get('email'));
    xhr.setRequestHeader("Access-Control-Allow-Origin", "../html/inscription.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            //console.log(xhr.responseText);
            var joueur = JSON.parse(xhr.responseText);
            document.getElementById("form_image").src = joueur.photo;
            document.getElementById("user_image").src = joueur.photo;
            document.getElementById("prenom").value = joueur.prenom;
            document.getElementById("nom").value = joueur.nom;
            document.getElementById("email").value = queryString.get('email');                
            document.getElementById("anniversaire").value = joueur.naissance;
            document.getElementById("frequence").value = joueur.frequence_sport;
            document.getElementById("frequence_actuelle").innerHTML = joueur.frequence_sport;
           // document.getElementById("ville_actuelle").value = joueur.code_insee_ville;
            document.getElementById("ville").value = joueur.code_insee_ville;
            //document.getElementById("motDePasse").value = joueur.mdp;    
            document.getElementById("nb_match").innerHTML=joueur.nombre_de_matchs;   
            console.log("matchs" + joueur.nombre_de_matchs);       

        }
    }
    xhr.send();
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

// * Fonction permettant d'entraver l'accès au profil d'un joueur non connecté

function isConnected(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') == null || queryString.get('email') == ""){
        window.location.href = "../../index.html";
    }
}

// * Remercie l'utilisateur de sa note
function merci(){
    alert("Merci pour votre note !");
}

function deconnexion(){
    window.location.href = "../../index.html";
}


// TODO /var/www/projet
// TODO SFTP
// TODO sudo cp -r /home/user1/projet/x /var/www/projet
