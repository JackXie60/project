const express = require("express");
const router = express.Router();
const {asyncHandler} = require("./getSendResult")
const {addCompleteness,searchCompleteness,updateCompleteness} = require("../service/Completeness")

router.post("/create",asyncHandler(async (req,res,next)=>{
    const result = await addCompleteness({
        time:req.body.time,
        finishedTaskNum:req.body.finishedTaskNum,
        appkey:req.body.appkey
    });
    return result;
}))

router.get("/search",asyncHandler(async (req,res,next)=>{
    const result = await searchCompleteness(req.query.startTime,req.query.endTime,req.query.appkey);
    return result;
}))

router.put("/update",asyncHandler(async (req,res,next)=>{
    console.log(req.body)
    const result = await updateCompleteness(req.body.id,req.body.finishedTaskNum);
    return result;
}))

module.exports = router;