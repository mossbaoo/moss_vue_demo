<template>
  <div class="navigation">
    <div class="item" :class="currentpage=='Home'? 'current':''" @click="navigator('/')">
      <i class="iconfont icon-home"></i>
      <span>首页</span>
    </div>
    <div class="item" @click="contact">
      <i class="iconfont icon-kefu"></i>
      <span>联系客服</span>
    </div>
    <div class="item" :class="currentpage=='Personal'? 'current':''" @click="navigator('Personal')">
      <i class="iconfont icon-people"></i>
      <span>个人中心</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'vant'
Vue.use(Dialog);
export default {
  name: 'Navigation',
  props: ["currentpage"],
  methods: {
    // 导航跳转
    navigator(e) {
      this.$router.push({
        path: e
      })
    },
    // 联系客服
    contact() {
      Dialog.confirm({
        title: '联系客服',
        message: '拨打电话 18316012345'
      }).then(() => {
        window.location.href = 'tel:13686123158'
      }).catch(() => {
        // on cancel
      });
    },
  }
}
</script>

<style lang="less">
  .navigation {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .98rem;
    display: flex;
    background: #FCFCFC;
    .item {
      width: 33.333%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #666;
      i {
        font-size: .4rem;
      }
      span {
        font-size: .24rem;
      }
      &.current {
        color: #4379F2;
      }
    }
  }
</style>
