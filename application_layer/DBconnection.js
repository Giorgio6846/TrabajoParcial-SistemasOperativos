const { Pool } = require('pg')
var fs = require('fs')
var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'))
const { format } = require('sql-formatter');
const { resourceUsage } = require('process');

const pool = new Pool(credentials);

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

async function connectionToDB(query) {
    try {
        return await pool.query(query)
    } catch(error) {
        console.error(error);
    }
}

async function returnBook(idBook) {

    const queryDB = `SELECT libro.nombre AS "nombreLibro", libro.precio AS "precio", libro."numPaginas", libro."anhoPublicado", editorial.nombre AS "editorial", autor."nombresApellidos" FROM libro
                        JOIN editorial ON libro."idEditorial" = editorial."idEditorial"
                        JOIN autor ON libro."idAutor" = autor."idAutor"
                        Where libro."idLibro" =  ${idBook}`

    let dbResult;
    try {
        dbResult = await connectionToDB(queryDB);
    } catch(err) {
        console.log('Error: ' + error)
    }
    
    console.log(dbResult.rows)

    return dbResult.rows[0]
}

async function returnListBooks(startingIdList) {

    const queryDB = `SELECT libro."idLibro", libro.nombre, libro.precio, autor."nombresApellidos", editorial.nombre AS "editorial"FROM libro
                    JOIN editorial ON libro."idEditorial" = editorial."idEditorial"
                    JOIN autor ON libro."idAutor" = autor."idAutor"
                    WHERE "libro"."idLibro" >= ${1 + startingIdList} AND "libro"."idLibro" <= ${20 + startingIdList}`

    let dbResult;
    try {
        dbResult = await connectionToDB(queryDB);
    } catch(err) {
        console.log('Error: ' + error)
    }
    
    console.log(dbResult.rows)

    return dbResult.rows

}

module.exports = { returnBook, returnListBooks}