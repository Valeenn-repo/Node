const db = require('./db')
const helper = require('./helper')
const config = require('./config')

async function insertData(data) {
    const query = `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`;
    const values = [data.nombre, data.marca, data.tipo, data.precio];
    
    try {
        const result = await db.query(query, values);
        /* En result se almacena el resultado de la consulta. Si accedemos a affectedRows nos da el número de filas de la base de
        datos que han sido modificadas o añadidas. Si ese número es mayor que cero, significa que ha habido inserción en la base de datos.*/
        return result.affectedRows;
    } catch (error) {
        console.error('Error al insertar datos:', error);
        return 0;
    }
}

async function insertDataUser(data) {
    const query = `INSERT INTO usuarios (nombre, login, password, rol) VALUES (?, ?, ?, ?)`;
    const values = [data.nombre, data.login, data.password, data.rol];
    
    try {
        const result = await db.query(query, values);
        /* En result se almacena el resultado de la consulta. Si accedemos a affectedRows nos da el número de filas de la base de
        datos que han sido modificadas o añadidas. Si ese número es mayor que cero, significa que ha habido inserción en la base de datos.*/
        return result.affectedRows;
    } catch (error) {
        console.error('Error al insertar datos:', error);
        return 0;
    }
}


async function getData() {
    try {
        // Realizar la consulta para obtener datos de la base de datos
        const rows = await db.query('SELECT * FROM coleccion');

        // Procesar los resultados de la consulta utilizando helper.emptyOrRows
        const data = helper.emptyOrRows(rows);

        return {
            // Devolver los datos obtenidos del SELECT
            data
        };
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return {
            data: [] // Devolver un array vacío en caso de error
        };
    }
}

async function getDataUser() {
    try {
        // Realizar la consulta para obtener datos de la base de datos
        const rows = await db.query('SELECT * FROM usuarios');

        // Procesar los resultados de la consulta utilizando helper.emptyOrRows
        const data = helper.emptyOrRows(rows);

        return {
            // Devolver los datos obtenidos del SELECT
            data
        };
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return {
            data: [] // Devolver un array vacío en caso de error
        };
    }
}

//Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteData(itemId) {
    try {
        // Realizar la consulta DELETE
        const result = await db.query('DELETE FROM coleccion WHERE id = ?', [itemId]);

        // Retornar el número de filas afectadas por la eliminación
        return result.affectedRows;
    } catch (error) {
        console.error('Error al borrar datos:', error);
        return 0;
    }
}


//Al final del fichero exporto las funciones getData, insertData y deleteData
module.exports = {
    getData,
    insertData,
    deleteData,
    insertDataUser,
    getDataUser
}
