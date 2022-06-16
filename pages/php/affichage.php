<?php

    //* Ce fichier permet :
    //* - de récupérer les informations d'un match.
    //* - de récupérer les informations d'un joueur.
    //* - de récupérer les informations des participants à un match.
    //* - de récupérer les participations à un match.
    //* - de récupérer les match organisé par un joueurs

    require_once('database.php');

    function dbGetMatch($db, $id_match){

        try{

            $request = 'SELECT titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, 
                                score_home, score_away, code_insee_ville, nom_sport, email, email_Joueur 
                        FROM matchs WHERE id_match=:id_match';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetch();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des infos du match : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    function dbGetJoueur($db, $email){

        try{

            $request = 'SELECT mdp, prenom, nom, date_naissance, photo, code_insee_ville, frequence FROM joueur WHERE email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $email, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetch();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des infos du joueur : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    function dbGetParticipants($db, $id_match){

        try{

            $request = 'SELECT email, status FROM participe WHERE id_match=:id_match AND status!=2';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des infos des partcicipants : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    function dbGetParticipations($db, $email){

        try{

            $request = 'SELECT id_match, status FROM participe WHERE email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $email, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des infos des participations : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    function dbGetMatchOrganise($db, $email){

        try{

            $request = 'SELECT id_match FROM matchs WHERE email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des infos des matchs organisés : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

?>
