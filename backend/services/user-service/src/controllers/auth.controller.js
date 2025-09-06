const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

class AuthController {
  static async register(req, res) {
    // Placeholder for user registration
    res.status(201).json({ message: 'User registered successfully' });
  }

  static async login(req, res) {
    // Placeholder for user login
    res.status(200).json({ message: 'User logged in successfully' });
  }
}

module.exports = AuthController;