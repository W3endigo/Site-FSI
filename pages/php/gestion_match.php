<?php

    // * ce fichier permet de créer et de supprimer un match

    require_once('database.php');

    //* cette fonction permet de créer un match dans la DB.
    function dbCreateMatchs($db, $titre, $horaire, $duree, $description, $participant_min, $participant_max, $prix, $adresse, $code_insee_ville, $nom_sport, $email_organisateur){

        try{
    
            $request = 'INSERT INTO matchs (titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, 
                                            score_home, score_away, code_insee_ville, nom_sport, email, email_Joueur)
                        VALUES (:titre, :horaire, :duree, :description, :participant_min, :participant_max, :prix, false, :adresse,
                                            NULL, NULL, :code_insee_ville, :nom_sport, :email_organisateur, test.inconnu@gmail.com)';
            $statement = $db->prepare($request);
            $statement->bindParam (':titre', $titre, PDO::PARAM_STR, 50);
            $statement->bindParam (':horaire', $horaire, PDO::PARAM_STR, 50);
            $statement->bindParam (':duree', $duree, PDO::PARAM_STR, 50);
            $statement->bindParam (':description', $description, PDO::PARAM_STR, 280);
            $statement->bindParam (':participant_min', $participant_min, PDO::PARAM_STR, 50);
            $statement->bindParam (':participant_max', $participant_max, PDO::PARAM_STR, 50);
            $statement->bindParam (':prix', $prix, PDO::PARAM_STR, 50);
            $statement->bindParam (':adresse', $adresse, PDO::PARAM_STR, 100);
            $statement->bindParam (':code_insee_ville', $code_insee_ville, PDO::PARAM_STR, 50);
            $statement->bindParam (':nom_sport', $nom_sport, PDO::PARAM_STR, 50);
            $statement->bindParam (':email_organisateur', $email_organisateur, PDO::PARAM_STR, 50);
            $statement->execute();

        }catch (PDOException $exception){
    
            error_log('Erreur lors de la création du match : '.$exception->getMessage());
            return false;
    
        }

        return true;

    }

    //* cette fonction permet de supprimer un match dans la DB.
    function dbDeleteMatchs($db, $id_match){

        try{
    
            $request = 'DELETE FROM matchs WHERE id_match=:id_match';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->execute();

        }catch (PDOException $exception){
    
            error_log('Erreur lors de la suppression du match : '.$exception->getMessage());
            return false;
    
        }

        return true;

    }

    //modifier score et meilleur joueur
    function dbUpdateMatchs($db, $id_match, $score_home, $score_away, $email_joueur){

        try{
    
            $request = 'UPDATE matchs SET score_home=:score_home, score_away=:score_away, email_Joueur=:email_joueur WHERE id_match=:id_match';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->bindParam (':score_home', $score_home, PDO::PARAM_STR, 50);
            $statement->bindParam (':score_away', $score_away, PDO::PARAM_STR, 50);
            $statement->bindParam (':email_joueur', $email_joueur, PDO::PARAM_STR, 50);
            $statement->execute();

        }catch (PDOException $exception){
    
            error_log('Erreur lors de la modification du match : '.$exception->getMessage());
            return false;
    
        }

        return true;

    }

?>