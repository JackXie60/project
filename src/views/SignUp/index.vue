<template>
  <div class="login-container">
    <Layout>
      <template #content>
        <div class="content">
            <img
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3555757360,2241249051&fm=26&gp=0.jpg"
              alt=""
            />
        </div>
      </template>
      <template #right>
        <div class="right">
          <h2>Build Your todolist</h2>
          <span>Work more efficiently</span>
          <div class="login-area">
            <div class="username">
              <input
                @focus="handleFocus"
                @blur="handleBlur"
                type="text"
                placeholder="请输入用户名"
                v-model="nameText"
                ref="nameInp"
              />
            </div>
            <span class="error" v-show="nameErr != ''">
              <Icon type="about" />
              {{ nameErr }}
            </span>
            <div class="password">
              <input
                @focus="handleFocus"
                @blur="handleBlur"
                type="password"
                v-model="passwordText"
                placeholder="请输入密码"
                ref="passwordInp"
              />
            </div>
            <span class="error" v-show="passwordErr != ''">
              <Icon type="about" />
              {{ passwordErr }}
            </span>
            <div class="password">
              <input
                @focus="handleFocus"
                @blur="handleBlur"
                type="password"
                v-model="resetPasswordText"
                placeholder="请输入密码"
                ref="resetPasswordInp"
              />
            </div>
            <span class="error" v-show="resetPasswordErr != ''">
              <Icon type="about" />
              {{ resetPasswordErr }}
            </span>
            <div
              class="avator"
              ref="imgWrap"
            >
              <div :key="img" class="avator-item" v-for="(img, i) in imgs">
                <div class="item-wrap" :class="{'selected':selectedAvator==i}">
                  <img :src="img" alt="" @click="handle(i, $event)" />
                </div>
              </div>
            </div>
            <div class="captcha" v-if="showCaptcha">
              <input v-model="captcha" type="text" placeholder="请输入验证码" />
              <span
                class="captchaImg"
                @click="getCaptcha"
                v-html="captchaImg"
              ></span>
            </div>
            <div class="login">
              <button @click="handleSubmit">登录</button>
            </div>
            <a @click="toLogin">密码登录</a>
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/base/Layout/index.vue";
import Icon from "@/components/base/Icon/index.vue";
import { createCaptcha } from "@/service/captcha.js";
export default {
  components: {
    Layout,
    Icon,
  },
  methods: {
    handle(i, event) {
      this.selectedAvator = i;
      const { imgWrap } = this.$refs;
      window.imgWrap = imgWrap
      //点击元素的宽度，元素包裹层的宽度，当前点击元素距离窗口右边的距离
      const sWidth = event.target.offsetWidth;
      const pWidth = imgWrap.offsetWidth;
      const sDis = event.target.getBoundingClientRect().left;
      const pDis = imgWrap.getBoundingClientRect().left;
      console.log((pDis+pWidth/2-sWidth/2)-sDis);
      this.moveTo(imgWrap.scrollLeft,sDis-(pDis+pWidth/2-sWidth/2));
    },
    //滚动条运动
    moveTo(start, end) {
      let speed = 5;
      let dis = 0;
      if (end < 0) {
        speed *= -1;
      }
      const timer = setInterval(() => {
        dis += speed;
        this.$refs.imgWrap.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.imgWrap.scrollTop = start + end;
          clearInterval(timer);
        }
      }, 2);
    },
    toLogin() {
      this.$router.push({
        path: "/login",
        query: { redirect: this.$route.query.redirect },
      });
    },
    handleFocus(event) {
      event.path[0].style.borderColor = "red";
    },
    verifyUsername() {
      if (this.nameText.length >= 4 && this.nameText.length <= 8) {
        this.nameErr = "";
        this.$refs.nameInp.style.borderColor = "#ccc";
      } else {
        this.nameErr = "请输入正确的用户名";
      }
    },
    verifyPassword() {
      if (this.passwordText.length >= 6 && this.passwordText.length <= 10) {
        const matchs = this.passwordText.match(/[\u4E00-\u9FA5]/g);
        if (matchs && matchs.length > 0) {
          this.passwordErr = "密码必须是字母,数字或者特殊字符";
        } else {
          this.passwordErr = "";
          this.$refs.passwordInp.style.borderColor = "#ccc";
        }
      } else {
        this.passwordErr = "请输入正确的密码";
      }
    },
    verifyResetPassword() {
      if (
        this.passwordErr != "" ||
        this.resetPasswordText != this.passwordText
      ) {
        console.log(1);
        this.resetPasswordErr = "请确认两次密码是否合法或一致";
      } else {
        this.resetPasswordErr = "";
      }
    },
    //检验所有输入的合法性
    verifyAll() {
      this.verifyUsername();
      this.verifyPassword();
      this.verifyResetPassword();
    },
    handleBlur(event) {
      //检验用户名是否输入合法
      if (event.path[0] == this.$refs.nameInp) {
        this.verifyUsername();
        //检验密码是否是否输入合法
      } else if (event.path[0] == this.$refs.passwordInp) {
        this.verifyPassword();
        //检验再次输入的密码是否一致
      } else if (event.path[0] == this.$refs.resetPasswordInp) {
        this.verifyResetPassword();
      }
    },
    handleSubmit() {
      this.verifyAll();
      if (
        this.passwordErr != "" ||
        this.nameErr != "" ||
        this.resetPasswordErr != ""
      ) {
        return;
      } else {
        //注册
        this.$store
          .dispatch("login/signup", {
            username: this.nameText,
            password: this.passwordText,
            captcha:this.captcha,
            avator:this.imgs[this.selectedAvator]
          })
          .then((resp) => {
            if (resp && resp.code == 401) {
              alert("请输入正确的验证码");
              this.showCaptcha = true;
            }else if(!resp){
              alert("无效的注册");
            }
            this.getCaptcha();
          });
      }
    },
    async getCaptcha() {
      const result = await createCaptcha();
      this.captchaImg = result.data;
    },
  },
  data() {
    return {
      nameText: "",
      passwordText: "",
      resetPasswordText: "",
      nameErr: "",
      passwordErr: "",
      resetPasswordErr: "",
      imgs: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGLwgwNjByWlRfvPpmJ6MvMb8qJB_YssYYQ&usqp=CAU",
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,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",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAzFBMVEX///94dnf87u0AAADFw8RBODkVFRWnoaF7eXoSEhIWFhYYGBgbGxv97+4xLzAeHh4sLCwmJiYMDAwpKSnKyMk8PDwwLi81NTX/9fTu7u5BQUFNTU3Y2Nhxb3Dq6uo3NzeXl5dVVVVmZmaxsbGoqKi+vr7s7OyGhoZjY2PR0dGPj49HR0eKioqioqLh4eH/3tzXzMw8MjNeV1fr4OC0rKuhmZj84+HFu7t/gYAkHh+Dennj2dhXTk1nYWAYEhS+sbDQw8IACABKQUIvJSaRNEM9AAAXkUlEQVR4nO18fWOiOvN27dhISCQkiCBIEdRblNan25et25ez+9vz/b/TMwFt1UL3PveptX9wnbO7tb7lYiYz10xCTk4aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0+HJOL+bGHcFhcAEB6fuxRHBKhIgJgNviQDxtMUuOrecQACOEyVt7k33/WcGYDWNa//6APRRsZUg8piqz37z5pGgEQTlT8MQP7MIyBUyu3lXAIpP/CwUYJmEJQk1D5cYP7EExAECGjzOMO5bD636Zjb2SByU0lAkUIfLGJeClMJmRitDKuTA5uTVQdnAx7vd70vOoKLGegKKNKJlFimgwuDzrgf4yRstG1ZKtlRAkoR7F0l8R5ezwKbYcSKEBplhiT5fYLDD39KHWylrGyCWGQfi6DP+ESpKBUJYbRMq7R14iC6ea5QS+NbXAFVYThheDEJIKCQqL2Yv2KaSiVySjYkf6ARJnoB9mxuFRjQWgee9xrIQwjk5pDMsQnhiOJZJzAdR1uAgigAIooRSkhwhMQ4ovm+DtqKhqnLUN/gKREWOqLMRwBdwwhaVgM0Yg8YFTAymBoKBWCi1PMzpMojVqRkUZpksQ2VchTcBWlQBmGlxzp6Xcb19SkjKnk2Jx2gbFU3kni2MUY0YwJVwRtRolUCqz8OsLfFexLFhpp6KjYYSagwa2sNJ9+zjGJmdCv5qVTzBadVEh1vR6oEQUEQdF2SbQhtwdNkipOBJORsWFooElpmCkVHJvTLpZgwqLzg3G5GX1imxhv7DCqZrd5WSsRmPy4mUcbhq6S6i5S9IvJtgFqGuM2w0iSlH4aMEoUSd6ltzZkgoZmSqTlSyNlQnYbqK8WaU5wSEnnjjhSGtpFJZVEBa0/EywuR6gjq8oKvhZO3btORmB0bEp7WCgSdDqZYirD6YXJjavkv6FXckwlFl/aw/GtjF9POjElo2NT2gNKb3XX6QhL2EaGmUKx6L8mqBFSzPjSMDxk2kFnkF9Nl2KoYSrqdFpKiFxhNnNLgkaJWuNpCVM8jSqBEsZDQeis07lAYbCs/J6PKbH/J2SUup1Ox5aEcqbCde5L8zBMkusae0ae7Ug79iL90uiHnox4bfBTMNyQym8ZZMHRbLsAm6ObGopwzvI1wQRVqNZoPKokqLjJKaFmXNo7UQKrJgMZupQald9yifJo+MnMNliCBc949YGg5toQSijWs6i0abbJdq00jV4saiudCxW4mwuiOwWLTmehhBxVfUk7UPRV0h8E73TTApBO5wIJKefFJ6PAQbEKKn55rEU3cze5L89dN8+zzQVBKxIVd25TIiqn4bmwmQgOWlYZsVkriKdCqFRi7na3Jp2OItGLi0ZoTZM7TJhrm+4HIiMETIQdh6io6itywDJb1sSgD0EPTK+2RTHAr1eOVE5N3ETkhDIihU2orHmFYVNU4abtVrniDISLZaZ5QCOmuq6jUNNNm+pZVGiamtFfWiizUYMKytWs+mVGhFbG/6o8ZYqVitO5VlbdAD4ACSScMgFutZ9gRqPVUVMDI8g1zkFTEPyE50lnUU0xYTiTvYr5fo4eoC46FwzV08GyoitFOhJKZKQyYrsYJ7I6E44wCdwFCghGQ5Xig86o8qVRzClcVHx6hrV0NOl0UnJAzSo9kc2nlvbGik7YJTAIagjqJFewipIgbK0fdGaVfopMKhhcgmVnt/pdDovhUAwtBRe9XjsFIWCxPxnakqngpZDdxUPnFbdbP1eZ0YhVhZcuQUpZvsmgAcwOxNBF/+m1272FANuG3SWKgcNqI+SsU4eqyRhR8baVmHm2WpTvmeQxhwPNRNQgGTJs96YJUA6t7edaLq2rl4xagpUUDRf16d5EX4CCdPOeO8yJo8MwRC+NNMN2r50IydXq9akhyJ1Uv427dxhWUDQy3abb+eJzRRxU5JPO3eLuQrcbWX4Yhq6jCob4Zz7jXMB488zAU1TVJIrRewSrwo3hCWdXuCzA9bzAcmOGsleLWVUtzP81IilavXZpxV7AzddhXGIWyKtNuHifIEaOt0aUZDdhjEDYAapCLCGl5LqrfCDlZoBISoa9qcUovFzIc6BUVJtwdxJOij93xb/v+GmuxG6NnwCoQK942ECTJBkfSppG4AWlBSccL+WrOh6hCWvCzNpH7xatKE2fgzCUoUVlHsdB1prd3Vb6qZGagns7Xz0cr6LRaDTtHXavQAuUXVhwAqhMwteIjVWPWcmvZaC1ZlHumahnqYmCRhGUtlwpkypQPIhGt53R23dhMXzgOrAaK2WbOh9OObO3S9SBpJu+xd5IjajlgFZqZiFadRccC2RetMOFwF/hNXuuyPuRoOwYq8Coy0wdSXNiQbaVcy9xFlbyS6ReukBCJmFoQZNx6vIUo4UUmG2wyBAmlviQp/sc0YjUOYIR52DCtDcGM952USzvsah7awfkp1hhLcaFdJx+37ME4arv9mPLcj3Xs6Wk1NYLUPabXhXqp+TzG2s9YM50AZzQnRJ8oBveb6wQuVRIdErpuJ6F6Ms+/kWFw/LAs7wgwIeu5fU5p7r1kcxa25rWiDDdHkp91mOQEOpwLvcUxwTT8H6qQDdD5cGlI2OrQPzc+eFYaESUr3Hfyh0uLWQuTdLHup4RujeRDY858J9Pp4jXm3qwX76FSuxNQyOSCg0o+hZGDBtNZ3ni/uTqWVh97bZoOmlyrIQdC+eoQN6mYNzbrUsixcTnr5KihyrI93qy/wFCdyXpKuUYL6m04gBDp215sRU8+Kfd0wdueZQQZllF9EF2AuOPZXm2bjnKnfJZL7MdIWNEXnixP/8HQMWOixmZYIKantUPJDLBCBP2r2+6p6dd/960BTFN0dcEkWuRP/qei2ZkhMEuRcKFdcQu/ivG0qTb01CvHzHtoQjJiAys3Dp7RIII//FvWbS5kZ/nCEARrS2q5yqmjt0miE77VH4FiijZtqchzkGJVirDCyWm7fb78tY/LdF9vBaAgcUkPHZ/zvooNXksPYEeLahD1VZmXBkYqypbNp+NGea67cVe4TFWEsTZxkg/cOViQxApdn/eE0DJ5oVPp/7NfefhOXi4uVtItGJAhXpJjCi/KfpC688DODhGtl6kzjcDw/KGrAliaiDS6zudF4J6Mnb9x5nz+7aL0A/87o2Pf99LHXiFLV4W9B3BUBIdax1mBwlwGjPbWEcZy2YlQYehWPNcPjvtnu6g65/63e6WWfFn/1Yk1g9na68D1rpZ+/MzYiUuJbisLPENGdikJNjHdGA68V8Pfre03jbH7cfdkvXvvmtJ9NPN2qMk8utsMj2XqM+Kdc4Q6yMMjTqQcgyY0v7R2bfgDtMC6xj0ox9YNiGQbpYTpWofm9kGs5cKWGB5W8hN1ClMqR/P9yc4y+o4+le39/f3a5f171AneOxVPihqfZWtX3MgzNXRFHUIITj/bKuPxZ+Kb29Or5DCrxu/kmD3JyYLBeT56hRf0L3B/C/7Gz/VG20kfMC+8Y/ACPQ2ChxWqjvTDjV5P+GYCR/v0nI/KTxXWtG/BV0PY8QMrtDO/jOQHzlGYln4KQoHKivXET8fiWBBdGG0jNjE1I2yjHsWhXD2A5QjpY3pMa901O5jICjyFw7A073vL4Bwy6ZSSL1FwxH4+8WxuZXIsFKiuWFELFbcwxDK83z2GAmFowXrL+DQWjN8kzb8x5v7WxdDMYd7/woY7et4qqeiwRndW6KZRsfKjgMTJOGeEQrblRbGCtuNbq7AoSAf7m9Ofz1e3bxQ27clhlL/5o4qAdf+I+BEtCzGTJQ2hk1UuPM1y0DB0YJrCJQCVvWU9S1iUvevK/8Xut9PLVk0h1cL7luxUDb+zQMmCd/XDGNPMkYDw8gwcez0DlOc7gdc//0DFkqKRHlY7+ht6H91cNw/W1qOPT4+rgl2Xzi90vRPHzHQao5XP/GvCLCwyj1PMBTsuqk+2v4OXWuQo23KzIXtYbaXmCeoCXdatKD5/PsnMMF7eKxxUr8DFsDvX35J3L8Ak1mxZ+sqWWI+TXa2YOZ61/ReB+XTMOe248ZSS26HULFWZd1TwEpQUnAeN1b8vpctmAqUgqt19XiHDHXbSm9OdYSCbKd7nwlPmeaRtvTNKeUSLzwyxH/ctdQ8dRU+4pgR+jcl4/+HeJ2DN3gBbBOfvi6Vm2ZoWp5nxdJMjMVkbyndkiogYi/8fBpy0L1Rlfctx6RQmgyjv8l089ci8Kvg8F0z/L5lQo4GZ4JBWSEXDPuW6wiq5Nt2iStVmGFNPa4cwaHxn2mKk4dw8gM1+Nrr/I60ORcejymUNfALQ10nnvpPlFOBKs+T0Yah4KFjKku5Ap13L256AU1WliKH3BT1DpYBKTbLoArjcFsyuAOq12HwD9rwdE3x+0vI6f7GaWUKj9rkec1QUeoqi3D6f2Dju3YXmkDRxMhQ5B1FyrWBYLICMHFgCkqTdG8pVhpI2vPIS8p/DTXdU0uZAmUdFc6LDZV7gSHm+vZX5xqE2J1yYJlpy/AoASvknvhXtwH+c7iCUuvuHrMDyIyWMrR788yUh4U+FQ87WWJdEfrPjt4BFkgOP8tL8suBx1sG6anua8z29pLOQWCVbeBswGnq4MVR8Ik3Hl8AgxlWgpgB72+UcB78dbrDtG2hVa+6uxSLK4BPCyJMdLv8xawYo56jx26RbtzdvaQTlAOR7pMUC/lMUfKZjTjX0Z75/ft33VtaqPVEPPUXAXjou+3t+hBf8eu5SPKn16BDrQOvzcbiQujP0SZ21XanbQXMLArHKMmDIAzxAnzi0k2o2J2/CZX+/Z2/sdXtQ/r0sC6Au1qj+r7/6xpokSC7p6EuHvu97QtQfIiOR/4InO2YshKb6h9L0dFqhlnpE+tjDOH3/svg/NcR+xpr3X1zd3t1f/sQARaMZULRV+Cic7rTAXhlaMlkm6Er6esanmGkUuzvKzokErX2Uj246q5M97QodjESSQV0o1RfL8DLDP3+vfDS7pXNt2+VXWLxmG0xDCVxP4/gyQxHc1dUSm8rwM3YH0EvTWAugd/3tf03/+H5pgzE/rNi28FygtF6a+3AEK78zI7/UnciHu4xo0nxWN12wun5xFGpJE9Xp3uRdauaekAb3+rJevOMIm07kuRYuGwvTSnb/dSKfwqoLiF3QYF1XtM9ROaPNze+360zYGE4opTVul04jp1vb147B7a938NIMFl87rrUVOjt246+X9l9rKPw0v6tefokkkRxrJAAGAexndAnILc3zhmOJz77/r3BwtGhP7YFPG8ZsVx/eYfWtgVHQO2cA9PHRuwVh4lytzfJG6h+P7/GOJ9fRr2BjfXe7JVi2bb/byj63ZmFOW44mGaul0S7PacphJBsO6my6bEWT4dACDxvcly30jcrCGNqTMDldRX8CmzYdtKEKeto61JDAQTcq5cVp7Le/wNH/3QCLnXqPO8SLLm9S97IgDD7aGuL5wGgt63zWk1+3G1N+f7PM5AO2DWfuAw4YTvbPYzEjfkR76QNAYt372pbjr1jQ1TiCWCqrK9sLzwu9nZdGaEgSpKjdYgX+qZ6iG/XMqcWuv7QLUfMglC/kjYBTt7sQDYyj7DPEt+Dt8exDDLQu4vg4tGvXT3sFpq08xt0Eg3rm9k9sLl8uwPZMDzHJIenOMTpPmxX9IZ6RixDxeH6cl7I6wo3ve2shD60RQB/Z41pCXSzLrzPMcD8aR26LzUYnAzm83nV1wwD6uQmanLI+7c3V3tZsYslPtYaennKGb3zBUtPOXbV/lz81WolDrmXeKlZzYfLwUmvPa8O3EauF3kxd+lCf0/LdX1XEaFs+MMaoaEXFSt2r+q/LlJFyMFsuByig6Lt2iPXvaxd2BteJoG+e8BkW0KnzJL+T8ybq9n0fWlygZnHqrwNQK+qA4PDbSkaDpfD6Xg6ugSR9SbvacT55HJBKXWvbl5mY1eXvj1kOPlDuF+AR52am92NVUSEezjtNpxPXIDWwmCOO0r+IC8MRagNKtUrbcWy1Ml5J8UIQuCdJHGiV5c5f7tDehNLI/OgzajhYuQKrHOI49Gk5q7SDXIg+qQknI3xxePJyeP9JEzA1EleJ8L6PDHGi8Aqw2jho/o+vo+mtYXLPCZUxGFyfU3/cIqFAbZiwxVGToqXJEmwVhbSxR/53AUiasugOdac9XeltiLpHrTBPwJlSqSHIO8fA9ACKTw08rRF9M0JVOkz9ZBphG8aCMlqK73YUrz+ABEjwULykF3vQYADJ7nmiALtHWUxAWrStY17BtqR4PSbDdcRYmDUHrCXmaL6RpW1CUEe+Ni6QQ6CKxleX5viHYbnQC25xSCWQkl764YYTHhUzN5OxjGXdffDFWcVMEmtQy9ctIBKm8bX0n6njlkB2b4V80RQ6VnyJQYOUnA4VSHsp9QBNyWt4acZ5ujdh68sJjZIykNkWBcspjkjVMbBZXt9uSfguei3m2MD5sQKKGp0qjt1O76aAqG1UWY1SyxbfUZHeJiCZCquK2IGqMkwpFt2rJtUIhmNxgtwee8SUM6h2ltg5EFqo0kCGDXApq9HUgyQoHNRa8KMWBb/BIKIMeY6O6n0l3MD0x1VXkb1TcKM0mITHxFpD6kl1Ao0Pwr5uNfrjVOO1wJfuHGGFPNlVkfwIlMs/rzTMdEQbsX9OwOUczYWR6tprzfRJ2IqtArVS8SXvXZvpPBJveQfjObt8ubpUYpGVJCVicfTO+Xq5mBmOuIzj/9cjmZvRdtlkd/FxXR92/B0bCRhXpx4OdW/SJXQD7Je8Xz5mgurSJTuXHcPzepcr880yB37SIv5r+hZQDDEsPHL+JEAoj0eT9cPjdSajcevBBHzFhYSjq0gwQgrhfF6N9vmZge9izV3TKaOfIDrwAC9yZtwWG0T2EavZNxbP1j/MqGcM9QHjoxNLlfr48I2PGdGKwtsanLTPvJZZ8tEa7O/9O0TUR3DXbabHzxOZeAQwQl+QLyxoVEeVZRmgZCmkBix/seDij8KU1ocxXN2JigNe5VU2r0pAs2IPqt/2viqR4VzdnYmGTFNuqma0DOzxCP6HmknxsQUREe+CWOkZSi3cKAOF1mNDcc5dZRwXSUc5ELD0pt7IET/TAODlKl05YtFYGKjM3DqKh2GsrB97Hu9FkBM4hTD7BNizXdttzGhbsqbKCxdyyNCr+W0invEwaHWWflekwii79aLbbAciroOeLIaHme/1w4MQJvIcpQW4aJm5kVgY7JgKBZ0qwoLebe4CmasSoa/z87+oqZUKUPz6XMi0tblF2B3omW2oGxthrNvhMGk2oYj5DcZY5IcT6fjXkJocVbDFFwarwmip+JkVPpQqXy0PLZnbjAoDs072+Abas7xTpSZv8xDCLeEXijLU2EmeH28l7efSX1EwZua46jAcoCo1yF+E0SNKkKNnnIxvG5DmEN5dhEytOi3V4Znf1Pza53U2sIkxvKtETITJjUMI+WoTdCfmdyZlpb1dhie9VHIkgMdRfPPMYhNwtn2+M6IyY26dCGkWve6MUdA+bIJSL7zAWeWPgHvK9woi1i6mCZ2CWobXtSJGk/S0gGnQpnr6ToR9t4nYDz+tBW0P8HD2sjcGx6Kr1WdqJnoRn+QrLD0lSItQ9BECXm2T1Hfxf4VTtxdYiEs432GDOpEDSYMFK9KAqXx5kW9GebSfYYlxa8QT1uOHWwG9XvDkNrpsJrgfD5vOyhhTGXJ3rJdnM3UG3EhwjcU+5TDgY72+kfonD2VxH7/ftowZEouzofnw+FyqddxesNhb44V03y47kr1jPwiRfMM1qynQNTTG4ZnP4TDvsJN652NATHef/uG///9bMT/5b6lwXJ5rpdaEwiftp2gxDdFxZeYiu3o99PTWdIafTvDki7qLc9Phv9QbS3HJ4vn6G+8PMU1uv5WXK10ahy7Z7HBYDDQC8PLf9mJbhutNGo9RfmTcf387Vor7qPdk3dYDLQHzL+K6G7QoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0aNGjQoEGDBg0afBT+PyYVHYQgZYruAAAAAElFTkSuQmCC",
        "data:image/jpeg;base64,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",
      ],
      showCaptcha: false,
      captcha: "",
      captchaImg: "",
      selectedAvator:0,
    };
  },
  async created() {
    this.getCaptcha();
  },
};
</script>

