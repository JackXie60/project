const express = require("express");
require("./models/init");
const session = require("express-session")
const cookieParser = require("cookie-parser")
const notNeedToken = require("./MiddleWare/notNeedToken.js")
const loginMiddleWare = require("./MiddleWare/loginMiddleWare")
const errorMiddleWare = require("./MiddleWare/errorMiddleWare.js");
const templateMiddleWare = require("./MiddleWare/templateMiddleWare");
const templateContentMiddleWare = require("./MiddleWare/templateContentMiddleWare");
const faceToMapMiddleWare = require("./MiddleWare/faceToMapMiddleWare");
const backlogMiddleWare = require("./MiddleWare/backlogMiddleWare")
const completeness = require("./MiddleWare/Completeness")
//验证码
const captchaMiddleWare = require("./MiddleWare/CaptchaMiddleWare");

const app = express();
//解析json
app.use(express.json())
//注入cookie解析
app.use(cookieParser());
//注入session中间件
app.use(session({
    secret:"12345",
    cookie:{
        maxAge:24*3600*1000,
    },
    resave: false,
    saveUninitialized: false,
}))
//判断访问当前页面是否需要token
app.use(notNeedToken);
app.use(captchaMiddleWare);
//用户注册登录中间间
app.use("/api",loginMiddleWare)
//todolist模板封面中间件
app.use("/api/template",templateMiddleWare);
//todolist模板内容中间件
app.use("/api/templateContent",templateContentMiddleWare);
//模板内容和模板封面映射中间件
app.use("/api/faceToMap",faceToMapMiddleWare);
//待办事项中间件
app.use("/api/backlog",backlogMiddleWare);
//完成度中间件
app.use("/api/completeness",completeness)
//验证码
//错误处理中间件
app.use("/api",errorMiddleWare);
app.listen(1024,()=>{
    console.log("服务器已启动")
})