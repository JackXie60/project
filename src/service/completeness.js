import request from './request';

export async function addCompleteness(time,finishedTaskNum,appkey){
    const result = await request().post("/api/completeness/create",{
        time:time,
        finishedTaskNum,
        appkey,
    })
    return result;
}

export async function searchCompleteness(startTime,endTime,appkey){
    const result = await request().get("/api/completeness/search",{
        params:{
            startTime:startTime/1000,
            endTime:endTime/1000,
            appkey,
        }
    })
    return result.data.data;
}

export async function updateCompleteness(id,finishedTaskNum){
    const result = await request().put("/api/completeness/update",{
        id,
        finishedTaskNum,
    })
    return result;
}
