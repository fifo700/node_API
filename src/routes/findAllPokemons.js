const { Pokemon } = require('../db/sequelize')
const { Op} = require('sequelize')
   
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    const limit = parseInt(req.query.limit) || 5

    if(req.query.name){
      const name=req.query.name
      Pokemon.findAndCountAll({
        where:{ 
          name:{//name est la propriété du modèle pokemon
            [Op.like]: `%${name}%`//name est le crtitère de recherche
          }
          } ,
          order : ['name'],
          limit: limit
        })

        .then(({count, rows}) => {
          const message =`il y a ${count} pokémons qui corresponde a la recherche ${name}`
          res.json({message,data: rows})
        })
    
  }
    else{
      Pokemon.findAll({order:['name'],
        limit:limit
      })
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