<?php

  require_once('constantes.php');

// * Ce fichier permet :
// * - de se connecter à la DB.
// * - de vérifier les information de connexion.
// * - de vérifier si le mail fournis est dans la DB.

// * Connection à la DB
function dbConnect(){

  try{

    $dbConnexion = new PDO('mysql:host='.DB_SERVER.';dbname='.DB_NAME.';charset=utf8', DB_USER, DB_PASSWORD);
    $dbConnexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  }catch (PDOException $exception){

    error_log('Erreur de connexion : '.$exception->getMessage());
    return false;

  }
    return $dbConnexion;
}

  // *  Vérification des infos de connexion 
  // * \param db la db connecté.
  // * \param login l'email à vérifier.
  // * \param password le mot de passe à vérifier.
  // * \return True si les informations sont correcte, false sinon.
  function dbCheckUser($db, $email, $mdp){

    
    try{

      $request = 'SELECT mdp FROM joueur WHERE email=:email';
      $statement = $db->prepare($request);
      $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
      $statement->execute();
      $result = $statement->fetch();

    }catch (PDOException $exception){

      error_log('Erreur lors de la requête : '.$exception->getMessage());
      return false;

    }

    return password_verify($mdp, $result);

  }

  // *  Vérification de la présence du mail dans la DB
  // * \param db la db connecté.
  // * \param login l'email à vérifier.
  // * \param password le mot de passe à vérifier.
  // * \return True si les informations sont correcte, false sinon.
  function dbCheckMail($db, $email){

    try{

      $request = 'SELECT email FROM joueur WHERE email=:email';
      $statement = $db->prepare($request);
      $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
      $statement->execute();
      $result = $statement->fetch();

    }catch (PDOException $exception){

      error_log('Erreur lors de la requête : '.$exception->getMessage());
      return false;

    }

    if (!$result){

      return false;

    }

    return true;
  }

// * Récupération du chiffrage du mot de passe.
function dbGetChiffrage($db, $mdp){
  
  return password_hash($mdp, PASSWORD_BCRYPT);
}

?>
