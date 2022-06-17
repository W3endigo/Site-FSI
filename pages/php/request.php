<?php
  require_once('database.php');
  require_once('affichage.php');
  require_once('gestion_participant.php');
  require_once('gestion_match.php');
  require_once('gestion_joueur.php');

  // * Connexion à la DB.
  $db = dbConnect();
  if (!$db)
  {
    header ('HTTP/1.1 503 Service Unavailable');
    exit;
  }

  // * Récupération des données de la requête.
  $requestMethod = $_SERVER['REQUEST_METHOD'];
  $request = substr($_SERVER['PATH_INFO'], 1);
  $request = explode('/', $request);
  $requestRessource = array_shift($request);

  switch ($requestMethod){

    case 'GET':

      switch ($requestRessource){

        case 'match':
            $data = dbGetMatchHome($db);
            break;

        case 'matchbyid':
          if(isset($_GET['id_match'])){
            $data = dbGetMatchById($db, $_GET['id_match']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;
        
        case 'joueur':
          if(isset($_GET['email'])){
            $data = dbGetJoueur($db, $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;
        
        case 'participants':
          if(isset($_GET['email'])){
            $data = dbGetParticipants($db, $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'participations':
          if(isset($_GET['id_match'])){
            $data = dbGetParticipations($db, $_GET['id_match']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'organise':
          if(isset($_GET['email'])){
            $data = dbGetMatchOrganise($db, $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'sport':
          $data = dbGetSports($db);
          break;

        case 'ville':
          $data = dbGetVilles($db);
          break;

        case 'frequence':
          $data = dbGetFrequences($db);
          break;
          
      }

      break;

    case 'POST':

      switch ($requestRessource){
        case 'joueur':
          if(isset($_POST['email']) && isset($_POST['mdp']) && isset($_POST['prenom']) && isset($_POST['nom']) && isset($_POST['date_naissance']) && isset($_POST['photo']) && isset($_POST['code_insee_ville']) && isset($_POST['frequence'])){
            $data = dbCreateJoueur($db, $_POST['email'], $_POST['mdp'], $_POST['prenom'], $_POST['nom'], $_POST['date_naissance'], $_POST['photo'], $_POST['code_insee_ville'], $_POST['frequence']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;
        case 'match':
          if(isset($_POST['titre']) && isset($_POST['horaire']) && isset($_POST['duree']) && isset($_POST['description']) && isset($_POST['participant_min']) && isset($_POST['participant_max']) && isset($_POST['prix']) && isset($_POST['adresse']) && isset($_POST['code_insee_ville']) && isset($_POST['nom_sport']) && isset($_POST['email_organisateur'])){
            $data = dbCreateMatchs($db, $_POST['titre'], $_POST['horaire'], $_POST['duree'], $_POST['description'], $_POST['participant_min'], $_POST['participant_max'], $_POST['prix'], $_POST['adresse'], $_POST['code_insee_ville'], $_POST['nom_sport'], $_POST['email_organisateur']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;
        
        case 'partcipant':
          if(isset($_POST['id_match']) && isset($_POST['email'])){
            $data = dbAddParticipant($db, $_POST['id_match'], $_POST['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;
      }

      break;

    case 'PUT':

      switch ($requestRessource){

        case 'email':
          if(isset($_PUT['email']) && isset($_PUT['new_email'])){
            $data = dbUpdateEmail($db, $_PUT['email'], $_PUT['new_email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'mdp':
          if(isset($_PUT['email']) && isset($_PUT['new_mdp'])){
            $data = dbUpdateMdp($db, $_PUT['email'], $_PUT['new_mdp']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'prenom':
          if(isset($_PUT['email']) && isset($_PUT['new_prenom'])){
            $data = dbUpdatePrenom($db, $_PUT['email'], $_PUT['new_prenom']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'nom':
          if(isset($_PUT['email']) && isset($_PUT['new_nom'])){
            $data = dbUpdateNom($db, $_PUT['email'], $_PUT['new_nom']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'date_naissance':
          if(isset($_PUT['email']) && isset($_PUT['new_date_naissance'])){
            $data = dbUpdateDateNaissance($db, $_PUT['email'], $_PUT['new_date_naissance']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'photo':
          if(isset($_PUT['email']) && isset($_PUT['new_photo'])){
            $data = dbUpdatePhoto($db, $_PUT['email'], $_PUT['new_photo']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;
        
        case 'code_insee_ville':
          if(isset($_PUT['email']) && isset($_PUT['new_code_insee_ville'])){
            $data = dbUpdateCodeInseeVille($db, $_PUT['email'], $_PUT['new_code_insee_ville']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

        case 'frequence':
          if(isset($_PUT['email']) && isset($_PUT['new_frequence'])){
            $data = dbUpdateFrequence($db, $_PUT['email'], $_PUT['new_frequence']);
          }else{
            header('HTTP/1.1 400 Bad Request');
          }
          break;

      }

      break;

    case 'DELETE':

      if(isset($_GET['id_match'])){
        $data = dbDeleteMatchs($db, $_GET['id_match']);
      }else{
        header('HTTP/1.1 400 Bad Request');
      }
      break;

  }
  
  // * Envoie des données au client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  echo json_encode($data);
  exit;
?>
