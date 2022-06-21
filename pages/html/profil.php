<?php
session_start();
if(isset($_SESSION['email'])){
    $email = $_SESSION['email'];
    echo "<script>console.log('Console: " . $email . "' );</script>";
}
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8"/>
    <!--Pour rendre le code responsif -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Liaison à Bootstrap et JQuery -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <title>FSI</title>

    <!--Liaison avec le fichier style-->
    <link href="../css/profil.css" rel="stylesheet" type="text/css" />

    <!--Liaison avec le fichier script-->
    <script type="text/javascript" src="../js/profil.js"></script>

  </head>
  <header>
    </header>
  
  <body onload ="getVille(); getFrequence(); getJoueur(<?php $email ?>);">
      
    <div id="sticky_head">
        <div id="apparait">    
            <a href="../../index.php">
            <img src="../../ressources/maison.png" id="home">         
            </a>
            <img src="../../ressources/petit_logo.png" id="petit_logo">
            <img src="../../ressources/deconnecte.png" id="user_image">
        </div>
    </div>   
    <form id="profil" class="container" action="http://127.0.0.1/site-FSI/pages/html/profil.php" >
        <div class="text-center">
          <img id="form_image" class="text-center" src="../../ressources/homme.png">
          <input id="image_selected" class="form-control" type="hidden" value="../../ressources/homme.png" >
          <div id="changer" onclick="toggle_image()"><i class="bi bi-arrow-clockwise"></i></div>
        </div>
        
        
        <div class="d-flex flex-row">
            <input class="info_profil" id="prenom" value=""  disabled required>

            <input class="info_profil" id="nom" value="" disabled required>
        
        </div>
        
        <input class="info_profil" type="email" aria-describedby="emailHelp" id="email" value=""  disabled required>
        
        <input class="info_profil" type="date" id="anniversaire" value=""  disabled required>
        
        <select class="info_profil" id="ville" disabled required>
        </select>
        <div class="text-center">
          <small>Condition physique :</small>
        </div>  
        <select class="info_profil" id="frequence" disabled required>
        </select>
        <div class="text-center">
        <img id="modifieur" src="../../ressources/pen.png" onclick="modifier_profil()">
        <button class="info_profil" type="submit" disabled> Modifier</button>
        </div>    
    </form>      
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


