import {
    addBacklog,
    updateBacklog,
    searchBacklog,
    deleteBacklog,
    searchBacklogWithoutPlan,
    searchSoonExpire
} from "../service/backlog"

const BackLog = {
    namespaced: true,
    state: {
        curBacklog: [],
        isLoading: false,
        backlogWithoutPlan:[],
    },
    mutations: {
        setCurBacklog(state, payload) {
            state.curBacklog = payload;
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        setWithoutPlan(state,payload){
            state.backlogWithoutPlan = payload;
        }
    },
    actions: {
        async setCurBacklog({commit,state}, {appkey,content,startTime,endTime,isFinished,planTime,finishedTime}) {
            commit("setIsLoading", true);
            const result = await addBacklog({
                appkey,
                content,
                startTime,
                endTime,
                isFinished,
                planTime,
                finishedTime,
            });
            commit("setCurBacklog",[
                ...state.curBacklog,
                result,
            ]);
            commit("setIsLoading",false);
        },
        async searchBacklog({commit},{appkey,time,planTime}){
            commit("setIsLoading",true);
            const result = await searchBacklog({
                appkey,
                time,
                planTime,
            })
            commit("setCurBacklog",result);
            commit("setIsLoading",false);
            return result;
        },
        async deleteBacklog({commit,state},{id}){
            commit("setIsLoading",true);
            await deleteBacklog({
                id,
            })
            const list = state.curBacklog.filter(item=>{
                return item.id != id;
            })
            commit("setCurBacklog",list);
            commit("setIsLoading",false);
        },
        async updateBacklog({commit,state},{id,content,isFinished,finishedTime}){
            commit("setIsLoading",true);
            await updateBacklog({
                id,
                content,
                isFinished,
                finishedTime
            })
            state.curBacklog.forEach(item=>{
                if(item.id==id){
                    item.content = content;
                    item.isFinished = isFinished;
                    item.finishedTime = finishedTime;
                }
            })
            commit("setCurBacklog",state.curBacklog);
            commit("setIsLoading",false);
        },
        async searchBacklogWithoutPlan({commit},{appkey,startTime,endTime}){
            commit("setIsLoading",true);
            const result = await searchBacklogWithoutPlan({
                appkey,
                startTime,
                endTime,
            })
            commit("setWithoutPlan",result);
            commit("setIsLoading",false);
            return result;
        },
        //查找快要过期的待办事项
        async searchSoonExpire({commit},{appkey,endTime,nowTime}){
            commit("setIsLoading",true);
            const result = await searchSoonExpire({
                appkey,
                nowTime,
                endTime,
            })
            commit("setWithoutPlan",result);
            commit("setIsLoading",false);
            return result;
        }
    }
}

export default BackLog;