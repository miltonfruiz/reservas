const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Por favor, llene todos los campos' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: 'El correo electrónico ya está en uso' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Por favor, llene todos los campos' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error al iniciar sesión' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.send({ message: 'Sesión cerrada' });
  } catch (error) {
    res.status(500).send({ message: 'Error al cerrar sesión' });
  }
};

module.exports = { register, login, logout };