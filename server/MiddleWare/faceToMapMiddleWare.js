const {addFaceToMap,deleteFaceToMap,searchContentByFace} = require("../service/FaceToMapServ");
const express = require("express");
const {asyncHandler} = require("./getSendResult");

const router = express.Router();

//添加模板内容和封面的映射
router.post("/create",asyncHandler(async (req,res,next)=>{
    const result = await addFaceToMap({
        faceId:req.body.faceId,
        contentId:req.body.contentId,
    });
    return result;
}))

//删除模板内容和封面的映射
router.delete("/delete",asyncHandler(async (req,res,next)=>{
    const result = await deleteFaceToMap(req.query.id);
    return result;
}))

//根据封面的id查找内容的id
router.get("/search",asyncHandler(async (req,res,next)=>{
    const result = await searchContentByFace(req.query.faceId);
    return result;
}))

module.exports = router;