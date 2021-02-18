'use strict';
const express = require('express');

const db = require('../models');

module.exports = class UserProjectsController {
  static async showUserProjects(req = express.request, res = express.response, next) {
    try {
      const userProjects = await db.User_Project.findAll({
        include: [
          { model: db.User, as: 'user' },
          { model: db.Project, as: 'project' },
        ],
      });
      return res.json(userProjects);
    } catch (err) {
      return next(err);
    }
  }
};
