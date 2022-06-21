<?php
session_start();
if(isset($_POST['email'])){
    $email = $_POSTR['email'];
}
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8"/>
    <!--Pour rendre le code responsif -->
    <metaid="viewport" content="width=device-width, initial-scale=1">
    <!-- Liaison à Bootstrap et JQuery -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <title>FSI</title>

    <!--Liaison avec le fichier style-->
    <link href="../css/inscription.css" rel="stylesheet" type="text/css" />

    <!--Liaison avec le fichier script-->
    <script src="../js/inscription.js" defer></script>

  </head>
  <header>
    </header>
  
  <body onload ="getVille(); getFrequence()">
      
    <div id="sticky_head">
        <div id="apparait">    
            <a href="../../index.php">
            <img src="../../ressources/maison.png" id="home">         
            </a>
            <img src="../../ressources/petit_logo.png" id="petit_logo">
            <img src="../../ressources/deconnecte.png" id="user_image">
        </div>
    </div>
      
    <center>  
    <div id="formulaire" class="container">  
 <form id = "Form" method="post" >
  <div id="formPicture" class="form-group">
      <div class="container_fluid">
        <label for="prenom">Prenom </label>
        <input class="form-control" id="prenom" placeholder="Prenom" required>
          
        <label for="nom">Nom</label>
        <input class="form-control" id="nom" placeholder="Nom" required>
      </div>      
        <input class="form-control" id="image_selected" value="../../ressources/femme.png" >
        <div onclick="toggle_image()"><i class="bi bi-arrow-clockwise"></i></div>
        <img id="form_image" src="../../ressources/femme.png">
  </div>
     
  <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" required>
      <small id="emailHelp" class="form-text">De préférence votre adresse ISEN.</small>
      
      <label for="anniversaire">Date de naissance</label>
      <input type="date" class="form-control" id="anniversaire" placeholder="0/00/00" required>
      
      <label for="adresse">Ville</label>
      <select id="ville" class="form-control" required>
            <option style="display:none" value="">Choisir une ville</option>
      </select>
      
  <div class="form-group">
    <label for="conditions">Conditions sportives</label>
    <select id="frequence" class="form-control" required>
        <option style="display:none" value="">Choisir une forme sportive</option>
    </select>
  </div>
      
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="motDePasse">Mot de passe</label>
      <input type="password" class="form-control" id="motDePasse" placeholder='Pas "12345" ou "azertyuiop"' required>       
    </div>
      
    <div class="form-group col-md-6">
      <label for="confirmMotDePasse">Confirmer mot de passe</label>
      <input type="password" class="form-control" id="motDePasse2" required>
      <small id="mauvaisMdp" class="form-text" style="display:none">
          Les mots de passe ne correspondent pas.
      </small>
        
    </div>
  </div>
      
  <div class="form-group col-md-6">
    <label onclick="toggle_mdp()" id="voir">
        VOIR
    </label>
  </div>
<div class="form-row">
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck" required>
      <label  class="form-check-label" for="gridCheck">
        J'ai lu et j'accepte les CGU
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">S'inscrire</button>
  </div>
     </div>      
      
 </form>
</div>      
</center> 
      
  </body>
    
  <footer>
    
      <h1>Nous rejoindre :</h1>
      
      <div id="reseaux">
        <a href="https://instagram.com/onnea_bde?igshid=YmMyMTA2M2Y="><img src=../../ressources/instagram.png></a>
        <a href="https://fr-fr.facebook.com/Groupe.ISEN"><img src=../../ressources/facebook.png></a>
        <a href="https://www.youtube.com/c/ISENOuest"><img src=../../ressources/youtube.png></a>
        <a href="https://www.isen.fr/"><img src=../../ressources/Google-G-Logo.png></a>  
      
      
      </div>
    
  </footer>    
</html>


