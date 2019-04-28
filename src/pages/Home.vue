<template>
  <div class="container">
    <van-swipe :autoplay="3000" indicator-color="white" class="swiper">
      <van-swipe-item><img src="../assets/images/in_banner.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../assets/images/in_banner.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../assets/images/in_banner.jpg" alt=""></van-swipe-item>
    </van-swipe>
    <!-- 投保人信息 开始 -->
    <div class="applicant">
      <div class="applicant_top">
        <div class="left">投保人信息</div>
        <div class="right" v-if="is_applicant" @click="choose('applicant')">重新选择<i class="iconfont icon-you"></i></div>
      </div>
      <div class="applicant_bottom noData" v-if="!is_applicant" @click="choose('applicant')">选择投保人<i class="iconfont icon-you"></i></div>
      <div class="applicant_bottom hasData" v-if="is_applicant">
        <div class="top">
          <div class="company ellipsis"><i class="iconfont icon-gongsi"></i>广州邦聚网络技术有限公司</div>
          <div class="info">专票 / 税号：1234659825</div>
          <div class="info">陈小姐 / 18312345678 / 123456@163.com</div>
          <div class="info">广州市天河区启星商务中心B区A座451</div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="title">银行账号：</div>
            <div class="value">6123 4324 4324 5454</div>
          </div>
          <div class="item">
            <div class="title">开户银行：</div>
            <div class="value">中国银行 中国银行广州支行</div>
          </div>
          <div class="item">
            <div class="title">注册地址：</div>
            <div class="value">广东省广州市天河区面对面赛道号1321</div>
          </div>
          <div class="item">
            <div class="title">联系电话：</div>
            <div class="value">020-32432342</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 投保人信息 结束 -->
    <!-- 被保人信息 开始 -->
    <div class="recognizee">
      <div class="recognizee_top">
        <div class="left">被保人信息</div>
        <div class="right" v-if="is_recognizee" @click="choose('recognizee')">重新选择<i class="iconfont icon-you"></i></div>
      </div>
      <div class="recognizee_bottom noData" v-if="!is_recognizee" @click="choose('recognizee')">选择被保人<i class="iconfont icon-you"></i></div>
      <div class="recognizee_bottom hasData" v-if="is_recognizee">
        <div class="item ellipsis"><i class="iconfont icon-gongsi"></i>广州邦聚网络技术有限公司</div>
        <div class="item ellipsis"><i class="iconfont icon-gongsi"></i>广州邦聚网络技术有限公司</div>
      </div>
    </div>
    <!-- 被保人信息 结束 -->

    <!-- 按钮 开始 -->
    <div class="submitBtn"><van-button type="info">提交</van-button></div>
    <!-- 按钮 结束 -->

    <Navigation currentpage="Home"></Navigation>
  </div>
</template>

