"use strict"

/**
 * Utiliser infor.change pour les insertion, suppremssion et modification avec .run()
 * Utiliser .get pour les selection car il n'y a pas de modification du type (insertion, suppression et modification)
 */

const Sqlite = require('better-sqlite3'); // Chargement du module better-sqlite3 qui permet la création et gestion d'une base de données relationnelle

let db = new Sqlite('db.sqlite'); // Création de notre base de donnée

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


/**
 * La fonxtion create crée une annonce dans la base de donées.
 * Elle retourne l'id si le nombre de changement effectué dans la base de donnée est supérieure à 0, sinon elle retourne -1
 * @param {*} title 
 * @param {*} salary 
 * @param {*} type_of_job 
 * @param {*} description 
 * @returns 
 */
exports.create = function(title, salary, type_of_job, description, id_company) {
  let annunce_created = db.prepare("INSERT INTO annunce (title, salary, type_of_job, description, id_company) VALUES (?,?, ?, ?,?)").run(title, salary, type_of_job, description, id_company);
  if(annunce_created.changes > 0){
      return annunce_created.lastInsertRowid;
  }else{
      return -1;
  }
  }

  
/**
 * La fonction update modifie le contenue d'une annonce dans la base de données.
 * Elle retourne true si le nombre de changement éffectué dans la base de données est supérieure à 1, sinon elle retourne false
 * @param {*} id_annunce 
 * @param {*} title 
 * @param {*} salary 
 * @param {*} type_of_job 
 * @param {*} description 
 * @returns 
 */
exports.update = function(id_annunce,title, salary, type_of_job, description ) {
    let update = db.prepare("UPDATE annunce SET title= ?, salary=?,type_of_job=?, description=?  WHERE id_annunce =  " + id_annunce).run(title, salary, type_of_job, description);
  if(update.changes > 0){
    return true;
  }else{
      return false;
    }
  }

/**
 * La fonction delete supprime une annonce dans la base de donnée.
 * Elle return true si le nombre de changement éffectué dans la base de données est supérieur à 1 sinon elle retourne faux.
 * @param {*} id_annunce 
 * @returns 
 */
exports.delete = function(id_annunce) {
    let deleter = db.prepare("DELETE  FROM annunce WHERE id_annunce = ?").run(id_annunce);
    if(deleter.changes > 0){
        return true;
    }
    return false;
  }

  /**
   * Cette Fonction retourne la liste des annonce se trouvant dans la base de données
   * @returns 
   */
  exports.list = function(){
    let movie_list = db.prepare('SELECT * FROM annunce INNER JOIN company ON annunce.id_company = company.id_company').all();
    return movie_list;
  }

  /**
   * Cette fonction retourne une liste de résultats en fonction de la recherche faite par l'utilisateur.
   * Les recherche seront faites en fontion du secteur d'activité
   */
  exports.search = function(){

  }
  
/***************************Fonction relative aux students********************************* */
/**
 * La fonction company_new_user crée un nouvelle utilisateur (Etudiant).
 * Elle retourne le nombre de changement éffectué par l'insersion( c-a-d 1)
 * @param {*} first_name 
 * @param {*} last_name 
 * @param {*} mail 
 * @param {*} password 
 * @returns 
 */
 exports.student_new_user = (first_name, last_name, mail, password) =>{
    let student = db.prepare("INSERT INTO student (first_name, last_name, mail, password) VALUES (?,?, ?, ?)").run(first_name, last_name, mail, password);
    if(student.changes > 0){
      return student.lastInsertRowid;
  }else{
      return -1;
  }
  }


  /**
   * La fonction studen verifie si le mail et le mot de passe mis en paramètre sont celle d'un des utilisateur (Etudian).
   * Elle retourne l'id de l'étudiant si'il est bien authentifié sinon il retourne -1.
   * @param {*} mail 
   * @param {*} password 
   * @returns 
   */
 exports.studen_login = (mail, password)=>{
    let student = db.prepare("SELECT * FROM student WHERE mail = ? AND password=?").get(mail, password);
    // return user? user.rowid: -1;
    if(!student) return -1;
     return student.id_student; // return l'id de l'utilisateur;
  }

  
  
  

