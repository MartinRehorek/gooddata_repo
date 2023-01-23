'use strict';

const express = require('express');
const router = express.Router();
const { body, param, check } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');


const {
  registerCoffee,
} = require('../services/coffee-service');

router.post(
  '/coffee/buy/:userId/:machineId/now',
  param('userId').not().isEmpty().isString().trim().escape(),
  param('machineId').not().isEmpty().isString().trim().escape(),
  validateRequest,
  async (req, res, next) => {
    try {
      const { userId, machineId } = req.params;
      const coffeeTimestamp = new Date().toISOString();

      await registerCoffee({ userId, machineId, coffeeTimestamp});
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/coffee/buy/:userId/:machineId',
  param('userId').not().isEmpty().isString().trim().escape(),
  param('machineId').not().isEmpty().isString().trim().escape(),
  body('coffeeTimestamp').isISO8601().toDate(),
  validateRequest,
  async (req, res, next) => {
    try {
      const { userId, machineId } = req.params;
      const { coffeeTimestamp } = req.body;

      await registerCoffee({ userId, machineId, coffeeTimestamp});
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  coffeeRouter: router,
};
