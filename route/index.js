var fs      = require('fs');
var path    = require('path');
var marked  = require('marked');
var resPath = path.join(__dirname, '..', '/public/res/markdown');

module.exports=function(app){
    app.get('/', function(req, res){
        console.log(req.path);
        console.log(resPath);
        res.render('index.ejs',{url:req.path});
    });

    app.get('/markdown/:name',function(req, res){
        var fileName = req.params.name;
        console.log(fileName);
        var filePath = path.join(resPath, fileName+'.txt');
        fs.exists(filePath, function(exists){
            if(exists){
                fs.readFile(filePath, 'utf-8', function(err, data){
                    if(err){
                        res.render('markdown.ejs', {data:'read file error!'})
                    }else{
                        res.render('markdown.ejs', {data: marked(data)});
                    }
                });
            }else{
                res.render('markdown.ejs',{data:"file not exists！"});
            }
        });
    });

    app.get('/api/',function(req, res){
        console.log('api:'+req.path);
        res.render('api.ejs');
    });

    app.get('/class/',function(req, res){
        console.log('class:'+req.path);
        res.render('class.ejs');
    });
    // 会阻止所有的静态资源获取    
    // app.get(/.*/, function(req, res){
    //     console.log(req.path);
    //     res.render('index.ejs',{url:404});
    // });

};
module.exports.unfoundHandler=function(req, res){
    console.log('404');
    res.render('index.ejs',{url:'404'+req.path});
}