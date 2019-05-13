const Post = require('../models/post');

module.exports = {

    //POSTS INDEX
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts })
    },
    //NEW POSTS
    newPost(req, res, next) {
        res.render('posts/new');
    },
    //POSTS CREATE
    async createPost(req, res, next) {
        let post = await Post.create(req.body);
        res.redirect(`/posts/${post.id}`);
    },
    //POSTS SHOW
    async showPost(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },
    //POSTS EDIT
    async editPost(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post });
    },
}