// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // 默认语言包是中文
import store from './store/index'
import VueRouter from 'vue-router'
import Api from './api/index';
import '../src/router/permission' // 权限拦截
import qs from 'qs'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import echarts from 'echarts'
import * as moment from '@/filter/index'



Object.keys(moment).forEach(key => {
  Vue.filter(key, moment[key])
})

Vue.prototype.$echarts = echarts // 将echarts存到Vue原型中
Vue.use(VueVideoPlayer)
Vue.use(VueQuillEditor); // 富文本编辑器
Vue.prototype.$qs = qs;

Vue.prototype.$api = Api;

Vue.use(ElementUI, { locale })// 装载到vue上
Vue.config.productionTip = false
// 安装路由
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
