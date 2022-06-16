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
          if(isset($_GET['id_match'])){
            $data = dbGetMatch($db, $_GET['id_match']);
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
  

  // if ($requestRessource == 'tweets')
  // {
  //   if (isset($_GET['login']))
  //     $data = dbRequestTweets($db, $_GET['login']);
  //   else
  //     $data = dbRequestTweets($db);
  // }
  // else{
  //     header('HTTP/1.1 400 Bad Request');
  // }


  // if($requestMethod == 'POST'){

  //   $data = NULL;
  //   dbAddTweet($db, $_POST['login'], strip_tags($_POST['text']));

  // }

  // if($requestMethod == 'PUT'){

  //   parse_str(file_get_contents('php://input'), $_PUT);

  //   $data = NULL;
  //   dbModifyTweet($db,$id, $_PUT['login'], strip_tags($_PUT['text']));
  // }

  // if($requestMethod == 'DELETE'){
  //   $data = NULL;
  //   dbDeleteTweet($db,$id, $_GET['login']);
  // }

  // * Envoie des données au client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  echo json_encode($data);
  exit;
?>
