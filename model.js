"use strict"

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
db.prepare("CREATE TABLE annunce (id_annunce INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, salary TEXT, type_of_job TEXT, description TEXT,id_company )").run();

//insertion de deux annonces
db.prepare("INSERT INTO annunce (title, salary, type_of_job, description) VALUES ('Developpeur Web Front-end', '1500£/mois', 'Stage', 'Developpeur web junior, compétence recherché : HTML, CC, javascript')").run();
db.prepare("INSERT INTO annunce (title, salary, type_of_job, description) VALUES ('Ingénieur en cyber sécurité', '2000£/mois', 'CDI', 'Cherche expert en cyber sécurité')").run();


//Création de la table student
db.prepare("DROP TABLE IF EXISTS student").run();
db.prepare("CREATE TABLE student (id_student INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT,last_name TEXT, mail TEXT, password TEXT) ").run();

//insertion de deux étudiants
db.prepare("INSERT INTO student (first_name, last_name, mail, password) VALUES ('Akpata', 'Kodjo Pierre', 'pierreakpata8@gmail.com', 'Pierre2022@')").run();
db.prepare("INSERT INTO student (first_name, last_name, mail, password) VALUES ('BAYEDI-MAYOMBO', ' Chancy', 'bayedi20@gmail.com', 'Chancy2022@')").run();


/**************************Fonction relative aux annunce************************* */

/* Lire le contenu d'une annonce à partir de son identifiant.

Cette fonction prend en argument un identifiant d'annonce.

Elle renvoie une annonce sous la forme d'un objet :
- title: son titre
-salary: salaire
- type_of_job: Le type d'emploie
- description: la description textuelle de la recette

Cette fonction renvoie null si l'identifiant n'existe pas.
 */
exports.read = (id_annunce) => {
    let found = db.prepare('SELECT * FROM annunce WHERE id_annunce = ?').get(id_annunce);
    if(found !== undefined) {
      return found;
    } else {
      return null;
    }
  };



exports.create = function(title, salary, type_of_job, description) {
  let annunce_created = db.prepare("INSERT INTO annunce (title, salary, type_of_job, description) VALUES (?,?, ?, ?)").run(title, salary, type_of_job, description);
  return annunce_created.lastInsertRowid;
  }

  
/**
 * 
 * @param {*} id_annunce 
 * @param {*} title 
 * @param {*} salary 
 * @param {*} type_of_job 
 * @param {*} description 
 * @returns 
 */
exports.update = function(id_annunce,title, salary, type_of_job, description ) {
    let movie_list = db.prepare('SELECT * FROM annunce ORDER BY id_annunce').all();
  
  if(id_annunce > movie_list.length){
    return false
  }else{
    db.prepare("UPDATE annunce SET title= ?, salary=?,type_of_job=?, description=?  WHERE id_annunce =  " + id_annunce).run(title, salary, type_of_job, description);

    return true;
    }
  }

/**
 * 
 * @param {*} id_annunce 
 * @returns 
 */
exports.delete = function(id_annunce) {
    let deleter = db.prepare("DELETE * FROM annunce WHERE id_annunce = ?").run(id_annunce);
    return deleter.changes > 0;
  }

  /**
   * Cette Fonction retourne la liste des annonce se trouvant dans la base de données
   * @returns 
   */
  exports.list = function(){
    let movie_list = db.prepare('SELECT * FROM annunce ORDER BY id_annunce').all();
    return movie_list;
  }
  
/***************************Fonction relative aux students********************************* */
/**
 * La fonction login permet de renvoyer le numéro d'utilisateur s'il est bien authentifié, ou -1 sinon
 */
 exports.studen_login = (mail, password)=>{
    let student = db.prepare("SELECT * FROM student WHERE mail = ? AND password=?").get(mail, password);
    // return user? user.rowid: -1;
    if(!student) return -1;
     return student.rowid; // return l'id de l'utilisateur;
  }
  
  exports.student_new_user = (first_name, last_name, mail, password) =>{
    let student = db.prepare("INSERT INTO student (first_name, last_name, mail, password) VALUES (?,?, ?, ?)").run(first_name, last_name, mail, password);
    return student.lastInsertRowid;
  }

/***************************Fonction relative auxEntreprise******************************** */
/**
 * La fonction login permet de renvoyer le numéro d'utilisateur s'il est bien authentifié, ou -1 sinon
 */
 exports.company_login = (identifiant, password)=>{
    let company = db.prepare("SELECT * FROM company WHERE identifiant = ? AND password=?").get(identifiant, password);
    // return user? user.rowid: -1;
    if(!company) return -1;
     return company.rowid; // return l'id de l'utilisateur;
  }
  
  exports.company_new_user = (name, identifiant, password, website, activity_area, address) =>{
    let company = db.prepare("INSERT INTO company (name, identifiant, password, website, activity_area, address) VALUES (?,?, ?, ?,?,?)").run(name, identifiant, password, website, activity_area, address);
    return company.lastInsertRowid;
  }

  /****************************Fonction relative à l'administrateur****************************** */
  exports.company_login = (identifiant, password)=>{
    let admin = db.prepare("SELECT * FROM company WHERE identifiant = ? AND password=?").get(identifiant, password);
    // return user? user.rowid: -1;
    if(!admin) return -1;
     return admin.rowid; // return l'id de l'utilisateur;
  }