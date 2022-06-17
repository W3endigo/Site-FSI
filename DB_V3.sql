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

CREATE TABLE Ville_Bretonne(
        code_insee_ville Int NOT NULL ,
        nom_ville        Varchar (30) NOT NULL
	,CONSTRAINT Ville_Bretonne_PK PRIMARY KEY (code_insee_ville)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: condition_physique
#------------------------------------------------------------

CREATE TABLE condition_physique(
        frequence_sport Varchar (50) NOT NULL
	,CONSTRAINT condition_physique_PK PRIMARY KEY (frequence_sport)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Joueur
#------------------------------------------------------------

CREATE TABLE Joueur(
        email            Varchar (50) NOT NULL ,
        prenom           Varchar (30) NOT NULL ,
        nom              Varchar (30) NOT NULL ,
        naissance        Date NOT NULL ,
        mdp              Varchar (100) NOT NULL ,
        photo            Varchar (50) NOT NULL ,
        nombre_de_matchs Int NOT NULL ,
        code_insee_ville Int NOT NULL ,
        frequence_sport  Varchar (50) NOT NULL
	,CONSTRAINT Joueur_PK PRIMARY KEY (email)

	,CONSTRAINT Joueur_Ville_Bretonne_FK FOREIGN KEY (code_insee_ville) REFERENCES Ville_Bretonne(code_insee_ville)
	,CONSTRAINT Joueur_condition_physique0_FK FOREIGN KEY (frequence_sport) REFERENCES condition_physique(frequence_sport)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sport
#------------------------------------------------------------

CREATE TABLE sport(
        nom_sport Varchar (50) NOT NULL
	,CONSTRAINT sport_PK PRIMARY KEY (nom_sport)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Matchs
#------------------------------------------------------------

CREATE TABLE Matchs(
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
        email_Joueur     Varchar (50) NOT NULL
	,CONSTRAINT Matchs_PK PRIMARY KEY (id_match)

	,CONSTRAINT Matchs_Ville_Bretonne_FK FOREIGN KEY (code_insee_ville) REFERENCES Ville_Bretonne(code_insee_ville)
	,CONSTRAINT Matchs_sport0_FK FOREIGN KEY (nom_sport) REFERENCES sport(nom_sport)
	,CONSTRAINT Matchs_Joueur1_FK FOREIGN KEY (email) REFERENCES Joueur(email)
	,CONSTRAINT Matchs_Joueur2_FK FOREIGN KEY (email_Joueur) REFERENCES Joueur(email)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: participe
#------------------------------------------------------------

CREATE TABLE participe(
        id_match Int NOT NULL ,
        email    Varchar (50) NOT NULL ,
        status   Int NOT NULL
	,CONSTRAINT participe_PK PRIMARY KEY (id_match,email)

	,CONSTRAINT participe_Matchs_FK FOREIGN KEY (id_match) REFERENCES Matchs(id_match)
	,CONSTRAINT participe_Joueur0_FK FOREIGN KEY (email) REFERENCES Joueur(email)
)ENGINE=InnoDB;


#------------------------------------------------------------
# INSERT: Données de base
#------------------------------------------------------------

INSERT INTO ville_bretonne VALUES (35093, 'Dinard');
INSERT INTO ville_bretonne VALUES (35238, 'Rennes');
INSERT INTO ville_bretonne VALUES (56247, 'Sulniac');
INSERT INTO ville_bretonne VALUES (29019, 'Brest');
INSERT INTO ville_bretonne VALUES (29232, 'Quimper');
INSERT INTO ville_bretonne VALUES (56121, 'Lorient');
INSERT INTO ville_bretonne VALUES (56260, 'Vannes');
INSERT INTO ville_bretonne VALUES (35239, 'Retiers');
INSERT INTO ville_bretonne VALUES (22070, 'Guingamp');
INSERT INTO ville_bretonne VALUES (22050, 'Dinan');

INSERT INTO condition_physique VALUES ('Plusieurs fois par semaine');
INSERT INTO condition_physique VALUES ('Une fois par semaine');
INSERT INTO condition_physique VALUES ('Une fois par mois');
INSERT INTO condition_physique VALUES ('Une fois par an');
INSERT INTO condition_physique VALUES ('Je ne pratique pas');

INSERT INTO sport VALUES ('Football');
INSERT INTO sport VALUES ('Basketball');
INSERT INTO sport VALUES ('Rugby');
INSERT INTO sport VALUES ('Quidditch');
INSERT INTO sport VALUES ('Baseball');

INSERT INTO Joueur VALUES ('test.inconnu@gmail.com','Test','Inconnu','1990-01-01','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','/img/FSI/deconnecte.png',0,22050,'Je ne pratique pas');
INSERT INTO Joueur VALUES ('lydie.hoarau@gmail.com','Lydie','Hoarau','2004-06-15','43dceacf94c98a0fbb1bf57592b484fd1d441d7f683ad3071c6f6d345b10821d','/img/FSI/femme.png',1,35093,'Plusieurs fois par semaine');
INSERT INTO Joueur VALUES ('brigitte.boutin@gmail.com','Brigitte','Boutin','1962-06-15','7bda17cb7f9504e7148d8f414e4a8f575bf5a7f78c8db4ae762036d7fc8a76b8','/img/FSI/femme.png',2,56247,'Une fois par semaine');
INSERT INTO Joueur VALUES ('gerald.carre@gmail.com','Gérald','Carre','1993-06-15','555c6d229006b9fcc644b67178da6ac14fcd4db0317f0bab246899622c8dd087','/img/FSI/homme.png',2,35238,'Une fois par mois');
INSERT INTO Joueur VALUES ('gilberte.chevallier@gmail.com','Gilberte','Chevallier','1976-06-15','da2192f0b1663a2bead52a2a5bacef313de8ffce090dbb7564d04541344a1c7b','/img/FSI/femme.png',1,29019,'Une fois par an');
INSERT INTO Joueur VALUES ('florian.dumont@gmail.com','Florian','Dumont','1990-06-15','1f71d7d4930be947354acf79b3283fc5cbcf05f907a93e72672ee162eb5407b8','/img/FSI/homme.png',2,29232,'Je ne pratique pas');
INSERT INTO Joueur VALUES ('cesar.benoist@gmail.com','César','Benoist','1970-06-15','36cf3936afb1e282548880df8e5edb4ff0b41395351ed5367ab98153765aac99','/img/FSI/homme.png',1,56121,'Plusieurs fois par semaine');
INSERT INTO Joueur VALUES ('albert.dumoulin@gmail.com','Albert','Dumoulin','2004-06-15','55dc57f95e14d55900a4123c57d7fd1bb0bfb89b6d548ffedaf60f15010e6211','/img/FSI/homme.png',1,56260,'Une fois par semaine');
INSERT INTO Joueur VALUES ('patoche.sebastrick@gmail.com','Patoche','Sebastrick','1953-06-15','a2efbc036a10cae00273490531294c5f4a22be17d3dc82d7d4bf616566c0fa02','/img/FSI/homme.png',0,35239,'Une fois par mois');
INSERT INTO Joueur VALUES ('pierre.giraud@gmail.com','Pierre','Giraud','1977-06-15','f20f4a366300a09e5f983292963203a8f49a78e249995b77062ce5952bff7721','/img/FSI/homme.png',0,22070,'Une fois par an');
INSERT INTO Joueur VALUES ('silvie.livie@gmail.com','Silvie','Livie','1984-06-15','b47ae3d2231d86ec722219547453e87d8cf5b6379d9275f0e05a5bdc7e8db76d','/img/FSI/femme.png',1,22050,'Je ne pratique pas');

INSERT INTO Matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_Joueur) VALUES ('Match de Football Test 1', '2022-06-20 15:30:00', '03:00:00', 'Description du match de Football', 2, 6, 0, 0, 'Rue de la paix', NULL, NULL, 35093, 'Football', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO Matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_Joueur) VALUES ('Match de Basket Test 1', '2022-06-21 19:30:00', '02:00:00', 'Description du match de Basket', 2, 10, 10, 0, 'Rue de la paix', NULL, NULL, 35238, 'Basketball', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO Matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_Joueur) VALUES ('Match de Rugby Test 1', '2022-06-22 14:00:00', '03:00:00', 'Description du match de Rugby', 5, 14, 0, 0, 'Rue de la paix', NULL, NULL, 29019, 'Rugby', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO Matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_Joueur) VALUES ('Match de Quidditch Test 1', '2022-06-23 15:00:00', '01:00:00', 'Description du match de Quidditch', 3, 15, 5.5, 0, 'Rue de la paix', NULL, NULL, 29232, 'Quidditch', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO Matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_Joueur) VALUES ('Match de Baseball Test 1', '2022-06-24 11:00:00', '03:00:00', 'Description du match de Baseball', 4, 18, 1, 0, 'Rue de la paix', NULL, NULL, 56247, 'Baseball', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');

INSERT INTO participe(id_match, email, status) VALUES (1, 'lydie.hoarau@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'brigitte.boutin@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'gerald.carre@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'gilberte.chevallier@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'florian.dumont@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'cesar.benoist@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (2, 'lydie.hoarau@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (2, 'brigitte.boutin@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (3, 'lydie.hoarau@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (3, 'brigitte.boutin@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (3, 'gerald.carre@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'lydie.hoarau@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (4, 'gerald.carre@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (4, 'florian.dumont@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'albert.dumoulin@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'silvie.livie@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (5, 'lydie.hoarau@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (5, 'gerald.carre@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (5, 'gilberte.chevallier@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (5, 'florian.dumont@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (5, 'patoche.sebastrick@gmail.com', 0);
INSERT INTO participe(id_match, email, status) VALUES (5, 'silvie.livie@gmail.com', 0);
 




