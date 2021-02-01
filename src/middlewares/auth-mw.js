const express = require('express');
const createHttpError = require('http-errors');

const { verifyToken } = require('../helpers/jwt-helper');
const db = require('../models');

exports.authentication = async (req = express.request, res = express.response, next) => {
  try {
    const { access_token } = req.signedCookies;
    const payload = verifyToken(access_token);
    const user = await db.User.findByPk(payload['sub']);
    req.user = user;
    next();
  } catch (err) {
    next(createHttpError(401));
  }
};
