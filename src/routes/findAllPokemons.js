const { Pokemon } = require('../db/sequelize')
const pokemon = require('../models/pokemon')
const { Op} = require('sequelize')
   
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {

    if(req.query.name){
      const name=req.query.name
      Pokemon.findAll({
        where:{ 
          name:{//name est la propriété du modèle pokemon
            [Op.like]: `%${name}%`//name est le crtitère de recherche
          }
          } ,
          limit: 5
        })

        .then(pokemons => {
          const message =`il y a ${pokemons.length} pokémons qui corresponde a la recherche ${name}`
          res.json({message,data: pokemons})
        })
    
  }
    else{
      Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
      const message = "pas trouver les pokemons"
      res.status(500).json({message, data : error})
      })
    }})
}