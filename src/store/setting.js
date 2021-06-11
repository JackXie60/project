import getSetting from '@/api/setting.js';
import titleController from '@/util/titleController.js'
export default {
    namespaced: true,
    state: {
        setting: null,
    },
    mutations: {
        setSetting(state, payload) {
            state.setting = payload;
        }
    },
    actions: {
        async setSetting({
            commit
        }) {
            const setting = await getSetting();
            commit("setSetting", setting);
            if (setting.favicon) {
                let link = document.querySelector("link[rel='shortcur icon']");
                if (link) {
                    return;
                }
                link = document.createElement("link");
                link.rel = "shortcut icon";
                link.type = "images/x-icon";
                link.href = setting.favicon;
                document.querySelector("head").appendChild(link);
            }
            if(setting.siteTitle){
                titleController.setSiteTitle(setting.siteTitle);
            }
        }
    }
}