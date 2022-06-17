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

  // * Récupération de la méthode de la requête.
  switch ($requestMethod){

    case 'GET':

      // * Récupération de la ressource demandée.
      switch ($requestRessource){

        // * Si l'on a besoin de vérifier un utilisateur.
        case 'checkuser':
          if(isset($_GET['email']) && isset($_GET['mdp'])){
            $data = dbCheckUser($db, $_GET['email'], $_GET['mdp']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou mdp manquant');
            exit;
            
          }
          break;

        // * Si l'on a besoin de vérifier la présence d'un mail dans la DB.
        case 'checkmail':
          if(isset($_GET['email'])){
            $data = dbCheckMail($db, $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de récupérer les matchs.
        case 'matchs':
            $data = dbGetMatchHome($db);
            break;

        // * Si l'on a besoin de récupérer un matchs.
        case 'matchbyid':
          if(isset($_GET['id_match'])){
            $data = dbGetMatchById($db, $_GET['id_match']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('id_match manquant');
            exit;
          }
          break;
        
        // * Si l'on a besoin de récupérer un joueur.
        case 'joueur':
          if(isset($_GET['email'])){
            $data = dbGetJoueur($db, $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email manquant');
            exit;
          }
          break;
        
        // * Si l'on a besoin de récupérer les participants à un match.
        case 'participants':
          if(isset($_GET['id_match'])){
            $data = dbGetParticipants($db, $_GET['id_match']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('id_match manquant');
            exit;
          }
          break;
        
        // * Si l'on a besoin de récupérer les match auxquels participe un joueur.
        case 'participations':
          if(isset($_GET['email'])){
            $data = dbGetParticipations($db, $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de récupérer les matchs qu'organise un joueur.
        case 'organise':
          if(isset($_GET['email'])){
            $data = dbGetMatchOrganise($db, $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de récupérer les sports présents dans la DB.
        case 'sport':
          $data = dbGetSports($db);
          break;

        // * Si l'on a besoin de récupérer les villes présentes dans la DB.
        case 'ville':
          $data = dbGetVilles($db);
          break;

        // * Si l'on a besoin de récupérer les fréquences présentes dans la DB.
        case 'frequence':
          $data = dbGetFrequences($db);
          break;
          
      }

      break;

    case 'POST':

      // * Récupération de la ressource demandée.
      switch ($requestRessource){

        // * Si l'on a besoin de créer un joueur.
        case 'joueur':
          if(isset($_GET['email']) && isset($_GET['mdp']) && isset($_GET['prenom']) && isset($_GET['nom']) && isset($_GET['date_naissance']) && isset($_GET['photo']) && isset($_GET['code_insee_ville']) && isset($_GET['frequence'])){
            $data = dbCreateJoueur($db, $_GET['email'], $_GET['mdp'], $_GET['prenom'], $_GET['nom'], $_GET['date_naissance'], $_GET['photo'], $_GET['code_insee_ville'], $_GET['frequence']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode($_GET);
            exit;
          }
          break;

        // * Si l'on a besoin de créer un match.
        case 'match':
          if(isset($_GET['titre']) && isset($_GET['horaire']) && isset($_GET['duree']) && isset($_GET['description']) && isset($_GET['participant_min']) && isset($_GET['participant_max']) && isset($_GET['prix']) && isset($_GET['adresse']) && isset($_GET['code_insee_ville']) && isset($_GET['nom_sport']) && isset($_GET['email_organisateur'])){
            $data = dbCreateMatchs($db, $_GET['titre'], $_GET['horaire'], $_GET['duree'], $_GET['description'], $_GET['participant_min'], $_GET['participant_max'], $_GET['prix'], $_GET['adresse'], $_GET['code_insee_ville'], $_GET['nom_sport'], $_GET['email_organisateur']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('tout les champs ne sont pas remplis');
            exit;
          }
          break;
        
        // * Si l'on a besoin de créer un participant.
        case 'participant':
          if(isset($_GET['id_match']) && isset($_GET['email'])){
            $data = dbAddParticipant($db, $_GET['id_match'], $_GET['email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('tout les champs ne sont pas remplis');
            exit;
          }
          break;
      }
      break;

    case 'PUT':

      // * Récupération de la ressource demandée.
      switch ($requestRessource){

        // * Si l'on a besoin de modifier un email de joueur.
        case 'email':
          if(isset($_GET['email']) && isset($_GET['new_email'])){
            $data = dbUpdateEmail($db, $_GET['email'], $_GET['new_email']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_email manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de modifier un mot de passe de joueur.
        case 'mdp':
          if(isset($_GET['email']) && isset($_GET['new_mdp'])){
            $data = dbUpdateMdp($db, $_GET['email'], $_GET['new_mdp']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_mdp manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de modifier un prénom de joueur.
        case 'prenom':
          if(isset($_GET['email']) && isset($_GET['new_prenom'])){
            $data = dbUpdatePrenom($db, $_GET['email'], $_GET['new_prenom']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_prenom manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de modifier un nom de joueur.
        case 'nom':
          if(isset($_GET['email']) && isset($_GET['new_nom'])){
            $data = dbUpdateNom($db, $_GET['email'], $_GET['new_nom']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_nom manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de modifier une date de naissance de joueur.
        case 'date_naissance':
          if(isset($_GET['email']) && isset($_GET['new_date_naissance'])){
            $data = dbUpdateDateNaissance($db, $_GET['email'], $_GET['new_date_naissance']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_date_naissance manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de modifier une photo de joueur.
        case 'photo':
          if(isset($_GET['email']) && isset($_GET['new_photo'])){
            $data = dbUpdatePhoto($db, $_GET['email'], $_GET['new_photo']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_photo manquant');
            exit;
          }
          break;
        
        // * Si l'on a besoin de modifier un code insee de joueur.
        case 'code_insee_ville':
          if(isset($_GET['email']) && isset($_GET['new_code_insee_ville'])){
            $data = dbUpdateCodeInseeVille($db, $_GET['email'], $_GET['new_code_insee_ville']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_code_insee_ville manquant');
            exit;
          }
          break;

        // * Si l'on a besoin de modifier une frequence de sport de joueur.
        case 'frequence':
          if(isset($_GET['email']) && isset($_GET['new_frequence'])){
            $data = dbUpdateFrequence($db, $_GET['email'], $_GET['new_frequence']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('email ou new_frequence manquant');
            exit;
          }
          break;

        // * Si l'on veut finir un match.
        case 'match':
          if(isset($_GET['id_match']) && isset($_GET['score_home']) && isset($_GET['score_away']) && isset($_GET['email_joueur'])){
            $data = dbUpdateMatchs($db, $_GET['id_match'], $_GET['score_home'], $_GET['score_away'], $_GET['email_joueur']);
          }else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode('tout les champs ne sont pas remplis');
            exit;
          }

      }
      
      break;

    case 'DELETE':

      // * Récupération de la ressource demandée.
      switch($requestRessource){

        // * Si l'on a besoin de supprimer un match.
        case 'match':
        if(isset($_GET['id_match'])){
          $data = dbDeleteMatchs($db, $_GET['id_match']);
        }else{
          header('HTTP/1.1 400 Bad Request');
          echo json_encode('id_match manquant');
          exit;
        }
        break;
      }
           
  }

  // * Envoie des données au client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  echo json_encode($data);
  exit;
?>
