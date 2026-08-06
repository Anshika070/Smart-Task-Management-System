const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = user => jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'change-this-development-secret', { expiresIn: '7d' });
const responseUser = user => ({ id: user._id, name: user.name, email: user.email, token: createToken(user) });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required.' });
    if (await User.exists({ email })) return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name, email, password });
    res.status(201).json(responseUser(user));
  } catch (error) { next(error); }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase() }).select('+password');
    if (!user || !(await user.matchesPassword(req.body.password || ''))) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json(responseUser(user));
  } catch (error) { next(error); }
};
exports.me = async (req, res) => res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
