const jwt = require("jsonwebtoken");
// const cookieKey = "token"
const secrect = "xiexu";

exports.publish = function (res, maxAge = 3600 * 24, info) {
    const token = jwt.sign(info, secrect, {
        expiresIn: maxAge,
    });
    // res.cookie(cookieKey, token,{
    //     maxAge:maxAge*1000,
    //     path:"/"
    // })
    res.header("authorization", token);
}

exports.verify = function (req) {
    // let token = req.cookies[cookieKey];
    //判断请求的cookie和header中是否有token
    // if (!token) {
    //     token = req.headers.authorization;
    //     if (!token) {
    //         return null;
    //     }
    //     token = token.split(" ");
    //     token = token.length == 1 ? token[0] : token[1];
    // }

    //如果有token就进行认证，如果认证通过就返回这个token
    let token = req.headers.authorization;
    if(!token){
        return null;
    }
    token = token.split(" ");
    token = token.length == 1 ? token[0] : token[1];
    try {
        const result = jwt.verify(token, secrect);
        return result;
    } catch (err) {
        return null;
    }
}