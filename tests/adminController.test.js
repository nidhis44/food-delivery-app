const adminController = require('../controllers/adminController');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

// Mock dependencies
jest.mock('../models/userModel');
jest.mock('../models/orderModel');

describe('Admin Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('manageUsers', () => {
    it('should retrieve all users successfully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.find.mockResolvedValue([{ username: 'testuser1' }, { username: 'testuser2' }]);

      await adminController.manageUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ username: 'testuser1' }, { username: 'testuser2' }]);
    });

    it('should return 500 if user retrieval fails', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.find.mockRejectedValue(new Error('Database error'));

      await adminController.manageUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to manage users',
        error: 'Database error'
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const req = { params: { userId: 'user-id' }, body: { username: 'updatedUser' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findByIdAndUpdate.mockResolvedValue();

      await adminController.updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user-id', { username: 'updatedUser' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully' });
    });

    it('should return 500 if user update fails', async () => {
      const req = { params: { userId: 'user-id' }, body: { username: 'updatedUser' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findByIdAndUpdate.mockRejectedValue(new Error('Update error'));

      await adminController.updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user-id', { username: 'updatedUser' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to update user',
        error: 'Update error'
      });
    });
  });

  describe('deactivateUser', () => {
    it('should deactivate a user successfully', async () => {
      const req = { params: { userId: 'user-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findByIdAndUpdate.mockResolvedValue();

      await adminController.deactivateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user-id', { active: false });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deactivated' });
    });

    it('should return 500 if user deactivation fails', async () => {
      const req = { params: { userId: 'user-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findByIdAndUpdate.mockRejectedValue(new Error('Deactivation error'));

      await adminController.deactivateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user-id', { active: false });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to deactivate user',
        error: 'Deactivation error'
      });
    });
  });
});