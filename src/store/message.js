import {getMessage} from '@/api/message.js';
export default {
    namespaced: true,
    state:{
        isListLoading:false,
        isLoading:false,
        data:[],
        page:1,
        limit:10,
    },
    mutations: {
        setLoading(state,payload){
            state.isLoading = payload;
        },
        setMessage(state,payload){
            state.data = payload;
        },
        setListLoading(state,payload){
            state.isListLoading = payload;
        },
        addPage(state){
            state.page += 1;;
        }
    },
    actions: {
        async setMessage({commit,state}){
            commit("setLoading",true);
            const message = await getMessage(state.page,state.limit);
            commit("setMessage",message);
            commit("setLoading",false);
        }
    }
}