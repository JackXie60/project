import { getBanners } from "@/api/banner";
export default {
    namespaced: true,
    state:{
        banners:[],
        isLoading:false,
    },
    mutations: {
        setLoading(state,payload){
            state.isLoading = payload;
        },
        setBanners(state,payload){
            state.banners = payload;
        }
    },
    actions: {
        async setBanners({state,commit}){
            if(state.banners.length>0){
                return;
            }
            commit("setLoading",true);
            const banners = await getBanners();
            commit("setBanners",banners);
            commit("setLoading",false);
        }
    }
}