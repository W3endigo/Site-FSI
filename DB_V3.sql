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
#------------------------------------------------------------
# Les mdp sont joueur0, joueur1, joueur2, joueur3, joueur4, joueur5, joueur6, joueur7, joueur8, joueur9, joueur10
#------------------------------------------------------------
INSERT INTO joueur VALUES ('test.inconnu@gmail.com','Test','Inconnu','1990-01-01','$2y$10$ixlwz5g12ZucSrLa83EJBexZBkDMgRDIPjs4wR53CLgCrZWUiGfPy','../../ressources/deconnecte.png',0,22050,'Je ne pratique pas');
INSERT INTO joueur VALUES ('lydie.hoarau@gmail.com','Lydie','Hoarau','2004-06-15','$2y$10$XwNHp./dy0AbnYkZOOB21.DdwJVgUU/JaafMQtJNcV7TDZEMJ10vG','../../ressources/femme.png',5,35093,'Plusieurs fois par semaine');
INSERT INTO joueur VALUES ('brigitte.boutin@gmail.com','Brigitte','Boutin','1962-06-15','$2y$10$7BSZYEI/L4F3tBGb75ZBROpkf0Ekg9AzPvOJ4axFKaUNL28LmXr4C','../../ressources/femme.png',3,56247,'Une fois par semaine');
INSERT INTO joueur VALUES ('gerald.carre@gmail.com','Gérald','Carre','1993-06-15','$2y$10$ttci6RpZtEEXhxEtxCQQLOGgVa8XTqeLSxCxR9h.limIhybTZhk2.','../../ressources/femme.png',4,35238,'Une fois par mois');
INSERT INTO joueur VALUES ('gilberte.chevallier@gmail.com','Gilberte','Chevallier','1976-06-15','$2y$10$9fkWmyKjrtyWGDVpOv128uecllYxBfqtBOmIhMx6bkUgLpmONQNYO','../../ressources/femme.png',2,29019,'Une fois par an');
INSERT INTO joueur VALUES ('florian.dumont@gmail.com','Florian','Dumont','1990-06-15','$2y$10$DFFkHiZ9xDzACSHVYHGArOdlcUC2nVbwfPXlj8deZ6ZiUw0bOnYVi','../../ressources/homme.png',3,29232,'Je ne pratique pas');
INSERT INTO joueur VALUES ('cesar.benoist@gmail.com','César','Benoist','1970-06-15','$2y$10$qArttVysSZIkQlXaKgFZou9/WzUKUzn57bu5YzG8eCo1GMIynUzpy','../../ressources/homme.png',1,56121,'Plusieurs fois par semaine');
INSERT INTO joueur VALUES ('albert.dumoulin@gmail.com','Albert','Dumoulin','2004-06-15','$2y$10$Ub65k0jSHkDsIqHerrlQH.OQYuJvi8zl0A8w6pfnJxDD3sQ.gwHaS','../../ressources/homme.png',1,56260,'Une fois par semaine');
INSERT INTO joueur VALUES ('patoche.sebastrick@gmail.com','Patoche','Sebastrick','1953-06-15','$2y$10$Pp/2aYTFeDH0rjwGMEMXY.kkb8HyandLFM3JphNerSXuExSHivZ6K','../../ressources/homme.png',1,35239,'Une fois par mois');
INSERT INTO joueur VALUES ('pierre.giraud@gmail.com','Pierre','Giraud','1977-06-15','$2y$10$MsOWquWbYvEX1c9.YzDtcemZjWOoPcjqAN8PyrJrX/SnEhnd6wOBW','../../ressources/homme.png',0,22070,'Une fois par an');
INSERT INTO joueur VALUES ('silvie.livie@gmail.com','Silvie','Livie','1984-06-15','$2y$10$cJ9NK8EbOZWdqsmTKT9cc.PHt3GJZTo7Ywnn2itOE2PnUTyo2qpMS','../../ressources/homme.png',2,22050,'Je ne pratique pas');


INSERT INTO matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_joueur) VALUES ('Match de Football Test 1', '2022-06-25 15:30:00', '03:00:00', 'Description du match de Football', 2, 6, 0, 0, 'Rue de la paix', NULL, NULL, 35093, 'Football', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_joueur) VALUES ('Match de Basket Test 1', '2022-06-26 19:30:00', '02:00:00', 'Description du match de Basket', 2, 10, 10, 0, 'Rue de la paix', NULL, NULL, 35238, 'Basketball', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_joueur) VALUES ('Match de Rugby Test 1', '2022-06-22 14:00:00', '03:00:00', 'Description du match de Rugby', 5, 14, 0, 0, 'Rue de la paix', NULL, NULL, 29019, 'Rugby', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_joueur) VALUES ('Match de Quidditch Test 1', '2022-06-23 15:00:00', '01:00:00', 'Description du match de Quidditch', 3, 15, 5.5, 0, 'Rue de la paix', NULL, NULL, 29232, 'Quidditch', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');
INSERT INTO matchs(titre, horaire, duree, description, participant_min, participant_max, prix, termine, adresse, score_home, score_away, code_insee_ville, nom_sport, email, email_joueur) VALUES ('Match de Baseball Test 1', '2022-06-24 11:00:00', '03:00:00', 'Description du match de Baseball', 4, 18, 1, 0, 'Rue de la paix', NULL, NULL, 56247, 'Baseball', 'test.inconnu@gmail.com', 'test.inconnu@gmail.com');

INSERT INTO participe(id_match, email, status) VALUES (1, 'lydie.hoarau@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'brigitte.boutin@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'gerald.carre@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'gilberte.chevallier@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'florian.dumont@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (1, 'cesar.benoist@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (2, 'lydie.hoarau@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (2, 'brigitte.boutin@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (3, 'lydie.hoarau@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (3, 'brigitte.boutin@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (3, 'gerald.carre@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'lydie.hoarau@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'gerald.carre@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'florian.dumont@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'albert.dumoulin@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (4, 'silvie.livie@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (5, 'lydie.hoarau@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (5, 'gerald.carre@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (5, 'gilberte.chevallier@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (5, 'florian.dumont@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (5, 'patoche.sebastrick@gmail.com', 1);
INSERT INTO participe(id_match, email, status) VALUES (5, 'silvie.livie@gmail.com', 1);
 




