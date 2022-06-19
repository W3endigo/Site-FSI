<?php

    //* Ce fichier permet :
    //* - de récupérer les informations d'un match pour la home page (trié par date de début)
    //* - de récupérer les informations d'un match.
    //* - de récupérer les informations d'un joueur.
    //* - de récupérer les informations des participants à un match.
    //* - de récupérer les participations à un match.
    //* - de récupérer les match organisé par un joueurs
    //* - de récupérer les sports disponibles.
    //* - de récupérer les villes disponibles.
    //* - de récupérer les fréquences disponibles.
    //* - de récupérer les match en filtrant par ville.
    //* - de récupérer les match en filtrant par sport.
    //* - de récupérer les match en filtrant par période (+7j, +15j, +30j).
    //* - de récupérer les match en filtrant par match complet/incomplet.

    require_once('database.php');

    //* Cette fonction permet de récupérer les informations des matchs pour la home page (trié par date de début)
    function dbGetMatchHome($db){

        try{
            $request = 'SELECT * FROM matchs ORDER BY horaire ASC';
            $statement = $db->prepare($request);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){
            error_log('Erreur lors de la récupération des matchs : '.$exception->getMessage());
            return false;
        }

        return $result;
    }


    //* Cette fonction permet de récupérer les informations d'un match.
    function dbGetMatchById($db, $id_match){

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

    //* Cette fonction permet de récupérer les match en filtrant par ville.
    function dbGetMatchByVille($db, $code_insee_ville){

        try{

            $request = 'SELECT * FROM matchs WHERE code_insee_ville=:code_insee_ville';
            $statement = $db->prepare($request);
            $statement->bindParam (':code_insee_ville', $code_insee_ville, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des matchs par ville : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    //* Cette fonction permet de récupérer les match en filtrant par sport.
    function dbGetMatchBySport($db, $nom_sport){

        try{

            $request = 'SELECT * FROM matchs WHERE nom_sport=:nom_sport';
            $statement = $db->prepare($request);
            $statement->bindParam (':nom_sport', $nom_sport, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des matchs par sport : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    //* Cette fonction permet de récupérer les match en filtrant par période (+7j, +15j, +30j).
    function dbGetMatchByPeriode($db, $periode){

        try{

            $request = 'SELECT * FROM matchs WHERE horaire >= NOW() AND horaire <= DATE_ADD(NOW(), INTERVAL :periode DAY)';
            $statement = $db->prepare($request);
            $statement->bindParam (':periode', $periode, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des matchs par période : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    //* Cette fonction permet de récupérer les match en filtrant par match complet/incomplet.
    function dbGetMatchByComplet($db, $complet){

        $result_match = array();
        
        try{
    
            $request = 'SELECT COUNT(email) FROM participe GROUP BY id_match ORDER BY id_match';
            $statement = $db->prepare($request);
            $statement->bindParam (':complet', $complet, PDO::PARAM_STR, 50);
            $statement->execute();
            $result_participant = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des participants par matchs : '.$exception->getMessage());
            return false;

        }

        try{
    
            $request = 'SELECT participant_max FROM matchs';
            $statement = $db->prepare($request);
            $statement->bindParam (':complet', $complet, PDO::PARAM_STR, 50);
            $statement->execute();
            $result_participant_max = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des id de matchs : '.$exception->getMessage());
            return false;

        }

        for($i = 0; $i < count($result_participant); $i++){
            if($complet){
                if($result_participant[$i][0] == $result_participant_max[$i][0]){
                    try{
    
                        $request = 'SELECT * FROM matchs WHERE id_match=:id_match';
                        $statement = $db->prepare($request);
                        $statement->bindParam (':id_match', $i, PDO::PARAM_STR, 50);
                        $statement->execute();
                        //$result_match->append($statement->fetchAll());
            
                    }catch (PDOException $exception){
            
                        error_log('Erreur lors de la récupération des matchs complets : '.$exception->getMessage());
                        return false;
            
                    }
                }
            }else{
                if($result_participant[$i][0] != $result_participant_max[$i][0]){
                    try{
    
                        $request = 'SELECT * FROM matchs WHERE id_match=:id_match';
                        $statement = $db->prepare($request);
                        $statement->bindParam (':id_match', $i, PDO::PARAM_STR, 50);
                        $statement->execute();
                        $result_match = $result_match +1;//$statement->fetchAll();
            
                    }catch (PDOException $exception){
            
                        error_log('Erreur lors de la récupération des matchs incomplets : '.$exception->getMessage());
                        return false;
            
                    }
                }

            }

        }

        return $result_match;

    }

    //* Cette fonction permet de récupérer les informations d'un joueur.
    function dbGetJoueur($db, $email){

        try{

            $request = 'SELECT prenom, nom, naissance, photo, code_insee_ville, frequence_sport FROM joueur WHERE email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetch();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des infos du joueur : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    //* Cette fonction permet de récupérer les informations des participants à un match.
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

    //* Cette fonction permet de récupérer les participations à un match d'un joueur.
    function dbGetParticipations($db, $email){

        try{

            $request = 'SELECT id_match, status FROM participe WHERE email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des infos des participations : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    //* Cette fonction permet de récupérer les matchs organisé par un joueur.
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

    //* Cette fonction permet de récupérer les sports disponibles.
    function dbGetSports($db){

        try{

            $request = 'SELECT * FROM sport';
            $statement = $db->prepare($request);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des sports : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    //* Cette fonction permet de récupérer les villes disponibles.
    function dbGetVilles($db){

        try{

            $request = 'SELECT * FROM Ville_Bretonne';
            $statement = $db->prepare($request);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des villes : '.$exception->getMessage());
            return false;

        }

        return $result;

    }

    //* Cette fonction permet de récupérer les fréquences de pratique de sport disponibles.
    function dbGetFrequences($db){

        try{

            $request = 'SELECT * FROM condition_physique';
            $statement = $db->prepare($request);
            $statement->execute();
            $result = $statement->fetchAll();

        }catch (PDOException $exception){

            error_log('Erreur lors de la récupération des fréquences : '.$exception->getMessage());
            return false;

        }

        return $result;

    }
?>
