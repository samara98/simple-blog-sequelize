'use strict';
const express = require('express');

const db = require('../models');

module.exports = class CommentController {
  static async showComments(req = express.request, res = express.response, next) {
    try {
      const comments = await db.Comment.findAll({
        include: [
          { model: db.User, as: 'commentator' },
          { model: db.Post, as: 'post' },
        ],
      });
      return res.json(comments);
    } catch (err) {
      return next(err);
    }
  }

  static async getComment(req = express.request, res = express.response, next) {
    const { id } = req.params;
    try {
      const comments = await db.Comment.findByPk(id, {
        include: [
          { model: db.User, as: 'commentator' },
          { model: db.Post, as: 'post' },
        ],
      });
      return res.json(comments);
    } catch (err) {
      return next(err);
    }
  }

  static async addComment(req = express.request, res = express.response, next) {
    try {
      const { post_id, content } = req.body;
      const addedComment = await db.Comment.create({ user_id: req.user.id, post_id, content });
      res.status(201);
      return res.json(addedComment);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteComment(req = express.request, res = express.response, next) {
    try {
      const { id } = req.params;
      const deletedComment = await db.Comment.destroy({ where: { id } });
      return res.json(deletedComment);
    } catch (err) {
      return next(err);
    }
  }
};
