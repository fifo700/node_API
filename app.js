const express = require('express') 
const morgan = require('morgan')
const favicon = require('serve-favicon')
const {success, getUniqueId} = require('./helper.js')
let pokemons = require('./mock-pokemon');
const serveFavicon = require('serve-favicon');

const app = express()
const port =  3000

app
    .use(favicon(__dirname +'/favicon.ico'))
    .use( morgan('dev'))


app.get('/', (req,res)=> res.send('Hello express 2'))

app.get('/api/pokemon/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id ===id)
    const message = 'Un pokemon à bien été trouvé'
    res.json(success(message,pokemon))
})

app.get('/api/pokemons', (req,res)=>{
    const message = `Il y a bien ${pokemons.length} pokemons dans cette liste`
    res.json(success(message,pokemons))
})

app.post('/api/pokemons', (req, res) =>{
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created : new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée` 
    res.json(success(message,pokemonCreated))
})


app.listen(port,() => console.log(`Application marche sur : http://localhost:${port}`)) 