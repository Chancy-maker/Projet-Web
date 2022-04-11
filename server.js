let express = require("express");
const { Session } = require("inspector");
let mustache = require("mustache-express");

let model = require('./model');
let app = express(); // Création du server

// Chargement du module cookie-session
const cookieSession = require('cookie-session');

// parse form arguments in POST request
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

/************Routes pour voir les page du site************/

/**
 * A chaque requête on va garder les informations de session dans un cookie crypté
 */
app.use(cookieSession ({
    //Nom de la session cookie (par defaul : session)
    name : 'session',
    //chaine secrète utilisée pour encrypté et signer le cookie
    secret : 'dliqudshfqiuh fiuhfq iusdq',
    // Envoyer notre cookie uniquement lors de la connexion à notre site
    sameSite : 'strict' 
}));

/**
 * Le midleware is_authenticated permettra le contrôle d'accès, il verifira que la session contitien un identifiant d'utilisateur (et non de session)
 * et renverra une erreur 404(accès non authorisé) si ce n'est pas le cas.
 * Il sera utilisé uniquement sur les route à accès restreint.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
 function is_authenticated(req, res, next) {
    if (req.session.user === undefined) {
      res.status(401).send("You can not create à annunce");
      
    }return next();
    
  }



// middleware qui ajoute deux variables de session aux templates : authenticated et le nom de l'utilisateur
app.use(function(req, res, next) {
    if (req.session.user !== undefined) {
      res.locals.authenticated = true;
      res.locals.name = req.session.name;
    }
    return next();
  });


  

/**
 * Renvoie la page d'accueil du site
 */
app.get('/', (req, res) =>{
  res.render('index', {annunces : model.list()});
})

/**
 * Retourne les résultat de la recherche à partir de la requête "query" (Optionnel pour l'instant)
 */
app.get('/search', (req, res) =>{

});

/**
 * Retourne le contenu d'une annonce d'identifiant "id"
 */
app.get('/read/:id_annunce', (req, res) =>{
    var entry = model.read(req.params.id_annunce);
    res.render('read', entry);
});


/**
 * Renvoie le formulaire de création d'une annonce
 */
app.get('/create',is_authenticated, (req, res) =>{
    res.render('create')
});

/**
 * Retourner le formulaire de modification
 */
app.get('/update/:id_annunce',is_authenticated, (req, res) =>{
    let entry = model.read(req.params.id_annunce);
    res.render('update', entry);
});

/**
 * Retourne le formualire de suppression
 */
app.get('/delete/:id_annunce',is_authenticated, (req, res) =>{
    let entry = model.read(req.params.id_annunce);
    res.render('delete', {id_annunce: req.params.id_annunce, title: entry.title});
  });


/**
 * Retourne le formulaire de connexion pour les étudiants
 */
app.get('/student_login', (req, res) =>{
    res.render('student_login');
})

/**
 * Retourne le formulaire de connnexion pour les entreprise
 */
app.get('/company_login', (req, res) =>{
    res.render('company_login');
})

app.get('/logout', (req, res) =>{
  req.session = null;
  res.redirect('/');
})



/**
 * Retourne le formulaire de création de compte pour les étudiants
 */
app.get('/new_user_student', (req, res) =>{
    res.render('new_user_student');
})

/**
 * Retourne le formlaire de création de compte pour les entreprises
 */
app.get('/new_user_company', (req, res) =>{
    res.render('new_user_company');
})

/**
 * Retourne l'espace personnel des étudiants
 */
app.get('/student_space', (req, res) =>{
  res.render('student_space', {annunces : model.list()});
})
 /**
  * Retourne L'espace personnel des entreprises
  */
 app.get('/company_space', (req, res) =>{
   res.render('company_space', {annunces : model.list()});
 })


/******************Routs pour modifier les données****************** */


app.post('/create', (req, res) =>{
  console.log(req.session.user);
    let id_annunce = model.create(req.body.title, req.body.salary, req.body.type_of_job, req.body.description,req.session.user )
    res.redirect('/read/' + id_annunce);
})

app.post('/update/:id_annunce', (req, res) =>{
    model.update(req.params.id_annunce,req.body.title, req.body.salary, req.body.type_of_job, req.body.description)
    res.redirect('/read/' + req.params.id_annunce);
})

app.post('/delete/:id_annunce', (req, res) =>{
    model.delete(req.params.id_annunce);
  res.redirect('/');
})

app.post('/student_login', (req, res) =>{
    const user = model.studen_login(req.body.mail, req.body.password);
    if (user != -1) {
    req.session.user = user;
    req.session.name = req.body.mail;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
}) 
app.post('/company_login', (req, res) =>{
    const user = model.company_login(req.body.identifiant, req.body.password);
    if (user != -1) {
    req.session.user = user;
    req.session.name = req.body.identifiant;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
}) 



app.post('/student_new_user', (req, res) =>{
    const user = model.student_new_user(req.body.first_name, req.body.last_name, req.body.mail, req.body.password);
  if (user != -1) {
    req.session.user = user;
    req.session.name = req.body.mail;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
})

app.post('/company_new_user', (req, res) =>{
  const user = model.company_new_user(req.body.name, req.body.identifiant, req.body.password, req.body.website, req.body.activity_area, req.body.address);
if (user != -1) {
  req.session.user = user;
  req.session.name = req.body.identifiant;
  res.redirect('/');
} else {
  res.redirect('/');
}
})




app.listen(1921, ()=>{
    console.log("Server listening on port http://localhost:1921");
})