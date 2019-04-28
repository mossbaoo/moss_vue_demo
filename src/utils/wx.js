import {Dialog} from "vant";
import store from '@/store';
import { initAuth } from '@/utils/api';

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
        window.location.href = 'https://xiaoertong.bangju.com/third/connect/wechat?state=/';
    }
}

// 初始化微信授权
export const initWxAuth = ()=>{
    let url = window.location.href.split('#')[0];
    initAuth(url).then(res=>{
        if (res.code == 0) {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: [    // 需要获取授权的权限列表
                    "startRecord",      // 开始录音
                    "stopRecord",       // 暂停录音
                    "onVoiceRecordEnd", // 监听录音自动停止
                    "playVoice",        // 播放语音
                    "pauseVoice",       // 暂停播放
                    "stopVoice",        // 停止播放
                    "onVoicePlayEnd",   // 监听播放结束
                    "uploadVoice",      // 上传音频
                    "downloadVoice",    // 下载音频
                    "previewImage",     // 图片预览接口
                    "chooseImage",      // 拍照或从手机相册中选图接口
                    "uploadImage",      // 上传图片接口
                    "chooseWXPay",      // 发起一个微信支付请求
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
            let param = window.location.href.split('#')[1];
            let page = param.split('?')[0];
            let id = param.split('?')[1].split('=')[1];
            if(page == '/doctor_detail') {
                localStorage.setItem('doctor_id', id);
                window.location.href = 'https://xiaoertong.bangju.com/third/connect/wechat?state=/doctor_detail';
            }else {
                window.location.href = 'https://xiaoertong.bangju.com/third/connect/wechat?state=/';
            }
        }
    })
}