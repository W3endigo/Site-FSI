// Création du match
$("#formulaire").submit((event) => {
    event.preventDefault();
    
    alert("samarch");
    
});









// * Cette fonction permet de récupérer le nom des villes via requête AJAX et de les afficher dans un select.
function getVille(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/ville");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/creation.html");
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


// * Cette fonction permet de récupérer le nom des sports via requête AJAX et de les afficher dans un select.
function getSports(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1/Site-FSI/pages/php/request.php/sport");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1/site-FSI/pages/html/creation.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var sports = JSON.parse(xhr.responseText);
            var select = document.getElementById("sport");
            for(var i = 0; i < sports.length; i++){
                var option = document.createElement("option");
                option.value = sports[i].nom_sport;
                option.text = sports[i].nom_sport;
                select.appendChild(option);
            }
        }
    }
    xhr.send();
}

