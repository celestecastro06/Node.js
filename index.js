const morgan = require('morgan');
const express = require('express');
const app = express();
const port = 3000;
const pokemon = require('./routes/pokemon');

/* 
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso 
PUT - modificar recursos 
DELETE - borrar un recurso
*/

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res, next) => {
    return res.status(200).send("Bienvenido al Pokedex");
}); 

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || port,() => {
    console.log("Corriendo en el puerto... ", port)
});




