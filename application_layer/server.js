const fs = require('fs')
const express = require('express')
const path = require('path')
const { returnBook, returnListBooks } = require('./DBconnection')

const bookTest = JSON.parse(fs.readFileSync('./testBook.json', 'utf8'))
const booksTest = JSON.parse(fs.readFileSync('./testBooks.json', 'utf8'))

const router = express()

var production = true

router.use(express.urlencoded({extended: false}))

router.set("view engine", "ejs")
router.set("views", path.join(__dirname, "/../presentation_layer/"))
const host = '0.0.0.0'
const port = 8080;

//Enables the server
router.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})

router.get('/', (req,res) =>{
    res.render("home")
})

router.get('/books',async (req,res) =>{
    if(production) {
        const listaLibros = req.query.listaLibros
    
        if(!isNaN(listaLibros) ) {
            res.render("books", {booksL: await returnListBooks(listaLibros)})
        }
        else {
            res.render("books", {booksL: await returnListBooks(1)})
        }
    } else {
        res.render("books", {booksL: booksTest})
    }
})

router.get('/book', async (req,res) => {
    if(production) {
        const idLibro = req.query.idLibro
    
        if(!isNaN(idLibro) ) {
            res.render("book", await returnBook(idLibro))
        }
        else {
            res.render("home")
        }
    } else {
        res.render("book", bookTest)
    }
})