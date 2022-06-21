// * Afficher mot de passe

function toggle_mdp() {
    
    if(document.getElementById("motDePasse").type == "password"){
        document.getElementById("motDePasse").type="text";
        document.getElementById("voir").style.color = "#2196F3";
    }
    else{
        document.getElementById("motDePasse").type="password";
        document.getElementById("voir").style.color = "#000000";
    }
    
}

// * Connexion
$("#connexion").submit((event) => {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/checkuser?email="+$('#email').val()+"&mdp="+$('#password').val());
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
               
                var validite = xhr.responseText;
                
            }
            if(validite == "true"){

                window.location.href = "http://127.0.0.1/site-FSI/pages/html/profil.html?email="+$('#email').val();

            }else{
                document.getElementById("email").borderColor="#E30613";
                document.getElementById("erreur").style.display="block";
            }

    }
    xhr.send();
});



