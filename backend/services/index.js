//importo el express y el cors
const express = require('express');
const cors = require('cors');
//importo el fichero login.js que está en la carpeta services
const login = require('./login');
const item = require('./item');
const helper = require('./helper')
//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint es / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
});

//Creación del endpoint /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});
/*
app.get('/Additem', async function(req, res, next) {
    try {
        res.json(await item.insertData(req))
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
    next(err);
    }
});
*/

app.get('/addItem', async function(req, res, next) {
    console.log(req.query)
    try {
        const data = {
            nombre: req.query.nombre,
            marca: req.query.marca,
            tipo: req.query.tipo,
            precio: req.query.precio
        };
        console.log(data);
        res.json(await item.insertData(data));
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
});

app.get('/addItemUser', async function(req, res, next) {
    console.log(req.query)
    try {
        const data = {
            id: req.query.id,
            nombre: req.query.nombre,
            login: req.query.login,
            password: req.query.password,
            rol: req.query.rol
        };
        console.log(data);
        res.json(await item.insertDataUser(data));
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
});

// En tu archivo index.js o donde tengas tus rutas en el backend
app.get('/getItems', async function(req, res, next) {
    try {
        const items = await item.getData(); // Método para obtener todos los datos de la tabla
        res.json(items); // Enviar los datos obtenidos como respuesta
    } catch (err) {
        console.error(`Error while fetching items `, err.message);
        next(err);
    }
});

// En tu archivo index.js o donde tengas tus rutas en el backend
app.get('/getItemsUser', async function(req, res, next) {
    try {
        const items = await item.getDataUser(); // Método para obtener todos los datos de la tabla
        res.json(items); // Enviar los datos obtenidos como respuesta
    } catch (err) {
        console.error(`Error while fetching items `, err.message);
        next(err);
    }
});

// Endpoint para eliminar un ítem por su ID
app.get('/deleteItem', async function(req, res, next){
    try {
        const itemId = req.query.id; // Obtén el ID del ítem a eliminar de la consulta

        // Realiza la eliminación del ítem en tu base de datos usando su ID
        const affectedRows = await item.deleteData(itemId);
        
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Datos eliminados correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontraron datos para eliminar' });
        }
    } catch (error) {
        console.error('Error al borrar datos:', error);
        res.status(500).json({ error: 'Error al eliminar el ítem' });
        next(err)
    }
});

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)