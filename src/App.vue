<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {initLogin, initWxAuth} from '@/utils/wx';
export default {
  name: 'App',
  created() {
    if(process.env.NODE_ENV === 'production'){
      initLogin().then(initWxAuth());
    }else{
      initLogin()
    }
  },
}
</script>

<style>
@import './assets/css/iconfont.css';
@import './assets/css/base.css';
</style>
