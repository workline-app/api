import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import { add, findAll, findById, update, remove } from './requests_model.js';
import { requestValidation } from '../../middlewares/validation.js';

const router = express.Router();

/**
 * @desc    Add a request in the database.
 * @route   POST /api/requests
 * @access  Private, user
 */
router.post(
  '/',
  jwtAuthz(['write:request']),
  requestValidation,
  async (req, res) => {
    try {
      const request = await add(req.request);
      res.status(201).json(request);
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc    GET all requests from database.
 * @route   GET /api/requests
 * @access  Private, Admin
 */
router.get('/', jwtAuthz(['read:requests']), async (req, res) => {
  try {
    const requests = await findAll();
    res.status(201).json(requests);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

/**
 * @desc    GET a request from database.
 * @route   GET /api/requests/:id
 * @access  Private, Admin, user
 */
router.get(
  '/:id',
  jwtAuthz(['read:requests', 'read:request']),
  async (req, res) => {
    try {
      const request = await findById(req.params.id);
      if (request && request.length > 0) {
        if (req.isAdmin || request.FK_userID === req.user) {
          res.status(200).json(request);
        } else {
          res.status(403).json({ message: 'Forbidden access!' });
        }
      } else {
        res.status(404).json({ message: 'Request not found' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc    Edit a request from database.
 * @route   PUT /api/requests/:id
 * @access  Private, user
 */
router.put(
  '/:id',
  jwtAuthz(['edit:requests', 'edit:request']),
  async (req, res) => {
    try {
      const request = await findById(req.params.id);
      if (request && request.length > 0) {
        if (req.isAdmin || request.FK_userID === req.user) {
          const updatedRequest = await update(request._id, req.updatedRequest);
          res.status(201).json(updatedRequest);
        } else {
          res.status(403).json({ message: 'Forbidden access!' });
        }
      } else {
        res.status(404).json({ message: 'Request not found' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc    Remove a request from database.
 * @route   DELETE /api/requests/:id
 * @access  Private, user
 */
router.delete(
  '/:id',
  jwtAuthz(['remove:requests, remove:request']),
  async (req, res) => {
    try {
      const request = await findById(req.params.id);
      if (request && request.length > 0) {
        if (req.isAdmin || request.FK_userID === req.user) {
          await remove(request._id);
          res.status(201).json({ message: 'Request successfully deleted.' });
        } else {
          res.status(403).json({ message: 'Forbidden access!' });
        }
      } else {
        res.status(404).json({ message: 'Request not found' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

export default router;
