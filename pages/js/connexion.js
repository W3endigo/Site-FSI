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
    xhr.open("GET", "../php/request.php/checkuser?email="+$('#email').val()+"&mdp="+$('#motDePasse').val());
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
               
                var validite = xhr.responseText;                
            }
            if(validite == 'true'){

                window.location.href = "../html/profil.html?email="+$('#email').val();

            }

            if(validite == 'false'){
                document.getElementById("email").style.borderColor="#E30613";
                document.getElementById("erreur").style.display="block";
            }

    }
    xhr.send();
});


function goHome(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if(queryString.get('email') != null){
        window.location.href = "../../index.html?email="+queryString.get('email');
    }else{
        window.location.href = "../../index.html";
    }
}

