<template>
  <div class="search">
    <input type="text" :placeholder="'请输入'+searchTypeName+'（展商名字）'" v-model="searchValue" />
    <button @click="search">搜索</button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Search',
  props: ["searchType"],
  data() {
    return {
      searchTypeName: '',
      searchValue: '',
    }
  },
  created() {
    if(this.searchType == 'applicant' || this.searchType == 'insurance') {
      this.searchTypeName = '投保人'
    }else {
      this.searchTypeName = '被保人'
    }
  },
  methods: {
    search() {
      this.$emit('bindSearch', this.searchValue);
    }
  }
}
</script>

<style lang="less">
  .search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 1.2rem;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.1);
    box-sizing: border-box;
    padding: .2rem .3rem;
    display: flex;
    input {
      width: 5.9rem;
      height: .8rem;
      border: 1px solid #CCC;
      border-radius: .1rem 0 0 .1rem;
      -webkit-appearance: none;
      box-sizing: border-box;
      border-right: none;
      padding: 0 .22rem;
      font-size: .26rem;
      background: #f7f7f7;
    }
    button {
      width: 1rem;
      height: .8rem;
      background: #4379F2;
      border-radius: 0 .1rem .1rem 0;
      border: none;
      font-size: .26rem;
      color: #fff;
    }
  }
</style>
