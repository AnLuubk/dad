const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/post', (req, res, next) => {
  Post.find({}, 'title')
    .then(data => res.json(data))
    .catch(next);
});

router.post('/post', (req, res, next) => {
  if (req.body.title) {
    Post.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'the input filed id empty',
    });
  }
});

router.delete('/post/:id', (req, res, next) => {
  Post.findOneAndDelete({ "_id": req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
