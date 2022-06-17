<?php

  // * Ce fichier permet de créer un joueur dans la DB.
    
  require_once('database.php');

  function dbCreateJoueur($db, $email, $mdp, $prenom, $nom, $date_naissance, $photo, $code_insee_ville, $frequence){

    if (!dbCheckMail($db, $email)){

      try{

        $request = 'INSERT INTO joueur (email, mdp, prenom, nom, date_naissance, photo, code_insee_ville, frequence) 
                                          VALUES (:email, :mdp, :prenom, :nom, :date_naissance, :photo, :code_insee_ville, :frequence)';
        $statement = $db->prepare($request);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->bindParam (':mdp', $mdp, PDO::PARAM_STR, 100);
        $statement->bindParam (':prenom', $prenom, PDO::PARAM_STR, 30);
        $statement->bindParam (':nom', $nom, PDO::PARAM_STR, 30);
        $statement->bindParam (':date_naissance', $date_naissance, PDO::PARAM_STR, 50);
        $statement->bindParam (':photo', $photo, PDO::PARAM_STR, 50);
        $statement->bindParam (':code_insee_ville', $code_insee_ville, PDO::PARAM_STR, 50);
        $statement->bindParam (':frequence', $frequence, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la création du joueur : '.$exception->getMessage());
        return false;
  
      }
  
      return true;


    }else{

      return false;

    }
    
  }

  // * Cette fonction permet de modifier le mail d'un joueur dans la DB.
  function dbUpdateEmail($db, $email, $new_email){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET email=:new_email WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_email', $new_email, PDO::PARAM_STR, 50);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification de l\'email : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }
  // * Cette fonction permet de modifier le mot de passe d'un joueur dans la DB.
  function dbUpdateMdp($db, $email, $new_mdp){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET mdp=:new_mdp WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_mdp', $new_mdp, PDO::PARAM_STR, 100);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification du mot de passe : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }
  // * Cette fonction permet de modifier le prénom d'un joueur dans la DB.
  function dbUpdatePrenom($db, $email, $new_prenom){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET prenom=:new_prenom WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_prenom', $new_prenom, PDO::PARAM_STR, 30);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification du prénom : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }
  // * Cette fonction permet de modifier le nom d'un joueur dans la DB.
  function dbUpdateNom($db, $email, $new_nom){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET nom=:new_nom WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_nom', $new_nom, PDO::PARAM_STR, 30);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification du nom : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }
  // * Cette fonction permet de modifier la date d'un naissance de joueur dans la DB.
  function dbUpdateDateNaissance($db, $email, $new_date_naissance){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET date_naissance=:new_date_naissance WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_date_naissance', $new_date_naissance, PDO::PARAM_STR, 50);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification de la date de naissance : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }
  // * Cette fonction permet de modifier la photo d'un joueur dans la DB.
  function dbUpdatePhoto($db, $email, $new_photo){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET photo=:new_photo WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_photo', $new_photo, PDO::PARAM_STR, 50);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification de la photo : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }
  // * Cette fonction permet de modifier le code insee d'un joueur dans la DB.
  function dbUpdateCodeInseeVille($db, $email, $new_code_insee_ville){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET code_insee_ville=:new_code_insee_ville WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_code_insee_ville', $new_code_insee_ville, PDO::PARAM_STR, 50);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification du code insee ville : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }
  // * Cette fonction permet de modifier la fréquence de sport d'un joueur dans la DB.
  function dbUpdateFrequence($db, $email, $new_frequence){

    if (dbCheckMail($db, $email)){

      try{

        $request = 'UPDATE joueur SET frequence=:new_frequence WHERE email=:email';
        $statement = $db->prepare($request);
        $statement->bindParam (':new_frequence', $new_frequence, PDO::PARAM_STR, 50);
        $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
        $statement->execute();
  
      }catch (PDOException $exception){
  
        error_log('Erreur lors de la modification de la fréquence : '.$exception->getMessage());
        return false;
  
      }

      return true;

    }else{

      return false;

    }
  }


?>
