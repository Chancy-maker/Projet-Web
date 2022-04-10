"use strict"
/**
 * Le fait d'avoir les tables dans une un autre fichier que celui du modèle permet de rajouter les élément dans la dans la base de données sans 
 * qu'il sois supprimé à chaque fois.
 */
const Sqlite = require('better-sqlite3'); // Chargement du module better-sqlite3 qui permet la création et gestion d'une base de données relationnelle

let db = new Sqlite('db.sqlite'); // Création de notre base de donnée

//Création de la table administrator
db.prepare("DROP TABLE IF EXISTS administrator").run();
db.prepare("CREATE TABLE administrator (id_administrator INTEGER PRIMARY KEY AUTOINCREMENT, identifiant TEXT,password TEXT)").run();

//insertion de l'adiministrateur
db.prepare("INSERT INTO administrator (identifiant, password) VALUES ('admin', 'admin')").run();

//Création de la table company
db.prepare("DROP TABLE IF EXISTS company").run();
db.prepare("CREATE TABLE company (id_company INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, identifiant TEXT, password TEXT, website TEXT, activity_area TEXT, address TEXT)").run();

//insertion de deux entreprises
db.prepare("INSERT INTO company (name, identifiant, password, website, activity_area, address) VALUES ('Orange', 'Orange', 'Orange2010', 'https://www.orange.fr/', 'Informatique', 'Boutique Orange Canebière - Marseille, 30 RUE DE, La Canebière, 13001')").run();
db.prepare("INSERT INTO company (name, identifiant, password, website, activity_area, address) VALUES ('Sopra Steria', 'Sopra', 'steria2010', 'https://www.soprasteria.fr/', 'Informatique', 'Sopra Steria Group, Bâtiment Olympe, 550 Rue Pierre Berthier CS 40496, 13290 Aix-en-Provence')").run();


//Création de la table annunce
db.prepare("DROP TABLE IF EXISTS annunce").run();
db.prepare("CREATE TABLE annunce (id_annunce INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, salary TEXT, type_of_job TEXT, description TEXT,id_company INTEGER)").run();

//insertion de deux annonces
db.prepare("INSERT INTO annunce (title, salary, type_of_job, description, id_company) VALUES ('Developpeur Web Front-end', '1500£/mois', 'Stage', 'Developpeur web junior, compétence recherché : HTML, CC, javascript',1)").run();
db.prepare("INSERT INTO annunce (title, salary, type_of_job, description, id_company) VALUES ('Ingénieur en cyber sécurité', '2000£/mois', 'CDI', 'Cherche expert en cyber sécurité', '2')").run();


//Création de la table student
db.prepare("DROP TABLE IF EXISTS student").run();
db.prepare("CREATE TABLE student (id_student INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT,last_name TEXT, mail TEXT, password TEXT) ").run();

//insertion de deux étudiants
db.prepare("INSERT INTO student (first_name, last_name, mail, password) VALUES ('Akpata', 'Kodjo Pierre', 'pierreakpata8@gmail.com', 'Pierre2022@')").run();
db.prepare("INSERT INTO student (first_name, last_name, mail, password) VALUES ('BAYEDI-MAYOMBO', ' Chancy', 'bayedi20@gmail.com', 'Chancy2022@')").run();


//Création de la table posulate
db.prepare("DROP TABLE IF EXISTS postulate").run();
db.prepare("CREATE TABLE postulate (id_postulate INTEGER PRIMARY KEY AUTOINCREMENT, id_annunce INTEGER, id_student INTEGER)").run();
