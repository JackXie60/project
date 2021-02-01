<template>
  <a-table
  :columns="columns"
  :data-source="productList"
  :pagination="pagination"
  @change="change"
  >
    <div slot="operation" slot-scope="text, record">
      <button class="edit" @click="editProduct(record)">编辑</button>
      <button class="delete" @click="removeProduct(record)">删除</button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '未上架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 120,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: {
    productList: Array,
    pagination: Object,
    formInline: Object,
  },
  methods: {
    change(page) {
      this.$emit('changeCurrent', page.current);
      this.$emit('getProductData');
    },
    editProduct(record) {
      this.$emit('editProduct', record);
    },
    removeProduct(record) {
      this.$emit('removeProduct', record);
    },
  },
  data() {
    return {
      columns,
    };
  },
};
</script>
