const {
    pathToRegexp
} = require("path-to-regexp");
const {
    verify
} = require("../jwt");
const {
    getErr
} = require("./getSendResult")

const notNeedToken = [{
        method: "POST",
        path: "/api/login"
    },
    {
        method: "POST",
        path: "/api/signup"
    },
    {
        method:"GET",
        path:"/api/captcha"
    },
];


module.exports = function (req, res, next) {
    const curpath = notNeedToken.filter(item => {
        const reg = pathToRegexp(item.path);
        return item.method == req.method && reg.test(req.path);
    })
    if(req.path=="/api/whoami"){
        req.session.showCaptcha = false;
        console.log(req.session);
    }
    if (curpath.length != 0) {
        next();
    } else {
        const result = verify(req);
        console.log(result);
        if (result == null) {
            needTokenErr(res);
        } else {
            req.userId = result.id;
            next();
        }
    }
}

function needTokenErr(res) {
    res.status(403).send(getErr(403, "you don't have any token"))
}