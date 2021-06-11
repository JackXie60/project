<template>
  <form @submit.prevent="handleClick" class="data-form-container" id="data-form-container" ref="form">
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          placeholder="用户昵称"
          v-model="nickname"
          maxlength="10"
        />
        <span class="tip">{{ `${nickname.length}/10` }}</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          placeholder="输入内容"
          v-model="textContent"
          maxlength="300"
        ></textarea>
        <span class="tip">{{ `${textContent.length}/300` }}</span>
      </div>
      <div class="error">{{ error.textContent }}</div>
    </div>
    <div class="submit-button">
      <button>提交</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      textContent: "",
      error:{
          nickname:"",
          textContent:"",
      },
      isLoading:false,
    };
  },
  methods: {
    handleClick() {
        this.error.nickname = this.nickname?"":"请输入昵称";
        this.error.textContent = this.textContent?"":"请输入内容"
        //如果有错误
        if(this.error.nickname||this.error.textContent){
            return;
        }
        this.$emit("select",{nickname:this.nickname,textContent:this.textContent},(successMsg)=>{
            this.$showMessage({
                container:this.$refs.form,
                content:successMsg,
                type:"success",
            })
            this.nickname = "";
            this.textContent = "";
        });
    },
  },
};
</script>

<style scoped lang="less">
.data-form-container {
    position: relative;
  .form-item {
    margin-bottom: 30px;
    .input-area {
      width: 400px;
      position: relative;
      input {
        width: 100%;
        border: 0px;
        height: 28px;
        outline: none;
        border: 1px dotted #aaa;
        outline-style: none;
        border-radius: 4px;
        position: relative;
        text-indent: 6px;
        font-size: 14px;
      }
      .tip {
        color: #ccc;
        position: absolute;
        right: 0;
        top: 0;
        height: 28px;
        line-height: 28px;
      }
    }
    .text-area {
      width: 700px;
      height: 150px;
      position: relative;
      margin-bottom: 5px;
      textarea {
        width: 100%;
        height: 100%;
        border: 1px dotted #aaa;
        border-radius: 4px;
        outline: none;
        font-family: "Microsoft soft";
        text-indent: 6px;
        font-size: 14px;
      }
      .tip {
        position: absolute;
        bottom: 0;
        right: 0;
        color: #ccc;
      }
    }
    .error{
        font-size: 14px;
        color: red;
    }
  }
  .submit-button {
    width: 90px;
    height: 30px;
    button {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 5px;
      background-color: #4e6ef2;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
