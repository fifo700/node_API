const express = require('express') 
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port =  process.env.PORT ||  3000




app
    .use( favicon(__dirname +'/favicon.ico'))
    .use( bodyParser.json() )
    .use( cors())

sequelize.initDb()
app.get("/",(req,res) =>{
    res.send("ça MARCHE !")

})
//ici, les futur points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemons')(app)
require('./src/routes/updatePokemons')(app)
require('./src/routes/deletePokemons')(app)
require('./src/routes/login')(app)

//gestion error 404
app.use(({res})=>{
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})


app.listen(port,() => console.log(`Application marche sur : http://localhost:${port}`)) 
console.log(process.env.PORT)