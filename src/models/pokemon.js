const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est déjà pris.'
      },
      validate: {
        len: {
          args: [1, 25],
          msg: 'Le nom doit contenir entre 1 et 25 caractères.'
        },
        notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        notNull: { msg: 'Le nom est une propriété requise.'}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt: {msg: "pas de lettre et autre, juste des nombres entiers"},
        notNull:{msg:"T'es obligé de mettre les hp"},
        min:{
          args: [0],
          msg: "Les hp doivent être supérieur ou égale à 0"
        },
        max:{
          args:[999],
          msg: "Les hp ne peuvent pas dépasser 999"
        }
        
  
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt: {msg: "pas de lettre et autre, juste des nombres entiers"},
        notNull:{msg:"T'es obligé de mettre les cp"},
        max:{
          args: [99],
          msg: "Les cp ne peuvent pas dépasser 99"
        },
        min:{
          args: [0],
          msg: "Les cp doivent être supérieur ou égale à 0"
        }
        
        
  
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' },
        notNull: { msg: 'L\'image est une propriété requise.'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error('Un pokémon doit au moins avoir un type.')
          }
          if(value.split(',').length > 3) {
            throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}