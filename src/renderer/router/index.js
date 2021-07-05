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
        {
          path: '/hosts',
          name: 'hosts',
          meta: {
            title: '切换Hosts',
            depth: 1
          },
          component: () => import('@/pages/Hosts/List')
        },
        {
          path: '/notes',
          name: 'notes',
          meta: {
            title: '笔记',
            depth: 1
          },
          component: () => import('@/pages/Notes')
        },
        {
          path: '/todo',
          name: 'todo',
          meta: {
            title: 'TODO',
            depth: 1
          },
          component: () => import('@/pages/Todo')
        },
        {
          path: '/record',
          name: 'record',
          meta: {
            title: '录制',
            depth: 1
          },
          component: () => import('@/pages/Record')
        },
        /*{
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
              path: '/notes',
              name: 'notes',
              component: () => import('@/pages/Notes')
            },
            {
              path: '/todo',
              name: 'todo',
              component: () => import('@/pages/Todo')
            },
            {
              path: '/record',
              name: 'record',
              component: () => import('@/pages/Record')
            },
          ]
        },*/
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
          ]
        },
      ]
    }
  ]
})
