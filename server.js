let express = require("express");
let mustache = require("mustache-express");

let app = express(); // Création du server
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

let model = require('./model');

app.get('/', (req, res) =>{
    
})


/**
 * Fonction à vérifier : fonction sur les étudiants, les entreprises et l'administrateur
 */


app.listen(3000, ()=>{
    console.log("Server listening on port http://localhost:3000");
})