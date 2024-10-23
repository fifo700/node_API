const express = require('express') 
const {success} = require('./helper.js')
let pokemons = require('./mock-pokemon');

const app = express()
const port =  3000

app.use ( (req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
})


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

app.listen(port,() => console.log(`Application marche sur : http://localhost:${port}`)) 