import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import { ColorPicker,DatePicker,Button,Pagination,Message,Upload} from 'element-ui';
import http from './utils/http1'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.5,
  error: './assets/goods-loading.png',       // 加载失败默认图片
  loading: './assets/goods-loading.png',     // 加载中默认图片
  attempt: 1,
})
Vue.use(ColorPicker)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Router)
Vue.use(Upload)
Vue.prototype.$message = Message;
Vue.config.productionTip = false
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
Vue.use(vueSwiper)
Vue.prototype.$http = http;
//跳转新页面置顶
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
//首页拦截
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//      // 判断该路由是否需要登录权限
//      let user =  JSON.parse(localStorage.getItem("user"))
//      console.log(user)
//     if (user) { // 判断缓存里面是否有 user  //在登录的时候设置它的值
//       next();
//     }else {
//       alert('请先登录！')
//       next({
//         path: '/mine/login',
//         query: {
//           redirect: to.fullPath
//         } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }else {
//     next();
//   }
// });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
