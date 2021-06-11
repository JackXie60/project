const express = require("express");
const router = express.Router();
const { searchSoonExpire,addBacklog,deleteBacklog,updateBacklog,searchBacklog,searchBacklogWithoutPlan } = require("../service/BacklogServ");
const {asyncHandler} = require("./getSendResult")


//添加待办事项
router.post("/create",asyncHandler(async (req,res,next)=>{
    console.log(req.body)
    const result = await addBacklog({
        content:req.body.content,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        isFinished:req.body.isFinished,
        planTime:req.body.planTime,
        appkey:req.body.appkey,
        finishedTime:req.body.finishedTime,
    });
    return result;
}))

//删除待办事项
router.delete("/delete",asyncHandler(async (req,res,next)=>{
    const result = await deleteBacklog(req.query.id);
    return result;
}))

//更新待办事项
router.put("/update",asyncHandler(async (req,res,next)=>{
    const result = await updateBacklog(req.body.id,{
        content:req.body.content,
        isFinished:req.body.isFinished,
        finishedTime:req.body.finishedTime,
    });
    return result;
}));

//查找待办事项
router.get("/search",asyncHandler(async (req,res,next)=>{
    const result = await searchBacklog(req.query.appkey,req.query.time,req.query.planTime);
    return result;
}))

//根据时间查找事项
router.get("/searchWithoutPlan",asyncHandler(async (req,res,next)=>{
    const result = await searchBacklogWithoutPlan(req.query.appkey,req.query.startTime,req.query.endTime);
    return result;
}))

router.get("/searchSoonExpire",asyncHandler(async (req,res,next)=>{
    const result = await searchSoonExpire(req.query.appkey,
        req.query.endTime,req.query.nowTime);
    return result;
}))
module.exports = router;

