import {loginIn,loginOut,whoami,signup} from '../service/index'
const login = {
    namespaced: true,
    state:()=>({
        isLoading:false,
        userData:null,
    }),
    mutations: {
        setUserData(state,userData){
            state.userData = userData;
        },
        setIsLoading(state,isLoading){
            state.isLoading = isLoading;
        }
    },
    getters: {
        appkey(state){
            if(state.userData){
                localStorage.setItem("appkey",state.userData.appkey);
                return state.userData.appkey;
            }else{
                localStorage.removeItem("appkey")
                return null;
            }
        }
    },
    actions: {
        async loginIn({commit},{username,password,captcha}){
            commit("setIsLoading",true);
            const userData = await loginIn(username,password,captcha);
            if(userData && userData.code==401){
                commit("setUserData",null);
            }else{
                commit("setUserData",userData);
            }
            commit("setIsLoading",false);
            return userData;
        },
        loginOut({commit}){
            loginOut();
            commit("setUserData",null)
        },
        async signup({commit},{username,password,avator,captcha}){
            commit("setIsLoading",true);
            const userData = await signup(username,password,avator,captcha);
            // commit("setUserData",userData);
            commit("setIsLoading",false);
            return userData;
        },
        async whoami({commit}){
            commit("setIsLoading",true);
            const userData = await whoami();
            console.log("userData",userData)
            commit("setUserData",userData);
            commit("setIsLoading",false);
        }
    }
}
export default login;
