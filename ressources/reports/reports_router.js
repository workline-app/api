import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import { add, findAll, findById, update, remove } from './reports_model.js';
import { reportValidation } from '../../middlewares/validation.js';

const router = express.Router();

/**
 * @desc    Add a report in the database.
 * @route   POST /api/reports
 * @access  Private, user
 */
router.post('/', reportValidation, async (req, res) => {
  try {
    const report = await add(req.report);
    res.status(201).json(report);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

/**
 * @desc    Get all reports from the database.
 * @route   GET /api/reports
 * @access  Private, Admin
 */
router.get('/', async (req, res) => {
  try {
    const reports = await findAll();
    res.status(201).json(reports);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

/**
 * @desc   Get a report from the database.
 * @route   GET /api/reports/:id
 * @access  Private, Admin, user
 */
router.get(
  '/:id',
  jwtAuthz(['read:reports', 'read:report']),
  async (req, res) => {
    try {
      const report = await findById(req.params.id);
      if (report && report.length > 0) {
        if (req.isAdmin || req.report.FK_userID === req.user) {
          res.status(201).json(report);
        } else {
          res.status(403).json({ message: 'Forbidden access!' });
        }
      } else {
        res.status(404).json({ message: 'Report not found!' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc   Edit a report from the database.
 * @route   PUT /api/reports/:id
 * @access  Private, Admin, user
 */
router.put(
  '/:id',
  jwtAuthz(['edit:reports', 'edit:report']),
  reportValidation,
  async (req, res) => {
    try {
      const report = await findById(req.params.id);
      if (report && report.length > 0) {
        if (req.isAdmin || req.report.FK_userID === req.user) {
          const updatedReport = await update(report._id, req.updatedReport);
          res.status(201).json(updatedReport);
        } else {
          res.status(403).json({ message: 'Forbidden access!' });
        }
      } else {
        res.status(404).json({ message: 'Report not found!' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

/**
 * @desc   Remove areport from the database.
 * @route   DELETE /api/reports/:id
 * @access  Private, Admin, user
 */
router.delete(
  '/:id',
  jwtAuthz(['remove:reports', 'remove:report']),
  reportValidation,
  async (req, res) => {
    try {
      const report = await findById(req.params.id);
      if (report && report.length > 0) {
        if (req.isAdmin || req.report.FK_userID === req.user) {
          await remove(report._id);
          res.status(201).json({ message: 'Report successfully deleted!' });
        } else {
          res.status(403).json({ message: 'Forbidden access!' });
        }
      } else {
        res.status(404).json({ message: 'Report not found!' });
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

export default router;