<style scoped lang="less">
@import "~@/style/center.less";
.login-container {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      .center();
      border-radius: 30%;
    }
  }
  .right {
    width: 550px;
    padding-top: 100px;
    color: #fff;
    padding-left: 20px;
    h2 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    span {
      font-size: 20px;
    }
    .login-area {
      background-color: #fff;
      width: 400px;
      margin-top: 30px;
      border-radius: 10px;
      padding: 40px 0;
      text-align: center;
      position: relative;
      .error {
        color: red;
        display: block;
        text-align: left;
        width: 300px;
        margin: 0 auto;
        padding-left: 5px;
        font-size: 14px;
      }
      .username {
        height: 60px;
        line-height: 60px;
        display: block;
        margin: 0 auto;
      }
      .password {
        height: 60px;
        line-height: 60px;
        display: block;
        position: relative;
      }
      > div {
        width: 300px;
        margin: 0 auto;
        margin-top: 20px;
      }
      div > input {
        width: 300px;
        height: 40px;
        border: none;
        outline: none;
        text-indent: 1em;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
      }
      .login {
        width: 300px;
        margin: 0 auto;
        height: 80px;
        line-height: 80px;
        button {
          width: 100%;
          height: 40px;
          font-size: 18px;
          border: none;
          outline: none;
          background-color: #fa8919;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
        }
      }
      a {
        text-decoration: none;
        color: rgb(110, 103, 103);
        cursor: pointer;
      }
    }
  }
}
.password-active-icon {
  .iconfont {
    position: absolute;
    top: 0;
    right: 0;
    color: rgb(133, 129, 129);
    margin-top: 5px;
  }
}
.avator::-webkit-scrollbar {
  width: 0px;
  display: none;
}
.avator {
  border: 1px solid rgb(133, 129, 129);
  overflow-x: scroll;
  overflow-y: hidden;
  height: 100px;
  display: flex;
  box-sizing: border-box;
  border-radius: 5px;
  align-items: center;
  padding-right: 10px;
  .avator-item {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    flex: 0 0 auto;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30%;
    .item-wrap{
      border: 2px solid rgb(165, 139, 139);
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      &.selected{
        border: 3px solid rgb(179, 72, 170);
        img{
          transform: scale(1.2);
        }
      }
      >img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
  }
}
.captcha {
  display: flex;
  align-items: center;
  > .captchaImg {
    cursor: pointer;
  }
}
</style>
