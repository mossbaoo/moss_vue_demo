import {get, post} from './fetch';

// 初始化授权登录
export async function initAuth(params){
    return await post('/third/getjsSign/wechat', params, '授权中...')
}

// 用户端-主页医生列表
export const doctorListApi = (params) => post('/api/member/ask/doctors', params, '加载中...');