/***************************Fonction relative auxEntreprise******************************** */
/**
 * La fonction company_new_user crée un nouvelle utilisateur (entreprise).
 * Elle retourne le nombre de changement éffectué par l'insersion( c-a-d 1)
 * @param {*} name 
 * @param {*} identifiant 
 * @param {*} password 
 * @param {*} website 
 * @param {*} activity_area 
 * @param {*} address 
 * @returns 
 */
 exports.company_new_user = (name, identifiant, password, website, activity_area, address) =>{
    let company = db.prepare("INSERT INTO company (name, identifiant, password, website, activity_area, address) VALUES (?,?, ?, ?,?,?)").run(name, identifiant, password, website, activity_area, address);
    if(company.changes > 0){
      return company.lastInsertRowid;
  }else{
      return -1;
  }
  }
  

  /**
   * La fonction company_login verifie si l'identifiant et le mot de passe mis en paramètre sont celle d'un des utilisateur (Entreprise).
   * Elle retourne l'id de l'entreprise si'il est bien authentifié sinon il retourne -1.
   * @param {*} identifiant 
   * @param {*} password 
   * @returns 
   */
 exports.company_login = (identifiant, password)=>{
    let company = db.prepare("SELECT * FROM company WHERE identifiant = ? AND password=?").get(identifiant, password);
    // return user? user.rowid: -1;
    if(!company) return -1;
     return company.id_company; // return l'id de l'utilisateur;
  }

  /**
   * Cette fonction retourne la liste des annonces créé par l'entreprise d'identifiant id_company.
   */
  exports.company_annunces = function(id_company){
    let company_annunces = db.prepare("SELECT * FROM annunce INNER JOIN company ON annunce.id_company = company.id_company WHERE company.id_company = ?").all(id_company);
    if(!company_annunces) return -1;
    return company_annunces;
  }

  
  

  /****************************Fonction relative à l'administrateur****************************** */

  /**
   * La fonction administrator_login verifie si l'identifiant et le mot de passe mis en paramètre sont celle de l'administrateur.
   * Elle retourne l'id de l'administrateur
   * @param {*} identifiant 
   * @param {*} password 
   * @returns 
   */
  exports.administrator_login = (identifiant, password)=>{
    let admin = db.prepare("SELECT * FROM administrator WHERE identifiant = ? AND password=?").get(identifiant, password);
    // return user? user.rowid: -1;
    if(!admin) return -1;
     return admin.id_administrator; // return l'id de l'utilisateur;
  }

/**********************Fonctioin relative au postulation*********************** */
/**
   * Cette fonction d'ajouter à la postulate un couple de postulatin (étudiant, annonce)
   */
 exports.postuler = function(id_student, id_annunce,address,telephone, cv,motivation_letter){
  let add = db.prepare("INSERT INTO postulate (id_student, id_annunce, address, telephone, cv, motivation_letter) VALUES (?,?,?,?,?,?)").run(id_student,id_annunce, address, telephone, cv, motivation_letter);
  if(add.changes > 0){
    return add.lastInsertRowid;
    }else{
    return -1;
  }
}


  /**
   * Cette fonction retourne La liste des étudiants ayant postulé pour une annonce.
   */
  exports.student_annunces_postulates = function(id_annunce){
    let student_annunces_postulate = db.prepare("SELECT * FROM student INNER JOIN postulate ON student.id_student = postulate.id_student WHERE id_annunce = ?").get(id_annunce);
    if(!student_annunces_postulate) return -1;
    return student_annunces_postulate
   }
  
  /**
   * Cette fonction retourne la liste des annonces postulé par un étudiant
   */
  exports.annunces_tudent_postulates = function(id_student){
    let student_annunces_postulate = db.prepare("SELECT * FROM annunce INNER JOIN postulate ON annunce.id_annunce = postulate.id_annunce WHERE id_student = ?").get(id_student);
    if(!student_annunces_postulate) return -1;
    return student_annunces_postulate
  }

  exports.search = function(activity_area){
    let annunces = db.prepare('SELECT * FROM annunce INNER JOIN company ON annunce.id_company = company.id_company WHERE company.activity_area = ? ').all(activity_area);
    if(!annunces) return -1;
    return annunces;
  } 

  exports.title_search = function(activity_area){
    let annunces = db.prepare('SELECT * FROM annunce INNER JOIN company ON annunce.id_company = company.id_company WHERE  annunce.title = ? ').all(activity_area);
    if(!annunces) return -1;
    return annunces;
  } 