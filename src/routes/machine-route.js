'use strict';

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');

const {
  createMachine,
} = require('../services/machine-service');

router.post(
  '/machine',
  body('name').not().isEmpty().isString().trim().escape(),
  body('caffeine').not().isEmpty().isNumeric().trim().escape(),
  validateRequest,
  async (req, res, next) => {
    try {
      const response = await createMachine(req.body);
      res.status(200).send({ data: response });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  machineRouter: router,
};
