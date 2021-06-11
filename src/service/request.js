import axios from "axios";

//如果是本地有token就将token一起发送给服务器
//如果返回的响应里面有token就将他保存在本地
//如果响应码是403，那么就删除token
export default function(){
    const token = localStorage.getItem("token");
    let instance = axios;
    if(token){
        instance = axios.create({
            headers:{
                authorization:"bearer "+ token,
            }
        })
    }

    instance.interceptors.response.use(function(resp){
        const token = resp.headers.authorization;
        if(token){
            localStorage.setItem("token",token);
        }
        return resp;
    },function(err){
        if(err.response.status==403){
            localStorage.removeItem("token");
            return Promise.reject(err);
        }
    })
    return instance;
}