// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import "weui/dist/style/weui.min.css"
import Bus from "./lib/bus"
import weui from "./lib/wejs"
import Directive from "./lib/directive"
import VueScroller from 'vue-scroller'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueScroller)
Vue.use(Bus)
Vue.use(Directive)
Vue.use(weui)
import "babel-polyfill";
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  var arr = [];
  if(sessionStorage.getItem('arr')){
    arr = JSON.parse(sessionStorage.getItem('arr'))
  }else {
    var str = JSON.stringify(arr);
    sessionStorage.setItem('arr',str)
  }
  let routeLength = arr.length;
  console.log(routeLength,'一开始的空')
  if (routeLength === 0) {
    // this.$set(this.$data,'transitionName','slide')
    store.commit('setPageDirection', 'slide');
    if (to.path === from.path && to.path === '/') {
      arr.push(to.path);
      sessionStorage.setItem('arr',JSON.stringify(arr))
    } else {
      arr.push(from.path)
      arr.push(to.path);
      console.log(arr,'一开始的')
      sessionStorage.setItem('arr',JSON.stringify(arr))
    }
  } else if (routeLength === 1) {
    store.commit('setPageDirection', 'fade');
    var str = JSON.parse(sessionStorage.getItem('arr'));
    str.push(to.path)
    sessionStorage.setItem('arr',JSON.stringify(str))
  } else {
    let lastBeforeRoute = JSON.parse(sessionStorage.getItem('arr'))[routeLength-2];
    console.log(lastBeforeRoute,2222)
    if (lastBeforeRoute === to.path) {
//           store.commit('popRouteChain');
      var str = JSON.parse(sessionStorage.getItem('arr'));
      str.pop();
      console.log(str,'后退的','fade')
      sessionStorage.setItem('arr',JSON.stringify(str))
      store.commit('setPageDirection', 'fade');
    } else {
      var str = JSON.parse(sessionStorage.getItem('arr'));
      if(str[routeLength-1]===to.path){
        console.log(str,'每次前进的','slide')
        sessionStorage.setItem('arr',JSON.stringify(str))
      }else {
        str.push(to.path);
        console.log(str,'每次前进的','slide')
        sessionStorage.setItem('arr',JSON.stringify(str))
        store.commit('setPageDirection', 'slide');
      }
     // this.$set(this.$data,'transitionName','slide')
    }
  }
  next();
});





// router.beforeEach((to, from, next) => {
//   //定义一个可以记录路由路径变化的数组，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
//   //不一定要用到vuex
//   console.log(router,11111)
//   let routeLength = store.state.routeChain.length;
//   if (routeLength === 0) {
//     store.commit('setPageDirection', 'slide');
//     if (to.path === from.path && to.path === '/') {
//       //当直接打开根路由的时候
//       store.commit('addRouteChain', to);
//     } else {
//       //直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
//       store.commit('addRouteChain', from);
//       store.commit('addRouteChain', to);
//     }
//   } else if (routeLength === 1) {
//     store.commit('setPageDirection', 'fade');
//     store.commit('addRouteChain', to);
//   } else {
//     let lastBeforeRoute = store.state.routeChain[routeLength-2];
//     console.log(lastBeforeRoute,2222)
//     if (lastBeforeRoute.path === to.path) {
//       store.commit('popRouteChain');
//       store.commit('setPageDirection', 'fade');
//     } else {
//       store.commit('addRouteChain', to);
//       store.commit('setPageDirection', 'slide');
//     }
//   }
//   next();
// });



let UA = window.navigator.userAgent.toLocaleLowerCase();
if (/iphone/.test(UA)) {
  window.device = "iphone";
}
if (/android/.test(UA)) {
  window.device = "android";
}
if (/micromessenger/.test(UA)) {
  window.brower = "weixin";
}
/*
* 全局bus
* */
//window.bus=new Vue();

/*
 * 移动端rem布局
 * width:20rem
 * */
if (window.device == "iphone" || window.device == "android") {
  let w = document.body.scrollWidth;
  document.querySelector('html').style.fontSize = (w / 20) + "px";
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: {App}
})
