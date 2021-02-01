<template>
  <a-form-model ref="ruleForm" :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
    <a-form-model-item label="商品售价" prop="price" required>
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="折扣价格" prop="price_off">
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" prop="inventory" required>
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prop="unit" required>
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品相册" prop="images" required>
      <a-upload
        :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.userInfo.appkey"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        name="avatar"
      >
        <div v-if="fileList.length < 8">
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-upload>
    </a-form-model-item>
    <a-form-model-item label="" :wrapper-col="{ span: 24 }">
      <a-button type="default" @click="prev">
        上一步
      </a-button>
      <a-button type="primary" class="doneBtn" @click="done">
        下一步
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import axios from '../api/Url';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  props: ['form'],
  data() {
    return {
      fileList: [],
      loading: false,
      previewVisible: false,
      previewImage: '',
    };
  },
  created() {
    if (this.$route.params.id && this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    prev() {
      this.$emit('prev');
    },
    done() {
      if (this.$route.params.id) {
        axios.editProduct(this.form).then(() => {
          this.$message.success('修改成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      } else {
        axios.addProduct(this.form).then(() => {
          this.$message.success('添加成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
    },
  },
};
</script>

<style>
.doneBtn {
  margin-left: 20px;
}
</style>
