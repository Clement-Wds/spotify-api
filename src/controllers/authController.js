const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = async (req, res) => {
  const {username, password} = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({where: {username}});
    if (existingUser) {
      return res.status(400).json({message: 'Cet utilisateur existe déjà'});
    }

    // Hacher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Enregistrer l'utilisateur dans la base de données
    const newUser = await User.create({username, password: hashedPassword});

    res.status(201).json({message: 'Utilisateur enregistré avec succès'});
  } catch (error) {
    //console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    res
      .status(500)
      .json({message: "Erreur lors de l'enregistrement de l'utilisateur"});
  }
};

const login = async (req, res) => {
  const {username, password} = req.body;

  try {
    // Obtenez l'utilisateur de la base de données
    const user = await User.findOne({where: {username}});

    // Vérifiez si l'utilisateur existe et si le mot de passe est correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({message: "Nom d'utilisateur ou mot de passe incorrect"});
    }

    // Création du token avec une durée de validité (par exemple, 1 heure)
    const token = jwt.sign(
      {sub: user.id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
    );

    res.json({token});
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
    res
      .status(500)
      .json({message: "Erreur lors de la vérification de l'utilisateur"});
  }
};

module.exports = {register, login};
