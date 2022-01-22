const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find({});
  // res.sendFile(__dirname+'/index.html');
  // res.render('index.ejs', {posts:posts})
  res.status(200).json(posts);
});

router.post('/', async (req, res) => {
  // console.log(req.body.postText)
  // res.send(req.body.postText)
  const postData = {
    title: req.body.title,
    postText: req.body.postText,
  };
  const post = new Post(postData);
  await post.save();
  res.redirect('/');
});

router.delete('/:id', async (req, res) => {
  await Post.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: 'Deleted',
  });
});
module.exports = router;
