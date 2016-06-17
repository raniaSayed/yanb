/**
 * Created by vdimitrieski on 17.6.16..
 */
var express = require('express'),
    morgan = require('morgan'), //logger environment
    compress = require('compression'), //response compression
    bodyParser = require('body-parser'), //handle request body data
    methodOverride = require('method-override'); //legacy support for DELETE and PUT

/**
 * Configure express server
 * @returns {express configuration}
 */
module.exports = function () {
    //get the server
    var app = express();

    //configure the server
    if (process.env.NODE_ENV === 'development') {
        //dev config
        app.use(morgan('dev')); //logger
    } else if (process.env.NODE_ENV === 'production') {
        //production config
        app.use(compress()); //compress content
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //rest API requirements
    app.use(bodyParser.json());
    app.use(methodOverride());

    //serve static content
    app.use(express.static('./public'));

    //error middleware
    //TODO put this in development only and for production obscure messages
    app.use(function (err, req, res, next) {
        res.status(err.status);
        res.send(err);
    });

    //add routes
    //require('../app/routes/posts.server.routes.js')(app)
    app.use('/api/v1', require('../app/routes/posts.server.routes.js'));

    return app;
};