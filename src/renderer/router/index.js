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
            depth: 0
          },
          component: () => import('@/pages/Home')
        },
        {
          path: '/',
          name: 'setting',
          meta: {
            title: '设置',
            depth: 99
          },
          component: () => import('@/pages/Setting')
        },
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/DetailPage'),
      children: [
        {
          path: '/hosts-detail',
          name: 'hosts-detail',
          meta: {
            title: '编辑Hosts',
            depth: 3
          },
          component: () => import('@/pages/Hosts/HostsDetail')
        },
        {
          path: '/video-play',
          name: 'video-play',
          meta: {
            title: '',
            depth: 10
          },
          component: () => import('@/pages/VideoPlay')
        },
      ]
    },
  ]
})
