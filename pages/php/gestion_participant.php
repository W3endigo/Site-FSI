<?php

    //* Ce fichier permet :
    //* - d'ajouter une participant à un match.
    //* - de valider une participion à un match et de mettre à jour le nombre de participation du joueur.
    //* - de refuser une participation à un match d'un joueur.

    require_once('database.php');

    //* Cette fonction permet d'ajouter un participant à un match.
    function dbAddParticipant($db, $id_match, $email){

        try{

            $request = 'INSERT INTO participe (id_match, email, status)
                                                 VALUES (:id_match, :email, 1)';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
            $statement->execute();

        }catch (PDOException $exception){

            error_log('Erreur lors de l\'ajout du participant : '.$exception->getMessage());
            return false;

        }

        return true;


    }

    //* Cette fonction permet de valider une participation à un match et de mettre à jour le nombre de participation du joueur.
    function dbValidateParticipant($db, $id_match, $email){

        // * Mise à jour du status de la participation à un match.
        try{

            $request = 'UPDATE participe SET status=1 WHERE id_match=:id_match AND email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
            $statement->execute();

        }catch (PDOException $exception){

            error_log('Erreur lors de la validation du participant : '.$exception->getMessage());
            return false;

        }

        // * Mise à jour du nombre de participation du joueur.
        try{

            $request = 'UPDATE joueur SET nombre_de_matchs=nombre_de_matchs+1 WHERE email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
            $statement->execute();

        }catch (PDOException $exception){

            error_log('Erreur lors de la validation du participant : '.$exception->getMessage());
            return false;

        }

        return true;

    }

    //* Cette fonction permet de refuser une participation à un match d'un joueur.
    function dbRefuseParticipant($db, $id_match, $email){

        try{

            $request = 'UPDATE participe SET status=2 WHERE id_match=:id_match AND email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->bindParam (':email', $email, PDO::PARAM_STR, 50);
            $statement->execute();

        }catch (PDOException $exception){

            error_log('Erreur lors du refus du participant : '.$exception->getMessage());
            return false;

        }

        return true;

    }
?>