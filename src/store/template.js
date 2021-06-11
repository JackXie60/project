import { addTemplateFace,updateTemplateFace,deleteTemplateFace,searchTemplateFace } from "../service/template"

const template = {
    namespaced: true,
    state:{
        templateList:[],
        isLoading:false,
    },
    mutations: {
        setTemplateList(state,payload){
            state.templateList = payload;
        },
        setIsLoading(state,payload){
            state.isLoading = payload;
        }
    },
    actions: {
        //添加模板
        async addTemplateFace({commit,state},{imgSrc,planTime,desc,appkey}){
            commit("setIsLoading",true);
            const result = await addTemplateFace(appkey,imgSrc,planTime,desc);
            commit("setTemplateList",[
                ...state.templateList,
                result,
            ]);
            commit("setIsLoading",false);
            return result;
        },
        //更新模板
        async updateTemplateFace({commit,state},info){
            const {id,...args} = info
            commit("setIsLoading",true);
            const result = await updateTemplateFace(id,args);
            commit("setTemplateList",[
                ...state.templateList.filter(item=>{
                    return item.id!=id;
                }),
                result,
            ]);
            commit("setIsLoading",false);
        },
        //查找模板
        async searchTemplateFace({commit},{appkey,planTime}){
            commit("setIsLoading",true);
            const result = await searchTemplateFace(appkey,planTime);
            commit("setTemplateList",result);
            commit("setIsLoading",false);
        },
        //删除模板
        async deleteTemplateFace({commit,state},id){
            commit("setIsLoading",true);
            const result = await deleteTemplateFace(id);
            commit("setTemplateList",[
                ...state.templateList.filter(item=>{
                    return item.id!=id;
                }),
            ]);
            commit("setIsLoading",false);
            return result;
        }
    }
}
export default template;