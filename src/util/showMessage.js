import getComponentDom from './getComponentDom'
import Icon from '../components/base/Icon'
import style from './showMessage.module.less'
export default function showMessage(options){
    const {type = "primary",content,container=document.body,duration=1000,size=200} = options;
    const messageBox = document.createElement("div");
    const icon = getComponentDom(Icon,{
        type:type,
    })
    messageBox.style.width = size + "px";
    const height = 1/2*size + "px";
    messageBox.style.height = height;
    messageBox.style.lineHeight = height;
    messageBox.innerHTML = `<span class="${style.iconfont}">${icon.outerHTML}${content}</span>`
    messageBox.classList.add(style.messagebox);
    messageBox.classList.add(style[type]);
    container.appendChild(messageBox);
    messageBox.clientHeight;
    messageBox.classList.add(style.center)
    setTimeout(() => {
        messageBox.classList.remove(style.center);
        messageBox.style.opacity = 0;
        messageBox.addEventListener("transitionend",()=>{
            messageBox.remove();
            options.callBack && options.callBack();
        })
    }, duration);
}