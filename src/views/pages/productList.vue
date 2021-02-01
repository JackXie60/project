<template>
  <div class="product-list">
    <!-- 表单区域 -->
    <a-button class="add-button">
      <router-link :to="{name:'ProductAdd'}"
      >
        添加商品
      </router-link>
    </a-button>
    <search-form
      :categories="categories"
      @getProductData="getProductData"
      :formInline="formInline"
      @changeFormInline="changeFormInline"
    />
    <!-- 产品表格区域 -->
    <product-table
      :productList="productList"
      :pagination="pagination"
      @changeCurrent="changeCurrent"
      @getProductData="getProductData"
      @removeProduct="removeProduct"
      @editProduct="editProduct"
    />
  </div>
</template>

<script>
import axios from '../../api/Url';
import SearchForm from '../../components/SearchForm.vue';
import ProductTable from '../../components/ProductTable.vue';

export default {
  components: {
    SearchForm,
    ProductTable,
  },
  data() {
    return {
      formInline: {
        keyword: '',
        category: '',
      },
      categories: [],
      productList: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
    };
  },
  methods: {
    getProductData() {
      axios
        .getProductList({
          size: this.pagination.pageSize,
          page: this.pagination.current,
          searchWord: this.formInline.keyword,
          category: this.formInline.category,
        })
        .then((res) => {
          this.pagination.total = res.total;
          this.productList = res.data.map((item) => ({
            ...item,
            key: item.id,
            categoryName: this.categories.find((categoryItem) => {
              if (categoryItem.id === item.category) {
                return true;
              }
              return false;
            }).name,
          }));
        });
    },
    changeCurrent(current) {
      this.pagination.current = current;
    },
    changeFormInline(formData) {
      this.formInline = formData;
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '删除商品',
        content: () => <div style="color:red;">{`确定要删除${record.title}`}</div>,
        onOk: () => {
          axios.removeProduct({
            id: record.id,
          }).then(() => {
            this.getProductData();
          });
        },
        class: 'remove-product',
      });
    },
  },
  created() {
    axios.getCategory().then((res) => {
      this.categories = res.data;
    });
  },
};
</script>

<style lang="less">
  .product-list{
    position: relative;
    .add-button{
      position: absolute;
      right: 15px;
      top: 14px;

    }
  }
</style>>
