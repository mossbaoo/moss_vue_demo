<template>
  <div class="container">
    <Search :searchType="chooseType" @bindSearch="bindSearch"></Search>
    <div class="mainList">
      <van-radio-group v-model="radio" @change="radioChange">
        <div class="item">
          <van-radio name="1">广州ABC公司</van-radio>
          <i class="iconfont icon-editor" @click.stop="toForm('edit', 1)"></i>
        </div>
        <div class="item">
          <van-radio name="2">广州abc公司</van-radio>
          <i class="iconfont icon-editor" @click.stop="toForm('edit', 2)"></i>
        </div>
        <div class="item">
          <van-radio name="3">广州123公司</van-radio>
          <i class="iconfont icon-editor" @click.stop="toForm('edit', 3)"></i>
        </div>
      </van-radio-group>
    </div>
    <div class="bottom">
      <div class="left" @click="toForm('add')">+新增{{chooseTypeName}}</div>
      <div class="right">确定</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Search from '@/components/Search'
export default {
  name: 'Choose',
  components: {
    Search
  },
  data () {
    return {
      chooseType: '', // applicant=投保人, recognizee=被保人
      chooseTypeName: '',
      radio: '1',
    }
  },
  created() {
    let chooseType = this.$route.query.type;
    this.chooseType = chooseType;
    this.chooseTypeName = chooseType=='applicant'? '投保人':'被保人';
    document.title = '选择' + this.chooseTypeName;
  },
  methods: {
    bindSearch(value) {
      console.log(value)
    },

    radioChange() {
      console.log(this.radio)
    },

    // 进入表单页，新增/修改 投保人/被保人
    toForm(isEdit, id) {
      this.$router.push({
        path: this.chooseType=='applicant'? '/MyApplicantForm':'/MyRecognizeeForm',
        query: {
          isEdit: isEdit=='edit'? 1:0, // 是否修改，0=否，1=是
          id: id
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  padding: 1.2rem 0 .98rem;
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
  .mainList {
    padding: .2rem .3rem;
    background: #fff;
    .item {
      height: 1rem;
      border-bottom: 1px solid rgba(0,0,0,.1);
      display: flex;
      align-items: center;
      .van-radio {
        /deep/ .van-radio__label {
          box-sizing: border-box;
          width: 5.2rem;
          font-size: .3rem;
          color: #333;
          margin-left: .3rem;
        }
      }
      .iconfont {
        margin-left: .5rem;
        font-size: .4rem;
        color: #666;
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    display: flex;
    div {
      flex: 1;
      height: .98rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .3rem;
      &.left {
        background: #fff;
        color: #4379F2;
      }
      &.right {
        background: #4379F2;
        color: #fff;
      }
    }
  }
}
</style>
