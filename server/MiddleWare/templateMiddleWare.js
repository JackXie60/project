const express = require("express");
const router = express.Router();
const {asyncHandler} = require("./getSendResult")
const {addTemplate,searchTemplate,updateTemplate,deleteTemplate} = require("../service/TemplateServ")

//查找模板
router.get("/search",asyncHandler(async (req,res,next)=>{
    const result = await searchTemplate(req.query.appkey,req.query.planTime);
    return result;
}))

//创建模板
router.post("/create",asyncHandler(async (req,res,next)=>{
    const result = await addTemplate({
        imgSrc:req.body.imgSrc,
        planTime:req.body.planTime,
        desc:req.body.desc,
        appkey:req.body.appkey,
    });
    return result;
}));

//修改模板
router.put("/update",asyncHandler(async (req,res,next)=>{
    let info = {};
    //如果请求题中有imgSrc或者desc就将其进行更新
    if(req.body.imgSrc){
        info.imgSrc = req.body.imgSrc;
    }
    if(req.body.desc){
        info.desc = req.body.desc;
    }
    const result = await updateTemplate(req.body.id,info)
    return result;
}))

//删除模板
router.delete("/delete",asyncHandler(async (req,res,next)=>{
    const result = await deleteTemplate(req.query.id);
    return result;
}))

module.exports = router 