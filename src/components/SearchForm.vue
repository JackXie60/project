<template>
  <div class="inline-wrapper">
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="搜索关键字">
        <a-input v-model="formInline.keyword" placeholder="请输入关键字">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          allowClear
          show-search
          placeholder="请选择商品类目"
          option-filter-prop="children"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option
            :value="cateItem.id"
            v-for="cateItem in categories"
            :key="cateItem.name"
          >
            {{ cateItem.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit">
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

export default {
  props: {
    categories: Array,
    page: Number,
    size: Number,
    formInline: Object,
  },
  methods: {
    handleSubmit() {
      this.$emit('changeFormInline', this.formInline);
      this.$emit('getProductData');
    },
    handleChange(e) {
      this.formInline.category = e;
    },
  },
};
</script>
<style lang="less">
.inline-wrapper {
  padding: 10px;
}
</style>
