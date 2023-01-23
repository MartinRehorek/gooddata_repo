'use strict';

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate-request');
const { createUser } = require('../services/user-service');

router.post(
  '/user/request',
  body('login').not().isEmpty().isString().trim().escape().isLength({ min: 4, max: 32 }),
  body('email').not().isEmpty().trim().escape().isEmail(),
  body('password').not().isEmpty().isString().trim().escape().isLength({ min: 4 }),
  validateRequest,
  async (req, res, next) => {
    try {
      const response = await createUser(req.body);
      res.status(200).send({id: response});
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  userRoute: router,
};
