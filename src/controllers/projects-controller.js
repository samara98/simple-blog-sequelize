'use strict';
const express = require('express');

const db = require('../models');

module.exports = class ProjectController {
  static async showProjects(req = express.request, res = express.response, next) {
    try {
      const projects = await db.Project.findAll({
        include: [{ model: db.User, as: 'users' }],
      });
      return res.json(projects);
    } catch (err) {
      return next(err);
    }
  }
};