<script>
import Vue from 'vue'
import Navigation from '@/components/Navigation'
import { Swipe, SwipeItem, RadioGroup, Radio, Button } from 'vant';
import { doctorListApi } from '@/utils/api';
Vue.use(Swipe).use(SwipeItem).use(RadioGroup).use(Radio).use(Button);
export default {
  name: 'Home',
  components: {
    Navigation
  },
  data () {
    return {
      is_applicant: false,
      is_recognizee: false,
      type_1: '1',
      type_2: '1',
    }
  },
  created() {
    console.log(this.$store.state.access_token)
    doctorListApi().then(res=>{
      console.log(res.data)
    })
  },
  methods: {
    // 选择投保人
    choose(type) {
      this.$router.push({
        path: '/Choose',
        query: {
          type: type
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  padding-bottom: .98rem;
  .swiper {
    img {
      width: 7.5rem;
      display: block;
    }
    .van-swipe__indicators {
      left: unset;
      right: .2rem;
      bottom: .22rem;
    }
    .van-swipe__indicator {
      background: rgba(0,0,0,.8);
    }
  }
  .applicant {
    background: #fff;
    padding: .25rem .3rem .45rem;
    .applicant_top {
      height: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-size: .36rem;
        color: #333;
        font-weight: 500;
      }
      .right {
        font-size: .26rem;
        color: #666;
        display: flex;
        align-items: center;
        i {
          font-size: .26rem;
          padding-left: .15rem;
        }
      }
    }
    .applicant_bottom {
      &.noData {
        height: 1.85rem;
        color: #4379F2;
        font-size: .32rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #CCC;
        border-radius: .1rem;
        i {
          font-size: .3rem;
          padding-left: .15rem;
        }
      }
      &.hasData {
        background: #F7F7F7;
        padding: .4rem .25rem;
        .top {
          border-bottom: 1px solid #E6E6E6;
          padding-bottom: .25rem;
          .company {
            display: flex;
            height: .42rem;
            align-items: center;
            font-size: .32rem;
            color: #333;
            font-weight: 500;
            padding-bottom: .2rem;
            i {
              font-size: .44rem;
              color: #4379F2;
              padding-right: .2rem;
            }
          }
          .info {
            font-size: .28rem;
            color: #555;
            padding: .15rem 0;
          }
        }
        .bottom {
          padding-top: .25rem;
          .item {
            display: flex;
            padding: .15rem 0;
            .title {
              font-size: .24rem;
              color: #888;
              width: 1.2rem;
            }
            .value {
              font-size: .28rem;
              color: #555;
              width: 5.2rem;
            }
          }
        }
      }
    }
  }
  .recognizee {
    margin-top: .2rem;
    background: #fff;
    padding: .25rem .3rem .45rem;
    .recognizee_top {
      height: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-size: .36rem;
        color: #333;
        font-weight: 500;
      }
      .right {
        font-size: .26rem;
        color: #666;
        display: flex;
        align-items: center;
        i {
          font-size: .26rem;
          padding-left: .15rem;
        }
      }
    }
    .recognizee_bottom {
      &.noData {
        height: 1.85rem;
        color: #4379F2;
        font-size: .32rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #CCC;
        border-radius: .1rem;
        i {
          font-size: .3rem;
          padding-left: .15rem;
        }
      }
      &.hasData {
        background: #F7F7F7;
        padding: .2rem .25rem;
        .item {
          display: flex;
          height: .42rem;
          align-items: center;
          font-size: .32rem;
          color: #333;
          font-weight: 500;
          padding: .2rem 0;
          i {
            font-size: .44rem;
            color: #4379F2;
            padding-right: .2rem;
          }
        }
      }
    }
  }
  .exhibition {
    margin-top: .2rem;
    background: #fff;
    padding: .3rem;
    .exhibition_top {
      height: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: .36rem;
      color: #333;
      font-weight: 500;
    }
    .exhibition_form {
      .input {
        height: 1.1rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        .left {
          width: 2rem;
          font-size: .3rem;
          color: #888;
        }
        .right {
          width: 4.9rem;
          position: relative;
          input {
            width: 100%;
            height: .8rem;
            font-size: .3rem;
            color: #333;
            border: none;
            line-height: .8rem;
            &::-moz-placeholder {
              color: #bbb;
            }
            &::-ms-input-placeholder {
              color: #bbb;
            }
            &::-webkit-input-placeholder {
              color: #bbb;
            }
          }
          span {
            position: absolute;
            right: .1rem;
            top: 0;
            line-height: .8rem;
            font-size: .3rem;
            color: #333;
          }
        }
      }
      .radio {
        .title {
          font-size: .3rem;
          color: #888;
          line-height: 1.1rem;
        }
        .list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          .item {
            width: 3.3rem;
            height: .8rem;
            border: 1px solid #E6E6E6;
            border-radius: .1rem;
            margin-bottom: .3rem;
            .van-radio-group {
              height: .8rem;
              display: flex;
              align-items: center;
              .van-radio {
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
  .submitBtn {
    padding: 1rem .3rem;
    .van-button {
      width: 100%;
      height: .88rem;
      border-radius: .88rem;
      font-size: .3rem;
      background: #4379F2;
    }
  }
}
</style>
