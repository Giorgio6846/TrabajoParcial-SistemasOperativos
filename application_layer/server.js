const fs = require('fs')
const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')

const app = express()

app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/../presentation_layer/"))
const host = 'localhost'
const port = 8080;

//Enables the server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})

app.get('/', (req,res) =>{
    res.render("home")
})

app.get('/contact', (req,res) =>{
    res.render("contact")
})

app.get('/books', (req,res) =>{
    res.render("books")
})

app.get('/book', (req,res) =>{
    res.render("book")
})
