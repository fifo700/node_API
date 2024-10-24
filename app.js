const express = require('express') 
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const {Sequelize, DataTypes} = require ('sequelize')
const {success, getUniqueId} = require('./helper.js')
let pokemons = require('./mock-pokemon');
const PokemonModel = require('./src/models/pokemon')
const serveFavicon = require('serve-favicon');

const app = express()
const port =  3000

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions : {
            timezone: 'Etc/GMT-2'
        },
        logging : false
    }

)
sequelize.authenticate()
.then(_=> console.log('connexion reussit :)'))
.catch(error => console.log(`Error de connexion  à la bdd :( ${error}`))

const Pokemon = PokemonModel(sequelize, DataTypes)

sequelize.sync({force : true}) //le force recrée la table a chaque fois alors faudra la bouger
.then(() => console.log('table créé'))

app
    .use( favicon(__dirname +'/favicon.ico'))
    .use( morgan('dev'))
    .use( bodyParser.json() )


app.get('/', (req,res)=> res.send('Hello express 2'))

app.get('/api/pokemons/:id', (req,res) => {
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

    app.put('/api/pokemons/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        const pokemonUpdate ={ ...req.body, id: id}
        pokemons = pokemons.map(pokemon =>{
            return pokemon.id === id ? pokemonUpdate : pokemon
        })
        const message = `Le pokemon ${pokemonUpdate.name} a bien été mis à jour`
        res.json(success(message, pokemonUpdate))
    }) 

    app.delete('/api/pokemons/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        const pokemonDelete = pokemons.find(pokemons => pokemons.id === id)
        pokemons = pokemons.filter(pokemon => pokemon.id !== id)
        const message = `Le pokemon ${pokemonDelete.name} a bien été supprimé`
        res.json(success(message, pokemonDelete))

    }
        )

app.listen(port,() => console.log(`Application marche sur : http://localhost:${port}`)) 