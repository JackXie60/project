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
                :type="isPassWordActiveIcon ? 'text' : 'password'"
                v-model="passwordText"
                placeholder="请输入密码"
                ref="passwordInp"
              />
              <div @click="changePasswordActive" class="password-active-icon">
                <Icon
                  v-show="isPassWordActiveIcon"
                  type="hidden"
                  class="iconPasswordHidden"
                />
                <Icon
                  v-show="!isPassWordActiveIcon"
                  type="show"
                  class="iconPasswordShow"
                />
              </div>
            </div>
            <span class="error" v-show="passwordErr != ''">
              <Icon type="about" />
              {{ passwordErr }}
            </span>
            <div class="captcha" v-if="showCaptcha">
              <input v-model="captcha" type="text" placeholder="请输入验证码">
              <span class="captchaImg" @click="getCaptcha" v-html="captchaImg"></span>
            </div>
            <div class="login">
              <button @click="handleSubmit">登录</button>
            </div>
            <a @click="toSignUp">还没有账号?点击注册</a>
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/base/Layout/index.vue";
import Icon from "@/components/base/Icon/index.vue";
import {createCaptcha} from "@/service/captcha.js"
export default {
  components: {
    Layout,
    Icon,
  },
  methods: {
    //保留query
    toSignUp() {
      this.$router.push({
        path: "/signup",
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
    //检验所有输入的合法性
    verifyAll() {
      this.verifyUsername();
      this.verifyPassword();
    },
    handleBlur(event) {
      //检验用户名是否输入合法
      if (event.path[0] == this.$refs.nameInp) {
        this.verifyUsername();
        //检验密码是否是否输入合法
      } else if (event.path[0] == this.$refs.passwordInp) {
        this.verifyPassword();
      }
    },
    async handleSubmit() {
      this.verifyAll();
      if (this.passwordErr != "" || this.nameErr != "") {
        return;
      } else {
        const result = await this.$store.dispatch("login/loginIn", {
          username: this.nameText,
          password: this.passwordText,
          captcha:this.captcha,
        });
        if (
          this.$store.state.login.userData
        ) {
          const goPath = this.$route.query.redirect;
          if (goPath) {
            this.$router.push(goPath);
          } else {
            this.$router.push("/");
          }
        }else{
          if(!result){
            alert("请确认密码或用户名是否输入正确");
          }else if(result && result.code==401){
            alert("请输入正确的验证码");
            if(this.showCaptcha==false){
              this.showCaptcha = true;
            }
          }
          this.getCaptcha();
        }
      }
    },
    changePasswordActive() {
      this.isPassWordActiveIcon = !this.isPassWordActiveIcon;
    },
    async getCaptcha(){
      const result = await createCaptcha();
      this.captchaImg = result.data;
    }
  },
  data() {
    return {
      nameText: "",
      passwordText: "",
      nameErr: "",
      passwordErr: "",
      isPassWordActiveIcon: true,
      captchaImg:"",
      captcha:"",
      showCaptcha:false,
    };
  },
  async created () {
    this.getCaptcha();
  }
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
      div {
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
.captcha{
  display: flex;
  align-items: center;
  >.captchaImg{
    cursor: pointer;
  }
}
</style>
