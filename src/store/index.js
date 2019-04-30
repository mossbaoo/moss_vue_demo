import Vue from 'vue'
import Vuex from 'vuex'
import {host} from '../config';
 
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    host: host,
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