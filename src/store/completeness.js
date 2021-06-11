import {addCompleteness,searchCompleteness, updateCompleteness} from "../service/completeness"

const Completeness = {
    namespaced: true,
    state:{
        completenessList:[],
        isLoading:false,
    },
    mutations: {
        setCompleteness(state,payload){
            state.completenessList = payload;
        },
        setIsLoading(state,payload){
            state.isLoading = payload;
        }
    },
    actions: {
        async addCompleteness({commit,state},{time,finishedTaskNum,appkey}){
            commit("setIsLoading",true);
            const result = await addCompleteness(time,finishedTaskNum,appkey);
            const list = [
                ...state.completenessList,
                result,
            ];
            commit("setCompleteness",list);
            commit("setIsLoading",true);
            return result.data.data;
        },
        async searchCompleteness({commit},{startTime,endTime,appkey}){
            commit("setIsLoading",true);
            const result = await searchCompleteness(startTime,endTime,appkey);
            commit("setCompleteness",result);
            commit("setIsLoading",true);
            return result
        },
        async updateCompleteness({commit},{id,finishedTaskNum}){
            commit("setIsLoading",true);
            const result = await updateCompleteness(id,finishedTaskNum);
            commit("setCompleteness",result);
            commit("setIsLoading",true);
            return result;
        }
    }
}
export default Completeness;