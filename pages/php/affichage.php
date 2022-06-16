<?php

    //* Ce fichier permet :
    //* - de récupérer les informations d'un match.
    //* - de récupérer les informations d'un joueur.
    //* - de récupérer les informations des participants à un match.
    //* - de récupérer les participations à un match.
    //* - de récupérer les match organisé par un match

    require_once('database.php');

    function dbGetMatch($db, $id_match){

        try{

            $request = 'SELECT * FROM matchs WHERE id_match=:id_match';
            $statement = $db->prepare($request);
            $statement->bindParam (':id_match', $id_match, PDO::PARAM_STR, 50);
            $statement->execute();
            $result = $statement->fetch();

        }catch (PDOException $exception){

            error_log('Erreur lors de la requête : '.$exception->getMessage());
            return false;

        }

        if (!$result){

            return false;

        }

        return $result;

    }

?>