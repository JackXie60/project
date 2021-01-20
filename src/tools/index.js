import Vue from 'vue';
import com from './index.vue';

const Amimate = Vue.extend(com);
export default function ({
  startX, startY, endX, endY, src, width, height,
}) {
  const app = new Amimate({
    el: document.createElement('div'),
    data() {
      return {
        width,
        height,
        opacity: 1,
        moveX: startX,
        moveY: startY,
        sx: 1,
        sy: 1,
        exist: true,
        src,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.opacity = 0;
    app.sx = 0.1;
    app.sy = 0.1;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 1100);
}
