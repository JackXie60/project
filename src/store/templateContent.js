import {addTemplateContent,updateTemplateContent,searchTemplateContent,deleteTemplateContent} from '../service/templateContent';

const TemplateContent = {
    namespaced: true,
    state:{
        templateContentList:[],
        isLoading:false,
    },
    mutations: {
        setTemplateContent(state,payload){
            state.templateContentList = payload;
        },
        setIsLoading(state,payload){
            state.isLoading = payload;
        }
    },
    actions: {
        async addTemplateContent({commit},{appkey,todolist}){
            commit("setIsLoading",true);
            const result = await addTemplateContent(appkey,todolist);
            commit("setTemplateContent",result);
            commit("setIsLoading",false);
            return result;
        },
        async searchTemplateContent({commit},{id}){
            commit("setIsLoading",true);
            const result = await searchTemplateContent(id);
            commit("setTemplateContent",result);
            commit("setIsLoading",false);
            return result;
        },
        async updateTemplateContent({commit},{id,todolist}){
            commit("setIsLoading",true);
            const result = await updateTemplateContent(id,todolist);
            commit("setTemplateContent",result);
            commit("setIsLoading",false);
        },
        async deleteTemplateContent({commit},{id}){
            commit("setIsLoading",true);
            await deleteTemplateContent(id);
            commit("setTemplateContent",null);
            commit("setIsLoading",false);
        }
    }
}
export default TemplateContent;