const fs = require('fs')
const http = require('http');
const express = require('express')
const expressHandlebars = require('express-handlebars')

const index = fs.readFileSync('../presentation_layer/index.html')

const host = 'localhost'
const port = 8080;

