let express = require("express");
let mustache = require("mustache-express");

let app = express(); // Création du server
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

let model = require('./model');

app.get('/', (req, res) =>{
    
})


let create = model.create("Developpeur Back-End", "2500£/mois", "CDI", "Cherche un déloppeur expérimenté");
console.log(create);
let read = model.read(1);
console.log(read);

let update = model.update(1, "Boulangé","2500£/mois", "CDI", "Cherche un boulangé expérimenté" )

let liste = model.list();
for (let an = 0; an < liste.length; an++) {
    
    console.log(liste[an]);
}
app.listen(3000, ()=>{
    console.log("Server listening on port http://localhost:3000");
})