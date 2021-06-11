const faceToMap = require("../models/FaceToContent");

//添加模板内容和封面的映射
exports.addFaceToMap = async function(info){
    const mapData = await exports.searchContentByFace(info.faceId);
    if(mapData){
        throw new Error("facetomap table already have the same data");
    }
    const result = await faceToMap.create(info);
    return result;
}

//删除模板内容和封面的映射
exports.deleteFaceToMap = async function(id){
    const result = await faceToMap.destroy({
        where:{
            id,
        }
    });
    return result;
}

//根据封面的id查找内容的id
exports.searchContentByFace = async function(id){
    const result = await faceToMap.findOne({
        where:{
            faceId:id,
        }
    })
    return result;
}