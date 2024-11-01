/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
  app.post('/api/login', (req, res) => {

    // Vérifie l'utilisateur dans la base de données
    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        if (!user) {
          const message = "Pas le bon nom d'utilisateur";
          return res.status(404).json({ message });
        }

        // Vérifie le mot de passe de l'utilisateur
        bcrypt.compare(req.body.password, user.password)
          .then(isPasswordValid => {
            if (!isPasswordValid) {
              const message = "Pas le bon mot de passe";
              return res.status(401).json({ message });
            }

            // Génère le token JWT
            const token = jwt.sign(
              { userId: user.id },
              privateKey,
              { expiresIn: '24h' }
            );

            const message = "L'utilisateur a été connecté avec succès";
            return res.json({ message, data: user, token });
          })
          .catch(error => {
            const message = "Une erreur est survenue lors de la vérification du mot de passe.";
            return res.status(500).json({ message, data: error.message || error });
          });
      })
      .catch(error => {
        const message = "Une erreur est survenue lors de la recherche de l'utilisateur.";
        return res.status(500).json({ message, data: error.message || error });
      });
  });
}
