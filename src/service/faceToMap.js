import request from "./request";

//添加映射
export async function addFaceToMap(faceId,contentId){
    const result = await request().post("/api/faceToMap/create",{
        faceId,
        contentId,
    });
    return result;
}

//删除映射
export async function deleteFaceToMap(id){
    const result = await request().delete("/api/faceToMap/delete",{
        params:{
            id,
        }
    });
    return result;
}

//根据封面id查找模板内容id
export async function searchFaceToMap(faceId){
    const result = await request().get("/api/faceToMap/search",{
        params:{
            faceId,
        }
    });
    return result.data.data;
}
