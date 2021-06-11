import style from './showMessage.module.less';
import Icon from '@/components/Icon';
import getComponentDom from "./getComponentDom";
export default function showMessage(options){
    const content = options.content||"";
    const type = options.type||"primary";
    const duration = options.duration||1000;
    const container = options.container||document.body;
    const ele = document.createElement("div");
    const icon = getComponentDom(Icon,{
        type,
    });
    ele.innerHTML = `<span class="${style.iconfont}">${icon.outerHTML}${content}</span>`;
    ele.classList.add(style.showMessage);
    ele.classList.add(style[type]);
    container.appendChild(ele);
    ele.clientHeight;
    ele.classList.add(style.center);
    setTimeout(()=>{
        ele.classList.remove(style.center);
        ele.style.opacity = 0;
        ele.addEventListener("transitionend",()=>{
            ele.remove();
            options.callback&&options.callback();
        })
    },duration)
}