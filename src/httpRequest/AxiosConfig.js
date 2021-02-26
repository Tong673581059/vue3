/**
 * http协议请求数据
 */
import axios from "axios";
import { BaseUrl, TIMEOUT } from "../config/properties";

// 基础地址，调用时会在每个请求前拼上这个地址
axios.defaults.baseURL = BaseUrl;
// 超时时间
axios.defaults.timeout = TIMEOUT;
// Content-Type设为表单
// axios.defaults.headers["Content-Type"] =
//   "application/json;charset=utf-8";
axios.defaults.headers["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";

// 请求全局处理
axios.interceptors.request.use(
    function(config) {
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// 全局响应
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default axios;
