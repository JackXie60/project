import request from "./request";

//添加待办
export async function addBacklog(info){
    const { appkey,content,startTime,endTime,isFinished,planTime,finishedTime } = info;
    const result = await request().post("/api/backlog/create",{
        appkey,
        content,
        startTime:startTime/1000,
        endTime:endTime/1000,
        isFinished,
        planTime,
        finishedTime:finishedTime/1000,
    });
    return result;
}

//删除待办
export async function deleteBacklog(info){
    const {id} = info;
    const result = await request().delete("/api/backlog/delete",{
        params:{
            id,
        }
    });
    return result;
}

//更新待办
export async function updateBacklog(info){
    const { content,isFinished,id,finishedTime } = info;
    console.log(info)
    const result = await request().put("/api/backlog/update",{
        id,
        content,
        isFinished,
        finishedTime,
    });
    return result;
}

//查找待办
export async function searchBacklog(info){
    const result = await request().get("/api/backlog/search",{
        params:{
            appkey:info.appkey,
            time:info.time,
            planTime:info.planTime,
        }
    });
    return result.data.data;
}
//根据时间查找待办事项
export async function searchBacklogWithoutPlan(info){
    const result = await request().get("/api/backlog/searchWithoutPlan",{
        params:{
            appkey:info.appkey,
            startTime:info.startTime/1000,
            endTime:info.endTime/1000,
        }
    })
    return result.data.data;
}
//查找快要过期的待办事项
export async function searchSoonExpire(info){
    const result = await request().get("/api/backlog/searchSoonExpire",{
        params:{
            appkey:info.appkey,
            endTime:info.endTime/1000,
            nowTime:info.nowTime/1000,
        }
    })
    return result.data.data;
}