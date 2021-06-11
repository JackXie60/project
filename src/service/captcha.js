import request from "./request"

export async function createCaptcha(){
    const result = await request().get("/api/captcha");
    return result;
}