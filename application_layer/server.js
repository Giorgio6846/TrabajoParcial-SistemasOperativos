const fs = require('fs')
const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
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
    if (production) {
        res.render("books",{booksL: await returnListBooks(20)})
    } else {
        res.render("books",{booksL: booksTest})
    }
})

router.get('/book', (req,res) => {
    if(false) {
        res.render("home")
    } else {
        res.render("book", returnBook(30))
    }
})

router.post('/book', async (req,res) =>{
    if (production) {
        res.render("book", await returnBook(30))
    } else {
        res.render("book", bookTest)
    }
})

router.get('/test/book/json', async (req,res) => {
    res.send(await returnBook(59))
})

router.get('/test/book/UI', async (req,res) => {
    res.render("book", await returnBook(59))
})

router.get('/test/books/json', async (req,res) => {
    res.send({booksL: await returnListBooks(20)})
})

router.get('/test/books/UI', async (req,res) => {
    res.render("books",{booksL: await returnListBooks(20)})
})