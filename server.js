let express = require("express");
const { Session } = require("inspector");
let mustache = require("mustache-express");

let model = require('./model');
let app = express(); // Création du server

// Chargement du module cookie-session
const cookieSession = require('cookie-session');

// parse form arguments in POST request
const bodyParser = require('body-parser');
const {Session} = require('inspector');
app.use(bodyParser.urlencoded({extended : false}));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');



app.get('/', (req, res) =>{
    
})


/**
 * Fonction à vérifier : fonction sur les étudiants, les entreprises et l'administrateur
 */


app.listen(3000, ()=>{
    console.log("Server listening on port http://localhost:3000");
})