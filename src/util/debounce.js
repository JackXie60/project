//防抖函数
export default function (handler,duration=50){
    let timer = null;
    return (...arg)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            handler(...arg);
        },duration)
    }
}