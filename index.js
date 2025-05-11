//Dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const port = 3000;
const pokemon = require('./routes/pokemon');
const user = require('./routes/user'); 
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

/* 
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso 
PUT - modificar recursos 
DELETE - borrar un recurso
*/

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notFound);

app.listen(process.env.PORT || port,() => {
    console.log("Corriendo en el puerto... ", port)
});




