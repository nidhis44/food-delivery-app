const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const authController = require('../controllers/authController');

// Mock the dependencies
jest.mock('../models/userModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const req = {
        body: { username: 'testuser', password: 'password123', role: 'user' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({ username: 'testuser', password: 'hashedPassword', role: 'user' });

      await authController.register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.create).toHaveBeenCalledWith({ username: 'testuser', password: 'hashedPassword', role: 'user' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: { username: 'testuser', password: 'hashedPassword', role: 'user' }
      });
    });

    it('should handle registration failure', async () => {
      const req = { body: { username: 'testuser', password: 'password123', role: 'user' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Registration failed',
        error: 'Hashing error'
      });
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const user = { id: 'userId', username: 'testuser', password: 'hashedPassword', role: 'user' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('testToken');

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId', role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        token: 'testToken'
      });
    });

    it('should return 401 if credentials are invalid', async () => {
      const req = { body: { username: 'testuser', password: 'wrongpassword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue(null); // No user found

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should handle login failure', async () => {
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login failed',
        error: 'Database error'
      });
    });
  });
});