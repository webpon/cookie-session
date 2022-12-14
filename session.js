/*
  1.安装  express-session
    cnpm install express-session  --save
  2.引入
    var session = require("express-session");
  3.设置官方文档提供的中间件
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))
  4.使用
    设置值
    req.session.username = "张三";
    获取值 req.session.username
*/
var express = require("express");
var app = express();
var session = require("express-session");
const FileStore = require('session-file-store')(session)

//配置中间件
app.use(session({
    secret: 'this is string key', // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name: 'session_id',
    /*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
    resave: false,
    /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
    saveUninitialized: false, //强制将未初始化的 session 存储。  默认值是true 
    cookie: {
        // 单位是毫秒
        maxAge: 1000 * 10000 /*过期时间*/
    },
    /*secure https这样的情况才可以访问cookie*/
    //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
    // rolling: true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
    store: new FileStore()
}))
app.get("/", function (req, res) {
    console.log(req);
    //获取sesssion
    if (req.session.userinfo) { /*获取*/
        res.send('你好' + req.session.userinfo + '欢迎回来');
    } else {
        res.send('未登录');
    }
});
app.get("/login", function (req, res) {
    // 当给req.session设置新的内容，express-session则会设置set-cookie头
    req.session.userinfo = '张三222';
    res.send('登录成功');
});
// 退出登录
app.get("/loginOut", function (req, res) {
    // 方案一：设置cookie过期，并且把userinfo设为0，这样的话会把客户端的cookie也清除
    // req.session.cookie.maxAge=0;  /*改变cookie的过期时间*/
    // req.session.userinfo = null;
    // 方案二：使用destroy删除，这样不会清楚客户端的cookie
    req.session.destroy(function (err) {
        console.log(err);
    })
    res.send('退出登录成功');
});
app.get("/news", function (req, res) {
    console.log(req.session);
    //获取sesssion
    if (req.session.userinfo) { /*获取*/
        res.send('你好' + req.session.userinfo + '欢迎回来 news');
    } else {
        res.send('未登录 news');
    }
});

app.listen(3000);