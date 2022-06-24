#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

#------------------------------------------------------------
#        Create DATABASE
#------------------------------------------------------------

CREATE DATABASE db_fsi DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
CREATE USER 'fsi'@'localhost' IDENTIFIED BY 'isen39';
GRANT ALL PRIVILEGES ON db_fsi.* TO 'fsi'@'localhost';
USE db_fsi;

#------------------------------------------------------------
# Table: Ville_Bretonne
#------------------------------------------------------------

CREATE TABLE ville_bretonne(
        code_insee_ville Int NOT NULL ,
        nom_ville        Varchar (30) NOT NULL
	,CONSTRAINT ville_bretonne_PK PRIMARY KEY (code_insee_ville)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: condition_physique
#------------------------------------------------------------

CREATE TABLE condition_physique(
        frequence_sport Varchar (50) NOT NULL
	,CONSTRAINT condition_physique_PK PRIMARY KEY (frequence_sport)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: joueur
#------------------------------------------------------------

CREATE TABLE joueur(
        email            Varchar (50) NOT NULL ,
        prenom           Varchar (30) NOT NULL ,
        nom              Varchar (30) NOT NULL ,
        naissance        Date NOT NULL ,
        mdp              Varchar (100) NOT NULL ,
        photo            Varchar (50) NOT NULL ,
        nombre_de_matchs Int NOT NULL ,
        code_insee_ville Int NOT NULL ,
        frequence_sport  Varchar (50) NOT NULL
	,CONSTRAINT joueur_PK PRIMARY KEY (email)

	,CONSTRAINT joueur_ville_bretonne_FK FOREIGN KEY (code_insee_ville) REFERENCES ville_bretonne(code_insee_ville)
	,CONSTRAINT joueur_condition_physique0_FK FOREIGN KEY (frequence_sport) REFERENCES condition_physique(frequence_sport)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sport
#------------------------------------------------------------

CREATE TABLE sport(
        nom_sport Varchar (50) NOT NULL
	,CONSTRAINT sport_PK PRIMARY KEY (nom_sport)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: matchs
#------------------------------------------------------------

CREATE TABLE matchs(
        id_match         Int  Auto_increment  NOT NULL ,
        titre            Varchar (50) NOT NULL ,
        horaire          Datetime NOT NULL ,
        duree            Time NOT NULL ,
        description      Varchar (280) NOT NULL ,
        participant_min  Int NOT NULL ,
        participant_max   Int NOT NULL ,
        prix             Float NOT NULL ,
        termine          Bool NOT NULL ,
        adresse         Varchar (100) NOT NULL ,
        score_home       Int ,
        score_away       Int ,
        code_insee_ville Int NOT NULL ,
        nom_sport        Varchar (50) NOT NULL ,
        email            Varchar (50) NOT NULL ,
        email_joueur     Varchar (50) NOT NULL
	,CONSTRAINT matchs_PK PRIMARY KEY (id_match)

	,CONSTRAINT matchs_ville_bretonne_FK FOREIGN KEY (code_insee_ville) REFERENCES ville_bretonne(code_insee_ville)
	,CONSTRAINT matchs_sport0_FK FOREIGN KEY (nom_sport) REFERENCES sport(nom_sport)
	,CONSTRAINT matchs_joueur1_FK FOREIGN KEY (email) REFERENCES joueur(email)
	,CONSTRAINT matchs_joueur2_FK FOREIGN KEY (email_joueur) REFERENCES joueur(email)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: participe
#------------------------------------------------------------

CREATE TABLE participe(
        id_match Int NOT NULL ,
        email    Varchar (50) NOT NULL ,
        status   Int NOT NULL
	,CONSTRAINT participe_PK PRIMARY KEY (id_match,email)

	,CONSTRAINT participe_matchs_FK FOREIGN KEY (id_match) REFERENCES matchs(id_match)
	,CONSTRAINT participe_joueur0_FK FOREIGN KEY (email) REFERENCES joueur(email)
)ENGINE=InnoDB;

