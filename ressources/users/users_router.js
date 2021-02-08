import express from 'express';
import { findById, add, findAll, update, remove } from './users_model.js';
import attachUser from '../../middlewares/attach_user.js';
import { userValidation } from '../../middlewares/validation.js';

const router = express.Router();

/**
 * @desc    Retrieve user logged in user profile from DB.
 * @route   GET /api/users/profile
 * @access  Private, Admin, User
 */
router.get('/profile', attachUser, async (req, res) => {
  try {
    if (req.user) {
      const user = await findById(req.user.sub.slice(6));

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
    }
  } catch ({ message }) {
    console.log(message);
    res.status(500).json({ message: 'Unable to retrieve profile' });
  }
});

/**
 * @desc    Add a user to the database
 * @route   POST /api/users
 * @access  Private, Admin
 */
router.post('/', userValidation, async (req, res) => {
  try {
    const foundUserByID = await findById(req.userData.uid);
    if (!foundUserByID) {
      const user = await add(req.userData);
      res.status(201).json(user);
    } else {
      res.status(200).json(foundUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to create user.' });
  }
});

/**
 * @desc    Get all the users from the database
 * @route   GET /api/users
 * @access  Private, Admin
 */
router.get('/', async (req, res) => {
  try {
    const users = await findAll();
    res.status(200).json(users);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to retrieve the  users.' });
  }
});

/**
 * @desc    Get a single user
 * @route   GET /api/users/:id
 * @access  Private, Admin, user
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await findById(req.id);
    if (!user) res.status(404).json({ message: 'User not found.' });
    else res.status(200).json(users);
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create user.' });
  }
});

/**
 * @desc    Update an existing user
 * @route   PUT /api/users/:id
 * @access  Private, Admin
 */
router.put('/:id', userValidation, async (req, res) => {
  try {
    const user = await findById(req.id);
    if (!user) res.status(404).json({ message: 'User not found.' });
    else {
      const updatedUser = await update(user.id, req.update);
      res.status(201).json(updatetedUser);
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create user.' });
  }
});

/**
 * @desc    Delete an existing user
 * @route   DELETE /api/users/:id
 * @access  Private, Admin
 */
router.delete('/:id', async (req, res) => {
  try {
    const user = await findById(req.id);
    if (!user) res.status(404).json({ message: 'User not found.' });
    else {
      await remove(user.id);
      res.status(200).json({ message: 'User successfully deleted!' });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Unable to create user.' });
  }
});

export default router;
