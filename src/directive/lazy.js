import eventBus from '../eventBus.js';
import debounce from '../util/debounce.js';
let imgs = []

function setImage(img) {
    img.dom.src = "https://raw.githubusercontent.com/DuYi-Edu/DuYi-Vue2/main/1.%20%E5%85%A5%E9%97%A8/31.%20%E5%9B%BE%E7%89%87%E6%87%92%E5%8A%A0%E8%BD%BD/%E8%AF%BE%E5%A0%82%E4%BB%A3%E7%A0%81/my-site/src/assets/default.gif";
    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    const height = rect.height||200;
    if (rect.top > -height && rect.top <= clientHeight) {
        const Img = new Image();
        Img.addEventListener("load", () => {
            img.dom.src = img.src;
        })
        Img.src = img.src;
        imgs = imgs.filter(i => i != img);
    }

}

function setImages() {
    for (let img of imgs) {
        setImage(img);
    }
}

function handleScroll() {
    setImages();
}
const debounceScroll = debounce(handleScroll, 50);
eventBus.$on("mainScroll", debounceScroll);
export default {
    inserted(el, binding) {
        const img = {
            dom: el,
            src: binding.value
        };
        imgs.push(img);
        setImage(img);
    }
}