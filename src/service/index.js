import request from './request';

//登录
export async function loginIn(username,password,captcha){
    const result = await request().post("/api/login",{
        username,
        password,
        captcha,
    })
    //如果服务器返回401报错，说明需要验证码
    if(result && result.data && result.data.code==401){
        return result.data;
    }
    if(result && result.data&& result.data.data){
        localStorage.setItem("appkey",result.data.data.appkey);
    }
    return result.data.data;
}

//登出
export function loginOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("appkey")
}

//注册

export async function signup(password,username,avator,captcha){
    const result = await request().post("/api/signup",{
        username,
        password,
        avator,
        captcha,
    })
    if(result && result.data && result.data.code==401){
        return result.data;
    }
    return result.data.data;
}

//whoami

export async function whoami(){
    const result = await request().get("/api/whoami");
    return result.data.data;
}