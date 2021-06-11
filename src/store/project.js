import getProjects from '@/api/project.js';
export default {
    namespaced: true,
    state:{
        isLoading:false,
        data:[],
    },
    mutations: {
        setLoading(state,payload){
            state.isLoading = payload;
        },
        setProject(state,payload){
            state.data = payload;
        }
    },
    actions: {
        async setProject({commit}){
            commit("setLoading",true);
            const projects = await getProjects();
            commit("setProject",projects);
            commit("setLoading",false);
        }
    }
}