import Vue from "vue";
import {Store,install} from "vuex"
import banners from './banner'
import setting from './setting'
import project from './project'
import message from './message'
if(!window.Vuex){
    install(Vue);
}
const store = new Store({
    modules:{
        banners:banners,
        setting:setting,
        project:project,
        message,message
    }
})
export default store;