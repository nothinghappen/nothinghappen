import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from '../store/cookie'

Vue.use(VueRouter)
var router =  new VueRouter({
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
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
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
      meta: {
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: require('../components/usercenter')
    }
  ]
 });

 router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (Cookie.get("token")) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login'
            })
        }
    }
    else {
        next();
    }
})

export default router;