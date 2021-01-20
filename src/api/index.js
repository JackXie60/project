import Axios from 'axios';
import baseUrl, { Url } from './URLS';

const appkey = 'dd_1597654682810';
const request = Axios.create({
  baseURL: baseUrl,
  params: {
    appkey,
  },
});
// 获取侧边栏数据
const getSideList = function (type) {
  return request.get(Url.side, {
    params: {
      type,
    },
  });
};
// 获取商品列表数据
const getGoodsList = function (type, page, size, sort) {
  return request.get(Url.goods, {
    params: {
      type,
      page,
      size,
      sort,
    },
  });
};
const search = function (type, page, size) {
  return request.get(Url.search, {
    params: {
      type,
      page,
      size,
    },
  });
};
const likeSearch = function (likeValue) {
  return request.get(Url.likeSearch, {
    params: {
      likeValue,
    },
  });
};
// 设置拦截器
request.interceptors.response.use((value) => value.data);
export default {
  getSideList,
  getGoodsList,
  search,
  likeSearch,
};
