var express = require("express");
var app = express();
//引入cookie-parser中间件
var cookieParser = require("cookie-parser");

//将cookie-parser设置为中间件
app.use(cookieParser());

app.get("/sendCookie", function (req, res) {
    //向客户端发送cookie
    //res.cookie(name, value [, options])
    //通过res.cookie()可以用来向浏览器发送cookie
    //cookie实际上就是一个名值对的结果
    //设置一个永久有效的cookie
    res.cookie("name", "sunwukong", { maxAge: 1000 * 10 });
    res.send("Cookie已经发送给浏览器~~~");
});

app.get("/checkCookie", function (req, res) {
    //获取用户发送的Cookie
    var cookie = req.get("Cookie");
    //当引入cookie-parser以后，在Request中会多一个cookies这个属性
    //这个属性值是一个对象，它会将cookie中解析的内容转换为对象中的属性
    console.log(req.cookies.name);
    res.send("检查用户的Cookie");
});

app.get("/delCookie", function (req, res) {
    //删除cookie
    //使用一个有效期为0的cookie来替换已有cookie
    //res.cookie("name","shaheshang",{maxAge:0});
    res.clearCookie("name");

    res.send("cookie已死~~");

});

app.listen(3000, function () {
    console.log("OK");
});