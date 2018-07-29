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
Vue.config.productionTip = false;

//设置中间件
Vue.use(VueRouter);

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
