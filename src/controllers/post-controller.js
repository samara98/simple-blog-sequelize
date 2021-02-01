const express = require('express');

const db = require('../models');

module.exports = class PostsController {
  static async showPosts(req = express.request, res = express.response, next) {
    try {
      const posts = await db.Post.findAll({ include: { model: db.User, as: 'owner' } });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async getPost(req = express.request, res = express.response, next) {
    const { id } = req.params;
    try {
      const post = await db.Post.findByPk(id, { include: { model: db.User, as: 'owner' } });
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req = express.request, res = express.response, next) {
    const { title, content } = req.body;
    try {
      const newPost = await db.Post.create({
        title,
        content,
        image_url: req.file.location,
        creator: req.user.id,
      });
      res.json(newPost);
    } catch (err) {
      next(err);
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
      res.json(deletedPost);
    } catch (err) {
      next(err);
    }
  }
};
