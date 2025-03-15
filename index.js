const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const { pokemon } = require('./pokedex.json');

/* 
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso 
PUT - modificar recursos 
DELETE - borrar un recurso
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res, next) => {
    return res.status(200).send("Bienvenido al Pokedex");
}); 

app.post("/pokemon", (req, res, next) => {
	return res.status(200).send(req.body);
})

app.get('/pokemon', (req, res, next) => {
    return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id - 1;

   if (id >= 0 && id <= 150) {
     res.status(200).send(pokemon[req.params.id - 1]);
   }
   return res.status(404).send("Pokemon no encontrado.");
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
	const name = req.params.name;
	
	const pk = pokemon.filter((p) => {
		return (p.name.toUpperCase() == name.toUpperCase()) && p;
		});

	if (pk.length > 0) {
		return res.status(200).send(pk);
	}
	return res.status(404).send("Pokemon no encontrado");

});

app.listen(process.env.PORT || port,() => {
    console.log("Corriendo en el puerto... ", port)
});




