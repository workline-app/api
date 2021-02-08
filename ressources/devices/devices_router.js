import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import { add, findAll, findById, update, remove } from './devices_model.js';
import { deviceValidation } from '../../middlewares/validation.js';

const router = express.Router();

/**
 * @desc    Add a new device in the database.
 * @route   POST /api/devices
 * @access  Private, Admin
 */
router.post(
  '/',
  jwtAuthz(['write:device']),
  deviceValidation,
  async (req, res) => {
    try {
      const device = await add(req.device);
      res.status(201).json(device);
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc    Get all devices from DB.
 * @route   GET /api/devices
 * @access  Private, Admin
 */
router.get('/', jwtAuthz(['read:devices']), async (req, res) => {
  try {
    const devices = await findAll();
    res.status(201).json(devices);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

/**
 * @desc    Get a single devices from DB.
 * @route   GET /api/devices/:id
 * @access  Private, Admin, User
 */
router.get(
  '/:id',
  jwtAuthz(['read:device', 'read:devices']),
  async (req, res) => {
    try {
      const device = await findById(req.params.id);
      if (device && device.length > 0) {
        if (req.isAdmin || req.user === device.assignedTo) {
          res.status(200).json(device);
        } else {
          res.status(403).json({ message: 'Forbidden access!' });
        }
      } else {
        res.status(404).json({ message: 'Device not found' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc    Get all unassigned devices from DB.
 * @route   GET /api/devices/inventory
 * @access  Private, Admin
 */
router.get('/:id', jwtAuthz(['read:devices']), async (req, res) => {
  try {
    const allDevices = await findAll();
    const inventory = allDevices.filter(device => device.isAvailable === true);
    if (inventory && inventory.length > 0) {
      res.status(200).json(inventory);
    } else {
      res.status(200).json({ message: `Unable to find available devices!` });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

/**
 * @desc    Edit a single devices from DB.
 * @route   PUT /api/devices/:id
 * @access  Private, Admin
 */
router.put(
  '/:id',
  jwtAuthz(['edit:device']),
  deviceValidation,
  async (req, res) => {
    try {
      const device = await findById(req.params.id);
      if (device && device.length > 0) {
        res.status(200).json(device);
        const updatedDevice = await update(device._id, req.updatedDevice);
        res.status(201).json(updatedDevice);
      } else {
        res.status(404).json({ message: 'Device not found!' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc    Remove a single devices from DB.
 * @route   DELETE /api/devices/:id
 * @access  Private, Admin
 */
router.delete('/:id', jwtAuthz(['delete:device']), async (req, res) => {
  try {
    const device = await findById(req.params.id);
    if (device && device.length > 0) {
      await remove(device._id);
      res.status(201).json({ message: 'Device sucessfully deleted.' });
    } else {
      res.status(404).json({ message: 'Device not found!' });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

export default router;
