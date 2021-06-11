import request from './request'

//添加模板内容
export async function addTemplateContent(appkey,todolist){
    const result = await request().post("/api/templateContent/create",{
        appkey,
        todolist,
    })
    return result.data.data;
}

//查找模板内容
export async function searchTemplateContent(id){
    const result = await request().get("/api/templateContent/search",{
        params:{
            id,
        }
    });
    return result.data.data;
}

//更新模板内容
export async function updateTemplateContent(id,todolist){
    const result = await request().put("/api/templateContent/update",{
        id,
        todolist,
    });
    return result;
}

//删除模板内容
export async function deleteTemplateContent(id){
    const result = await request().delete("/api/templateContent/delete",{
        params:{
            id,
        }
    })
    return result;
}