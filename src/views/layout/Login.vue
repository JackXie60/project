<template>
  <div class="login-wrapper">
    <a-form-model ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          Submit
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import axios from '../../api/Url';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const emailRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }
      if (!emailReg.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };
    const passwordCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: emailRule, trigger: 'change' }],
        password: [{ validator: passwordCheck, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.login(this.loginForm)
            .then((res) => {
              this.$store.dispatch('setUserInfo', res);
              localStorage.setItem('userInfo', JSON.stringify(res));
              this.$router.push({
                name: 'Home',
              });
            })
            .catch((error) => {
              this.$message.error(error);
            });
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
.login-wrapper{
  margin-top: 100px;
  width: 400px;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
}
</style>
