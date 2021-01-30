'use strict';
const express = require('express');

const authRouter = require('./routes/auth-router');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

module.exports = router;
