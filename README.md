# Site-FSI

Vous avez choisi d'utiliser notre produit pour votre organisation de matchs et nous vous en remercions.

# **Attention ! Veuillez vérifier que votre machine virtuelle possède les installations suivantes :**
• Apache 2
• PHP 7.4
• MySQL5.7 


# Voici les commandes à réaliser pour installer votre site : 

## Pour commencer, connectez-vous en sftp sur votre VM.

` sftp votre-nom-d'user@adresse_de_votre_serveur`


## Déplacez-vous jusqu'au dossier *Site-FSI.zip* grâce à la commande :
 
` lcd "chemin_du_dossier_contenant_Site-FSI.zip"`


## Puis transférez votre dossier *Site-FSI* grâce à la commande :
 
` put "Site-FSI.zip"`


## Vous pouvez maintenant vous déconnecter du serveur sftp : 

` exit`


## Dans un deuxième temps, connectez-vous à votre machine distante en ssh :

` ssh votre-nom-d'user@adresse_de_votre_serveur`


## Avant tout, installez Unzip pour décompresser votre dossier :

` sudo apt install unzip`

## Grâce à la commande cd, déplacez-vous jusqu'à votre repertoir principal.

## Puis décompressez le dossier *Site-FSI.zip* dans votre machine distante (n'oubliez pas de suprimer le fichier index.html qui est présent de base dans le dossier /var/www/html/) : 

` sudo unzip -q Site-FSI.zip -d /var/www/html/`

## Maintenant, connectez-vous à mysql, en n'oubliant pas de lancer votre service MYSQL  :

`mysql -u fsi -p`


## Puis créez la base de données :

` SOURCE /var/www/html/Site-FSI/DB_V3.sql`



# Et voilà, votre site est prêt à l'utilisation ! N'oubliez pas de lancer votre serveur apache s'il ne l'est pas déjà.

` sudo service apache2 restart`

# Identifiant d'un utilisateur déjà inscrit pour tester les fonctionnalité du site :
    
    email  : test.inconnu@gmail.com   
    mot de passe : joueur0



# Une question ? Un problème ? Contactez-nous sur nos réseaux !



Produit développé par Matthis MIAUD & Antoine NOËL.

