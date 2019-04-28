import {get, post} from './fetch';

const pagesize = 10;

// 初始化授权登录
export async function initAuth(url){
    return await post('/third/getjsSign/wechat', {url}, '授权中...')
}

// 用户端-主页医生列表
export const doctorListApi = (params) => post('/api/member/ask/doctors', params, '加载中...');