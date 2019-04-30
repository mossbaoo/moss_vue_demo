import qs from 'qs'
import axios from 'axios'
import {Dialog, Toast} from 'vant'
import {redirect} from '../config';

let loading = null; // 加载的对象

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(response => {
    Toast.clear(loading)    // 先关闭加载

    if(response.data.code != '0'){  // 处理后台返回的错误信息
        Dialog.alert({title: '提示',message: response.data.msg})
    }

    return response
}, error => {
    console.log(error)
    Toast.clear(loading)    // 先关闭加载

    let [response,message] = [error.response,'服务端错误'];
    console.log(response)
    switch (response.status) {
        case 400: message = '请求错误';         break;
        case 401: message = '未授权，请登录';   break;
        case 403: message = '拒绝访问';         break;
        case 404: message = '请求地址出错';     break;
        case 408: message = '请求超时';         break;
        case 500: message = '服务器内部错误';   break;
        case 501: message = '服务未实现';       break;
        case 502: message = '网关错误';         break;
        case 503: message = '服务不可用';       break;
        case 504: message = '网关超时';         break;
        case 505: message = 'HTTP版本不受支持'; break;
        default: message = '服务端错误';        break;
    }

    // 弹框提示错误
    Dialog.alert({title: '提示',message: message}).then(()=>{
        if(response.status == '401'){   // 处理未登录~
            window.location.href = redirect;
        }
    });
    return Promise.resolve(response)
})

/**
 * 封装fetch请求, 专门用于处理参数
 * @param {String} url 请求地址
 * @param {object} params 请求参数
 * @param {String} message 加载提示文字
 * @return {Object}  返回url和params
 **/
function fetch(arg){
    let [url, params, message] = [arg[0], {}, ''];
    
    if(!arg[0] || typeof arg[0] != 'string'){
        throw new Error('请求的参数地址错误~')
    }else if(arg.length === 2){
        url = arg[0]
        typeof arg[1] === 'string' ?  message = arg[1] :  params = arg[1]  // 如果第二个参数为字符串，那么第二个参数就认为是加载提示文字，否则就是请求的参数
    }else if(arg.length === 3){
        url = arg[0]
        params = arg[1]
        message = arg[2]
    }
    message !== '' ? loading = Toast.loading({  message: '加载中...' }) : null
    return Promise.resolve({url, params})
}

/**
 * 封装get请求
 * @return {object} 响应正常就返回响应数据否则返回错误信息
 **/
export function get() {
    return new Promise((resolve, reject) => {
        fetch(arguments).then(({url, params})=>{    // 参数校验
            axios({ method: 'get', url: url, params: params, timeout: 10000 })
            .then(res => { resolve(res.data) })
            .catch(err => { reject(err) })
        })
    })
}

/**
 * 封装post请求
 * @return {object} 响应正常就返回响应数据否则返回错误信息
 **/
export function post() {
    return new Promise((resolve, reject) => {
        fetch(arguments).then(({url, params})=>{    // 参数校验
            axios({
                method: 'post', url: url, data: qs.stringify(params), headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, timeout: 10000
            })
            .then(res => { resolve(res.data) })
            .catch(err => { reject(err) })
        })
    })
}