'use strict';

const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const { validateRequest } = require('../middleware/validate-request');
const logger = require('../utils/logger');

const {
  getCoffeeStats,
  getMachineStats,
  getUserStats,
  getCaffeineLevel
} = require('../services/stats-service');

router.get(
  '/stats/coffee',
  async (req, res, next) => {
    try {
      const response = await getCoffeeStats();
      res.status(200).send({ data: response });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/stats/coffee/machine/:id',
  param('id').not().isEmpty().isString().trim().escape(),
  validateRequest,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await getMachineStats(id);
      res.status(200).send({ data: response });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/stats/coffee/user/:id',
  param('id').not().isEmpty().isString().trim().escape(),
  validateRequest,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await getUserStats(id);
      res.status(200).send({ data: response });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/stats/level/user/:userId',
  param('userId').not().isEmpty().isString().trim().escape(),
  validateRequest,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const response = await getCaffeineLevel(userId);
      res.status(200).send({ data: response });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  statsRoute: router,
};
