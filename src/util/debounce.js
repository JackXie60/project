export default function debounce(callback,duration){
    let timer = null;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            callback(...args);
        },duration)
    }
}