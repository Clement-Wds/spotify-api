import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const register = async (req, res) => {
  const {username, password} = req.body;

  try {
    const existingUser = await User.findOne({where: {username}});
    if (existingUser) {
      return res.status(400).json({message: 'Cet utilisateur existe déjà'});
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({username, password: hashedPassword});

    res.status(201).json({message: 'Utilisateur enregistré avec succès'});
  } catch (error) {
    res
      .status(500)
      .json({message: "Erreur lors de l'enregistrement de l'utilisateur"});
  }
};

export const login = async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({where: {username}});

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({message: "Nom d'utilisateur ou mot de passe incorrect"});
    }

    const token = jwt.sign(
      {sub: user.id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
    );

    res.json({token});
  } catch (error) {
    res
      .status(500)
      .json({message: "Erreur lors de la vérification de l'utilisateur"});
  }
};
