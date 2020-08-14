//导入 axios 模块
import axios from 'axios';

import {Toast} from 'antd-mobile';

//判断 识别开发环境/生产环境,预留空间
// /api===https://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : 'jxwApi';
//创建一个axios 实例,配置对应的属性
const server = axios.create(
    {
        baseURL: BASEURL,//基础地址,Request URL
        timeout: 5000,//响应超时(ms)
    }
);
// 添加请求拦截器
server.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //添加请求头的 位置 config.headers 添加对应的参数
    //例如 config.headers.Tokey='xxxx';
    //例如 config.headers.UserName='xxxx';
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
server.interceptors.response.use(function (response) {
    // 对响应数据做点什么(这里成功请求到服务器/ 产生不同的数据对应的不同的内容 )
    //获取响应的数据
    let data = response.data;
    //console.log(data.data);
    //这里是对应resCode 不为0时的数据,数据获取成功,但是数据不正确所以返回reject
    if (data.code !== 0) {
        const {mes}=data.data;
        Toast.fail(mes, 1);
        return Promise.reject(data);
    } else {
        //这里是对应resCode 为0时的数据,数据获取成功,数据正确
        return response;
        /*这里相当于 Promiser.resolve(response)*/
    }
}, function (error) { //这里请求服务器不成功
    // 对响应错误做点什么
    return Promise.reject(error);
});


//暴露拦截器 使其他模块可以使用
export default server;
