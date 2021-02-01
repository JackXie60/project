<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :label-col="{span:4}"
    :wrapper-col="{span:14}"
  >
    <a-form-model-item label="副标题" prop="title" required>
      <a-input
        v-model="form.title"
      />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input
        v-model="form.desc"
      />
    </a-form-model-item>
    <a-form-model-item label="商品类目"
    required
    prop="category">
      <a-select v-model="form.category"
      placeholder="请选择商品类别"
      @change="changeCategory"
      >
        <a-select-option :value="categoryItem.id"
        v-for="categoryItem in categories"
        :key="categoryItem.id"
        >
          {{ categoryItem.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_items">
        <a-select-option :value="citem" v-for="citem in categoryItems" :key="citem">
          {{ citem }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
      v-model="form.tags"
      mode="tags"
      placeholder="Please select"
      :default-value="['包邮，最晚次日达']"
    >
      <a-select-option value="包邮，最晚次日达">
        包邮，最晚次日达
      </a-select-option>
    </a-select>
    </a-form-model-item>
    <a-form-model-item label="" :wrapper-col="{ span: 24 }">
      <a-button type="primary" class="nextBtn" @click="onSubmit">
        下一步
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import axios from '../api/Url';

export default {
  props: ['form'],
  data() {
    return {
      categories: [],
      categoryItems: [],
    };
  },
  created() {
    axios.getCategory().then((res) => {
      this.categories = res.data;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    changeCategory(val) {
      this.categoryItems = this.categories.find((item) => {
        if (item.id === val) {
          return true;
        }
        return false;
      }).c_items;
    },
  },
};
</script>

<style lang="less" scoped>
.nextBtn{
  text-align: center;
}
</style>
