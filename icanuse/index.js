var express = require('express');
var app = express();

// 配置模板引擎
app.engine('jade', require('jade').__express);
// 设置模板引擎的目录
app.set('views', process.cwd() + '/tpl');

// 配置静态文件目录（使用express.static中间件）
app.use(express.static(__dirname + '/static'));

// 拦截所有请求的中间件
app.use(function(req, res, next) {
    console.log(app.get("env"));
    console.log(req.path);
    next();
});

app.get('/', function(req, res) {
    res.render('index.jade', {
        s: 'world'
    });
});

app.get('/add', function (req, res) {
    res.render('add.jade');
});

app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log('Server start at port 3000');
});

