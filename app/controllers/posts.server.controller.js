/**
 * Created by vdimitrieski on 17.6.16..
 */
'use strict';

var Post = require('mongoose').model('Post');

//middleware for create
module.exports.create = function (req, res, next) {
    var post = new Post(req.body);

    post.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(post);
        }
    });
};

module.exports.update = function (req, res, next) {
    Post.findByIdAndUpdate(req.post._id, req.body, {new: true}, function (err, post) {
        if (err) {
            next(err);
        } else {
            res.json(post);
        }
    });
};

module.exports.delete = function (req, res, next) {
    req.post.remove(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(req.post);
        }
    });
};

module.exports.getAll = function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            next(err);
        } else {
            res.json(posts);
        }
    });
};

module.exports.getOne = function (req, res) {
    res.json(req.post);
};

module.exports.getById = function (req, res, next, id) {
    Post.findOne({_id: id}, function (err, post) {
        if (err) {
            next(err);
        } else {
            req.post = post;
            next();
        }
    });
};
