const Post = require('../models/post');

module.exports = {

    //POSTS INDEX
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },
    //NEW POSTS
    postNew(req, res, next) {
        res.render('posts/new');
    },
    //POSTS CREATE
    async postCreate(req, res, next) {
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    //POSTS SHOW
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },
    //POSTS EDIT
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post });
    },
    //POSTS UPDATE
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, { new: true });
        res.redirect(`/posts/${post.id}`);
    }

    
}
