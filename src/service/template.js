import request from "./request"

//添加模板封面
export async function addTemplateFace(appkey, imgSrc, planTime, desc = "默认模板") {
    const result = await request().post("/api/template/create", {
        imgSrc,
        planTime,
        desc,
        appkey,
    });
    return result.data.data;
}

//修改模板
export async function updateTemplateFace(id, info) {
    const result = await request().put("/api/template/update", {
        ...info,
        id,
    });
    return result;
}

//查找模板

export async function searchTemplateFace(appkey, planTime) {
    console.log("都到这里了", appkey, planTime)
    const result = await request().get("/api/template/search", {
        params: {
            appkey,
            planTime,
        }
    })
    return result.data.data;
}

//删除模板
export async function deleteTemplateFace(id) {
    const result = await request().delete("/api/template/delete", {
        params:{
            id,
        }
    })
    return result;
}