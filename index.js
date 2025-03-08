const express = require('express');
const app = express();
const port = 3000;
const { pokemon } = require('./pokedex.json');

app.get("/",(req,res, next) => {
    res.status(200);
    res.send("Bienvenido al Pokedex");
});

app.get('/pokemon', (req, res, next) => {
    res.status(200);
    res.send(pokemon);
});

app.get('/pokemon/:id', (req, res, next) => {
    res.status(200);
    res.send(pokemon[req.params.id - 1]);
})

app.listen(process.env.PORT || port,()=>{
    console.log("Corriendo en el puerto ", port)
})
