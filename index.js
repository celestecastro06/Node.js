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

app.get("/",(req,res, next) => {
    return res.status(200).send("Bienvenido al Pokedex");
});

app.get('/pokemon/all', (req, res, next) => {
    return res.statu(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id - 1;
   (id >= 0 && id <= 150) ?
     res.status(200).send(pokemon[req.params.id - 1]) :
	 res.status(404).send("Pokemon no encontrado.");
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
	const name = req.params.name;
	
	const pk = pokemon.filter((p) => {
		return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
		});

	(pk.length > 0) ? 
		res.status(200).send(pk) :
		res.status(404).send("Pokemon no encontrado");

});

app.listen(process.env.PORT || port,()=>{
    console.log("Corriendo en el puerto ", port)
});




