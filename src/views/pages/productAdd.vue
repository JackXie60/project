<template>
  <div class="product-add">
    <a-steps :current="current" class='steps-wrapper'>
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-product @next="next" v-if="current===0" :form="form"/>
      <sale-product @next="next" @prev="prev" v-else :form="form"/>
    </div>
  </div>
</template>
<script>
import axios from '../../api/Url';
import BasicProduct from '../../components/BasicProduct.vue';
import SaleProduct from '../../components/SaleProduct.vue';

export default {
  components: {
    BasicProduct,
    SaleProduct,
  },
  created() {
    if (this.$route.params.id) {
      axios.detail({ id: this.$route.params.id }).then((res) => {
        this.form = res;
      });
    }
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '添加商品基本信息',
        },
        {
          title: '添加商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: '',
        tags: ['包邮，最晚次日达'],
        price: 0,
        price_off: 0,
        inventory: 0,
        images: [],
        unit: '',
      },
    };
  },
  methods: {
    next() {
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
.steps-wrapper{
  width: 50vw;
  margin: 10px auto;
}
.steps-action {
  margin-top: 24px;
}
</style>
