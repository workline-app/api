import Joi from '@hapi/joi';
import { v4 as uuid } from 'uuid';

// Validation to create and update user
export const userValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    _id: Joi.string().trim().required(),
    firstName: Joi.string().alphanum().min(3).max(128).required(),
    lastName: Joi.string().alphanum().min(3).max(128).required(),
    email: Joi.string().email().lowercase().min(3).max(200).required()
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(128),
    lastName: Joi.string().alphanum().min(3).max(128),
    email: Joi.string().email().lowercase().min(3).max(200)
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync({
        ...req.body
      });
      if (result) {
        req.userData = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.update = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({
        message: 'Unexpected error.'
      });
    }
  }
};

// Validation to create and update a device.
export const deviceValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    _id: Joi.string().uuid().required(),
    model: Joi.string().trim().min(3).max(128).required(),
    OS: Joi.string().trim().min(3).max(128).required(),
    brand: Joi.string().trim().min(3).max(128).required(),
    addedBy: Joi.string().trim().max(128).required()
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    model: Joi.string().min(3).max(128),
    OS: Joi.string().trim().min(3).max(128),
    brand: Joi.string().trim().min(3).max(128),
    isAvailable: Joi.boolean(),
    assignedTo: Joi.string().trim().max(128),
    addedBy: Joi.string().trim().max(128)
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync({
        ...req.body,
        _id: uuid()
      });
      if (result) {
        req.device = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.updatedDevice = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({
        message: 'Unexpected error.'
      });
    }
  }
};

// Validation to create and update a request.
export const requestValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    _id: Joi.string().trim().uuid().required(),
    deviceModel: Joi.string().min(3).max(128).required(),
    deviceCategory: Joi.string().min(3).max(128).required(),
    description: Joi.string().trim().max(255),
    FK_userID: Joi.string().trim().required()
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    deviceModel: Joi.string().min(3).max(128),
    deviceCategory: Joi.string().min(3).max(128),
    description: Joi.string().trim().max(255),
    isClosed: Joi.boolean()
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync({
        ...req.body,
        id: uuid(),
        FK_userID: req.user
      });
      if (result) {
        req.request = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.updatedRequest = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};

// Validation to create and update a report.
export const reportValidation = async (req, res, next) => {
  /*
  @desc     Schema for req.body
  @method   POST
  */
  const createSchema = Joi.object().keys({
    _id: Joi.string().trim().uuid().required(),
    description: Joi.string().max(128).required(),
    body: Joi.string().max(255).required(),
    FK_userID: Joi.string().trim().required(),
    FK_deviceID: Joi.string().trim().required()
  });

  /*
  @desc     Schema for req.body
  @method   PUT
  */
  const updateSchema = Joi.object().keys({
    description: Joi.string().max(128),
    body: Joi.string().max(255),
    isOpen: Joi.boolean()
  });

  try {
    if (req.method === 'POST') {
      const result = await createSchema.validateAsync({
        ...req.body,
        id: uuid(),
        FK_userID: req.user
      });
      if (result) {
        req.report = result;
        next();
      }
    }

    if (req.method === 'PUT') {
      const result = await updateSchema.validateAsync(req.body);
      if (result) {
        req.updatedReport = result;
        next();
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(error.status).json({ message: error.details[0].message });
    } else {
      res.status(500).json({ message: 'Unexpected error.' });
    }
  }
};
