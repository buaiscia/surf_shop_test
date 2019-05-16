const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'buaiscia',
    api_key: '432929438173459',
    api_secret: process.env.CLOUDINARY_SECRET
})

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
        req.body.post.images = [];
        for(const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            })
        }
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
        let post = await Post.findById(req.params.id);
        if(req.body.deleteImages && req.body.deleteImages.length) {
            let deleteImages = req.body.deleteImages;
            for(const public_id of deleteImages) {
                await cloudinary.v2.uploader.destroy(public_id);
                for(const image of post.images) {
                    if(image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        //check if there are images to upload
        if(req.files) {
            //upload images
            for(const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                //add images to post.images array
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }
        //update post with any new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.location = req.body.post.location;
        //save the updated post into the db
        post.save();

        res.redirect(`/posts/${post.id}`);
    },
    //POSTS DESTROY
    async postDestroy(req, res, next) {
        await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }

    
}
