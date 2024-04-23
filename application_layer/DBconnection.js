const { Client } = require('pg')
var fs = require('fs')
var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'))

const client = new Client(credentials);



client
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        client.query('SELECT * FROM libro LIMIT 10', (err,result) => {
            if(err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result:', result.rows);
            }

        client
            .end()
            .then(() => {
                console.log('Connection to PostgreSQL closed');
            })
            .catch((err) => {
                console.error('Error closing connection', err);
            })
    })
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });