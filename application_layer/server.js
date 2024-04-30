const fs = require('fs')
const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const { returnBook, returnListBooks } = require('./DBconnection')

const bookTest = JSON.parse(fs.readFileSync('./testBook.json', 'utf8'))
const booksTest = JSON.parse(fs.readFileSync('./testBooks.json', 'utf8'))

const router = express()

var production = false

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

router.get('/contact', (req,res) =>{
    res.render("contact")
})

router.get('/books',async (req,res) =>{
    if (production) {
        res.render("books", returnBooks(20))
    } else {
        res.render("books", booksTest)
    }
})

router.get('/book', (req,res) => {
    res.render("home")
})

router.post('/book', async (req,res) =>{
    if (production) {
        res.render("book", await returnBook(30))
    } else {
        res.render("book", bookTest)
    }
})

router.get('/test/book', async (req,res) => {
    res.send(await returnBook(30))
})