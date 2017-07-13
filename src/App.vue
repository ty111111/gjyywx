<template>
  <div id="app">
      <transition :name="transitionName">
    <router-view class="router"></router-view>
    </transition>
    <toast ref="toast" @toast:hide="show=false" :show="show" text="成功"></toast>
  </div>
</template>

<script >
  //import WeuiForVue from "weui-for-vue"
  import {Msg, Loading, Toast} from "weui-for-vue"

  export default {
    name: 'app',
    data(){
      return {
        show: false,
        transitionName:"slide-right"
      }
    },
    computed: {},
    watch: {
        '$route' (to, from) {
          if (from.query.key&&to.query.key) {
            if (to.query.key < from.query.key) {
              this.transitionName = 'slide-right'
            } else {
              this.transitionName = 'slide-left'
            }
          } else {
              if(!from.query.key)
            {this.transitionName = 'slide-left';}
              else{
                  this.transitionName="slide-right";
              }
          }
        }
      },
    components: {
      Msg, Loading, Toast
    },
    mounted(){
//
//      setTimeout((res) => {
//        this.show = true;    }, 100)

    },
    watch: {},
    methods: {}
  }
</script>

<style lang="scss">
  @import "common/base";
  #app {
      position:fixed;
      left:0;
      top:0;
      right:0;
      bottom:0;

    display: flex;
    flex-direction: column;
    overflow: hidden;
    .view {
      flex: 1;
      overflow: hidden;
    }
    .viewpage {
      display: flex;
      flex-direction: column;
    }
  }
    .slide-right-enter-active,.slide-right-leave-active{
        transition:all .5s ease-in-out;
    }
    .slide-right-leave-to{
        transform:translateX(100%);
    }
    .slide-right-enter-to{
        position:absolute;
        top:0px;
        width:100%;
        bottom:0px;
    }
    .slide-right-enter{
        transform:translateX(-100%);
/*        display:none;*/
    }
/*
    .router{
        transition:all .5s ease;
    }
    .slide-left-enter-to,.slide-right-enter-to{
        position:absolute;
        top:0px;
        bottom:0px;
        width:100%;
    }
 .slide-left-leave-active, .slide-right-enter {
   transform: translate(-100% 0);
     opacity:0;
}
.slide-left-enter, .slide-right-leave-active{
    transform: translate(100%, 0);
    opacity:0;
}
*/
</style>
