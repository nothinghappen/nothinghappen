import Vue from 'vue'
import router from './route/index'
import { sync } from 'vuex-router-sync'
// import store from './store/index'

// sync(store, router)

import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
import 'quill/dist/quill.snow.css'
import VueQuillEditor from 'vue-quill-editor'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(Element)
Vue.use(VueQuillEditor)
Vue.use(iView)

import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})
