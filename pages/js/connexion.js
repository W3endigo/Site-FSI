// * Afficher mot de passe
function toggle_mdp() {
    
    if(document.getElementById("motDePasse").type == "password"){ // * Si le type est password, on le change en text
        document.getElementById("motDePasse").type="text";
        document.getElementById("voir").style.color = "#2196F3";
    }
    else{ // * Si le type est text, on le change en password
        document.getElementById("motDePasse").type="password";
        document.getElementById("voir").style.color = "#000000";
    }
    
}

// * Une fois le formulaire soumis, on vérifie la validité des informations
$("#connexion").submit((event) => {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/request.php/checkuser?email="+$('#email').val()+"&mdp="+$('#motDePasse').val());
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
               
                var validite = xhr.responseText;                
            }
            if(validite == 'true'){ //* Si la connexion est valide, on redirige vers la page d'accueil

                window.location.href = "../html/profil.html?email="+$('#email').val();

            }

            if(validite == 'false'){ //* Si la connexion est invalide, on affiche un message d'erreur
                document.getElementById("email").style.borderColor="#E30613";
                document.getElementById("erreur").style.display="block";
            }

    }
    xhr.send();
});

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

