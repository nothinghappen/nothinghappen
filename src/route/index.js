import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
  	{
      path: '/login',
      name: 'login',
      component: require('../components/login')
    },
    {
      path: '/blog',
      name: 'blog',
      component: require('../components/blog'),
      children:[
        {
          path: '/blog/list',
          name: 'bloglist',
          component: require('../components/bloglist')
        },
        {
          path: '/blog/:id',
          name: 'blogcontent',
          component: require('../components/blogcontent')
        }
      ]
    },
    {
      path: '/editor',
      name: 'editor',
      component: require('../components/editor')
    },
    {
      path: '/',
      name: 'home',
      component: require('../components/home')
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component: require('../components/usercenter')
    }
  ]
 })