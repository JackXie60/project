const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./getSendResult");
const {addTemplateContent,updateTemplateContent,searchTemplateContent,deleteTemplateContent} = require("../service/TemplateContentServ");

//新增模板
router.post("/create",asyncHandler(async (req,res,next)=>{
    console.log(req.body.appkey,req.body.todolist)
    const result = await addTemplateContent({
        appkey:req.body.appkey,
        todolist:req.body.todolist,
    });
    return result.toJSON();
}))

//修改模板
router.put("/update",asyncHandler(async (req,res,next)=>{
    let info = {};
    if(req.body.todolist){
        info.todolist = req.body.todolist;
    }
    const result = await updateTemplateContent(req.body.id,info);
    return result;
}))

//删除模板
router.delete("/delete",asyncHandler(async (req,res,next)=>{
    const result = await deleteTemplateContent(req.query.id);
    return result;
}))

//查找模板
router.get("/search",asyncHandler(async (req,res,next)=>{
    console.log("contentId",req.query.id)
    const result = await searchTemplateContent(req.query.id);
    return result;
}))


module.exports = router;