const express = require('express') 
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port =  3000



app
    .use( favicon(__dirname +'/favicon.ico'))
    .use( morgan('dev'))
    .use( bodyParser.json() )

sequelize.initDb

//ici, les futur points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemons')(app)
require('./src/routes/updatePokemons')(app)
require('./src/routes/deletePokemons')(app)

app.listen(port,() => console.log(`Application marche sur : http://localhost:${port}`)) 