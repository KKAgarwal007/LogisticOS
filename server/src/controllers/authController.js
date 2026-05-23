import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'aether_logistix_super_secret_key_2026', {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  const { fullName, companyName, workEmail, password } = req.body;

  try {
    const userExists = await User.findOne({ workEmail });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      fullName,
      companyName,
      workEmail,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        companyName: user.companyName,
        workEmail: user.workEmail,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { workEmail, password } = req.body;

  try {
    const user = await User.findOne({ workEmail });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        companyName: user.companyName,
        workEmail: user.workEmail,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
