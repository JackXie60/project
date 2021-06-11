const express = require("express");
const router = express.Router();
const {
    addAdmin,
    loginAdmin,
    getAdminById,
} = require("../service/AdminServ")
const {
    asyncHandler,
    getErr
} = require("./getSendResult")
const {
    publish
} = require("../jwt.js")


router.post("/login", asyncHandler(async (req, res, next) => {
    const result = await loginAdmin(req.body.username, req.body.password,req.body.avator);
    if (result) {
        const id = result.id
        publish(res, 3600*24, {
            id: id
        });
    }
    return result;

}))
router.post("/signup", asyncHandler(async (req, res, next) => {
    const result = await addAdmin({
        username:req.body.username, 
        password: req.body.password,
        avator:req.body.avator,
    });
    return result;
}))
//注册的错误处理中间件
// router.use("/signup", function (err, req, res, next) {
//     if (err) {
//         res.send(getErr())
//     }
// })
router.get("/whoami",asyncHandler(async (req,res,next)=>{
    const result = await getAdminById(req.userId);
    return result;
}))

module.exports = router;