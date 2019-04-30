import {Dialog} from "vant";
import store from '@/store';
import {initAuth} from '@/utils/api';
import {redirect} from '../config';

// 初始化授权登录
export const initLogin = ()=>{
    let access_token = '';
    if(process.env.NODE_ENV === 'production'){
        access_token = localStorage.getItem("access_token");
    }else{
        access_token = 'ff5e81df-3dd3-42f1-bded-9144cf8c9715';
    }

    if(access_token){
        store.state.access_token = access_token
        // store.commit('setState', { access_token })
        return Promise.resolve(access_token)
    }else{
        window.location.href = redirect;
    }
}

// 初始化微信授权
export const initWxAuth = ()=>{
    let url = window.location.href.split('#')[0];
    let access_token = localStorage.getItem("access_token");
    initAuth({
        url: url,
        access_token: access_token
    }).then(res=>{
        if (res.code == 0) {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: [    // 需要获取授权的权限列表
                    'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                    'updateTimelineShareData', // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                    'onMenuShareWeibo', // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
                ]
            });
            wx.ready(res => {
                return res
            });
            wx.error(err => {
                Dialog.alert({title: '签名提示', message: '签名失败，正在重新授权...' }).then(() => {
                    initWxAuth()
                });
                return err
            });
        } else if (res.code == "130") {
            window.location.href = redirect;
        }
    })
}