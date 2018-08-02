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
//引入goodsInfo组件 商品详情
import goodsInfo from './components/goodsInfo.vue';
// 引入购物车组件
import buyCart from './components/buyCart.vue';


// 引入axios模块
import axios from 'axios';
//引入格式化时间插件moment.js
import moment from 'moment';
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入懒加载插件
import VueLazyload from 'vue-lazyload';
//引入iView组件
import iView from 'iview';
import '../node_modules/iview/dist/styles/iview.css';
//引入vuex模块
import Vuex from 'vuex';


axios.defaults.baseURL = 'http://47.106.148.205:8899/';
//设置全局过滤器
Vue.filter('cutTime', function (value) {
    return moment(value).format('YYYY-MM-DD');
});
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(Vuex);
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
    routes: [{
            path: '/index',
            component: index
        },
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/goodsInfo/:id',
            component: goodsInfo
        },
        {
            path: '/buyCart',
            component: buyCart
        },
    ]
});

let buyCartList = JSON.parse(window.localStorage.getItem('buyCart')) || {};

const store = new Vuex.Store({
    state: {
        buyCartList
    },
    mutations: {
        // 保存购物信息
        updateBuyCart(state, buyInfo) {
            if (state.buyCartList[buyInfo.id]) {
                state.buyCartList[buyInfo.id] = state.buyCartList[buyInfo.id] + buyInfo.goodsNum;
            } else {
                // state.buyCart[buyInfo.id] = buyInfo.goodsNum; //直接赋值vue不会跟踪属性的变化
                Vue.set(state.buyCartList, buyInfo.id, buyInfo.goodsNum);
            }
        },
        // 购物车页 修改购买数量
        updateBuyNum(state,buyInfo){
            state.buyCartList[buyInfo.id] = buyInfo.goodsNum;
        },
        //删除购物车信息
        delBuyCart(state,buyInfo){
            Vue.delete(state.buyCartList,buyInfo.id);
        }
    },
    getters: {
        // 计算购物车商品的数量
        totalCount(state) {
            let num = 0;
            // 遍历对象
            for (const key in state.buyCartList) {
                // 累加总数
                num += state.buyCartList[key];
            }
            return num;
        }
    }
});

// 实例化vue对象
new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
// 刷新 或关闭页面保存购物车信息到 localStorage
window.onbeforeunload = function () {
    window.localStorage.setItem('buyCart',JSON.stringify(store.state.buyCartList));
  }