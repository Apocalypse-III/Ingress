import Vue from 'vue'
import Router from 'vue-router'


// Layouts
import MainPage from "@/layouts/MainPage";
import TabBar from "@/layouts/TabBar";


// Pages
import Home from "@/pages/Home";
import EditHosts from "@/pages/EditHosts";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: MainPage,
      children: [
        {
          path: '/',
          component: TabBar,
          children: [
            {
              path: '/',
              name: 'home',
              component: Home
            },
            {
              path: '/',
              name: 'edit-hosts',
              component: EditHosts
            },
          ]
        },

      ]
    }
  ]
})
