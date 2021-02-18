'use strict';
const express = require('express');

const db = require('../models');

module.exports = class PostsController {
  static async showPosts(req = express.request, res = express.response, next) {
    try {
      const posts = await db.Post.findAll({
        include: [
          { model: db.User, as: 'owner' },
          { model: db.Comment, as: 'comments', include: [{ model: db.User, as: 'commentator' }] },
        ],
      });
      return res.json(posts);
    } catch (err) {
      return next(err);
    }
  }

  static async getPost(req = express.request, res = express.response, next) {
    const { id } = req.params;
    try {
      const post = await db.Post.findByPk(id, {
        include: [
          { model: db.User, as: 'owner' },
          { model: db.Comment, as: 'comments' },
        ],
      });
      return res.json(post);
    } catch (err) {
      return next(err);
    }
  }

  static async createPost(req = express.request, res = express.response, next) {
    const { title, content } = req.body;
    try {
      const newPost = await db.Post.create({
        title,
        content,
        image_url: req.file && req.file.location,
        creator: req.user.id,
      });
      res.status(201);
      return res.json(newPost);
    } catch (err) {
      return next(err);
    }
  }

  static async deletePost(req = express.request, res = express.response, next) {
    const { id } = req.params;
    try {
      const deletedPost = await db.Post.destroy({
        where: {
          id,
        },
      });
      return res.json(deletedPost);
    } catch (err) {
      return next(err);
    }
  }
};
