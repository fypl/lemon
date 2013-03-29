var express = require('express'),
    http    = require('http'),
    path    = require('path'),
    router  = require('./route');

var app        = express();
var server     = http.createServer(app);
var online     = app.settings.env === 'development' ? false : true;
var viewPath   = online ? path.join(__dirname, 'view') : path.join(__dirname, 'dev');
var staticPath = path.join(__dirname, 'public');

app.configure(function(){
    app.set('views', viewPath);
    app.set('view engine', 'ejs');
    app.set('view options', {layout: false});

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.favicon());
    app.use(app.router);
    app.use(express.static(staticPath));
    app.use(router.unfoundHandler);
    
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
});

app.configure('development', function(){

});

app.configure('production', function(){

});

function logErrors(err, req, res, next){
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next){
    if(req.xhr) res.send(500, {error: 'something blew up!'});
    else next(err);
}

function errorHandler(err, req, res, next){
    res.status(500);
    res.render('error', {error:err});
}

router(app);

server.listen('8080',function(){
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
})
