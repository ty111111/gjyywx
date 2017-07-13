/**
 * Created by Administrator on 2017/6/8 0008.
 */
import Vue from "vue";
import Vuex from 'vuex';
// import news from "../pages/news/store"
// import user from "../pages/ucenter/store"
// import consult from "../pages/consult/store"
// import service from "../pages/service/store"

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    count: 1,
    pageDirection: 'slide',
    routeChain:[]
  },
  mutations: {
    addRouteChain(state, route){
      state.routeChain.push(route);
    },
    popRouteChain(state){
      state.routeChain.pop();
    },
    setPageDirection(state, dir){
      state.pageDirection = dir;
    }
  }
})
