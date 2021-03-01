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
          component: () => import('@/layouts/TabBar'),
          children: [
            {
              path: '/',
              name: 'home',
              component: () => import('@/pages/Home')
            },
            {
              path: '/hosts',
              name: 'hosts',
              component: () => import('@/pages/Hosts/List')
            },
            {
              path: '/tools',
              name: 'tools',
              component: () => import('@/pages/Tools')
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
              component: () => import('@/pages/Hosts/HostsDetail')
            },
          ]
        },
      ]
    }
  ]
})
