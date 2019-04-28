import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Choose from '@/pages/Choose'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      // 首页
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: '百团保险' }
    },
    {
      // 选择 投保人、被保人
      path: '/Choose',
      name: 'Choose',
      component: Choose,
      meta: { title: '加载中...' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
 
export default router