//引入vue模块
import Vue from 'vue';
//引入路由模块
import VueRouter from 'vue-router';
//引入App组件
import App from './App.vue';
//引入Css样式
import './assets/statics/site/css/style.css';
//引入index组件
import index from './components/index.vue';
// 引入axios模块
import axios from 'axios';
//引入格式化时间插件moment.js
import moment from 'moment';
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入懒加载插件
import VueLazyload from 'vue-lazyload';



axios.defaults.baseURL = 'http://47.106.148.205:8899/';
//设置全局过滤器
Vue.filter('cutTime',function(value){
   return moment(value).format('YYYY-MM-DD');
});
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: require('./assets/logo.png'),
    loading: require('./assets/logo.png'),
    // attempt: 1
  });
//设置中间件
Vue.use(VueRouter);
// axios 把axios对象添加到Vue的原型上
Vue.prototype.axios = axios;

//设置路由
const router = new VueRouter({
    routes:[
        {path:'/index',component:index},
        {path:'/',redirect:'/index'}
    ]
})
// 实例化vue对象
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
