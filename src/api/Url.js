import axios from '../axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  getCategory(params) {
    return axios.get('/category/all', { params });
  },
  getProductList(params) {
    return axios.get('/products/all', { params });
  },
  removeProduct(params) {
    return axios.delete(`/products/${params.id}`);
  },
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  detail(params) {
    return axios.get(`/products/${params.id}`);
  },
  editProduct(params) {
    return axios.put('/products/edit', params);
  },
};
