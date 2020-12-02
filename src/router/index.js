import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default'
import blankPage from '@/layout/blank'
import Index from '@/page/index'
import changeCity from '@/page/changeCity'
import goodsList from '@/page/goodsList'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      redirect: '/index',
      children: [{
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/changeCity',
        name: 'changeCity',
        component: changeCity
      },
      {
        path: 's/:name',
        name: 'goods',
        component: goodsList
      }]
    },
    {
      path: '/blank',
      name: 'blank',
      component: blankPage,
      children: [{
        path: '/login',
        name: 'login',
        component: () => import('@/page/login')
      }, {
        path: '/register',
        name: 'register',
        component: () => import('@/page/register')
      }]
    }
  ]
})
