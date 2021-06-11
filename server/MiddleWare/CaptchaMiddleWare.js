const express = require("express");
const router = express.Router();
//验证码
const captcha = require("svg-captcha");
router.get("/api/captcha",(req,res,next)=>{
    //将验证码中的文本保存在session中，因为要保证安全，所以不能发送给客户端，而session是在服务器中存储
    let c =  captcha.create();
    req.session.captcha = c.text.toLowerCase();
    res.type("svg");
    res.status(200).send(c.data);
})

//验证验证码
function validateCaptcha(req,res,next){
    const captcha = req.body.captcha?req.body.captcha.toLowerCase():"";
    console.log("检验session合法性")
    console.log(captcha,req.session.captcha)
    if(captcha!=req.session.captcha){
        res.send({
            code:401,
            msg:"验证码有错误"
        })
    }else{
        next();
    }
    req.session.captcha = "";
}

function handleCaptcha(req,res,next){
    console.log("选择",req.path)
    if(req.path!="/api/login"&&req.path!="/api/signup"){
        console.log("行,你可以过")
        next();
        return;
    }
    if(!req.session.record){
        req.session.record = [];
    }
    const duration = 10000;
    const repeat = 3;
    const date = new Date().getTime();
    req.session.record.push(date);
    req.session.record = req.session.record.filter(item=>{
        return Date.now()-item<=duration;
    });
    if(req.session.record.length>=repeat || req.session.showCaptcha){
        //验证验证码
        req.session.showCaptcha = true;
        validateCaptcha(req,res,next);
    }else{
        next();
    }
}

router.post("*",handleCaptcha)
module.exports = router;