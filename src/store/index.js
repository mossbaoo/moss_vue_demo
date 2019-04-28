import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    host: 'https://xiaoertong.bangju.com',
    access_token: '',
  },
  mutations: {
    setState(state, value) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      })
    }
  }
});

export default store