const { Client } = require('pg')
var fs = require('fs')
var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'))
const { format } = require('sql-formatter')

const client = new Client(credentials);

/*
Functions:
    Returns a specific book: 
        Input:
            idBook
        Output:
            RETURNS A JSON FILE
            tablaAutor:
                nombresApellidos
            tablaLibro:
                nombre
                precio
                numPaginas
                anhoPublicado
            tablaEditorial:
                nombre     
    Return a list of 20 books starting from 0, 21, 41, etc 
        Input:
            startingIdList
        Output:
            RETURNS A JSON FILE
            tablaLibro:
                nombre
                precio
            tablaAutor:
                nombresApellidos
            tablaEditorial:
                nombre
*/

async function connectionToDB(DBquery) {
    await client.connect()
      console.log('Connected to PostgreSQL database');
      let res = await client.query(format(DBquery, {language: 'sql'}));
      console.log(res.rows)
    await client.end()
    return await Promise.resolve(res.rows)
}

/*
async function connectionToDB(DBquery) {
    await client
        .connect()
        .then(() => {
            console.log('Connected to PostgreSQL database');

            client.query(format(DBquery, {language: 'sql'}), async (err,result) => {
                if(err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result:', result.rows);
                    jsonBook = result.rows
                }

            client
                .end()
                .then(() => {
                    console.log('Connection to PostgreSQL closed');
                })
                .catch((err) => {
                    console.error('Error closing connection', err);
                })
                console.log(result.rows)
            })   
        })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        }); 
}
*/

async function returnBook(idBook) {

    return await connectionToDB(`SELECT libro.nombre, libro.precio, libro."numPaginas", libro."anhoPublicado", editorial.nombre, autor."nombresApellidos" FROM libro
                        JOIN editorial ON libro."idEditorial" = editorial."idEditorial"
                        JOIN autor ON libro."idAutor" = autor."idAutor"
                        Where libro."idLibro" = ${idBook}`)
}

function returnListBooks(startingIdList) {

    var jsonBooks = connectionToDB(`SELECT libro.nombre, libro.precio, autor."nombresApellidos", editorial.nombre  FROM libro
                                    JOIN editorial ON libro."idEditorial" = editorial."idEditorial"
                                    JOIN autor ON libro."idAutor" = autor."idAutor"
                                    LIMIT 10`)  

    return jsonBooks
}

console.log("test", returnBook(69))

module.exports = { returnBook, returnListBooks}