const { Pokemon } = require('../db/sequelize')
const { Op} = require('sequelize')
const auth = require('../auth/auth')
   
module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {
    const limit = parseInt(req.query.limit) || 5
    

    if(req.query.name){
      const name=req.query.name
      if(name.length <=1){
        const message ='minimum 2 caractère comme filtre name'
       return res.status(400).json({message})
        
  
      }

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

        return res.send({ message, data: pokemons })
      })
      .catch(error => {
      const message = "pas trouver les pokemons"
      res.status(500).json({message, data : error})
      })
    }})
}