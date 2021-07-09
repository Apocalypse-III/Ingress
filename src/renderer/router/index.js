import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: () => import('@/layouts/MainPage'),
      children: [
        {
          path: '/',
          name: 'home',
          meta: {
            title: 'Ingress',
            keepAlive: true,
            scrollTop: 0,
            depth: 0
          },
          component: () => import('@/pages/Home')
        },
        {
          path: '/video-play',
          name: 'video-play',
          meta: {
            title: '',
            keepAlive: false,
            scrollTop: 0,
            depth: 2
          },
          component: () => import('@/pages/VideoPlay')
        },
        {
          path: '/sub-page',
          name: 'sub-page',
          meta: {
            title: '',
            keepAlive: false,
            scrollTop: 0,
            depth: 1
          },
          component: () => import('@/pages/SubPage')
        },
        {
          path: '/',
          name: 'setting',
          meta: {
            title: '设置',
            keepAlive: false,
            scrollTop: 0,
            depth: 99
          },
          component: () => import('@/pages/Setting')
        },
      ]
    },
  ]
})
