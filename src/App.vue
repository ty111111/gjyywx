<template>
  <div id="app" ref="apps">
    <transition :name="transitionName">
      <router-view>

      </router-view>
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
        show: true,
        transitionName:this.$store.state.pageDirection
      }
    },
    watch: {
      $route(to, from) {
        console.log("转换路由");
      console.log(this.$store.state.routeChain,77777)
      console.log(this.$store.state.pageDirection,88888)
        this.$set(this.$data,'transitionName',this.$store.state.pageDirection)
      }
    },
    computed: {

    },
    components: {
      Msg, Loading, Toast
    },
    mounted(){
      setTimeout((res) => {
        this.show = true;  }, 100)

    },

    methods: {}
  }
</script>

<style lang="scss">
  @import "common/base";
    p,span,a{
        font-family:"宋体";
    }
    .flex{
        flex:1 1 auto;
    }
    .overflow{
        overflow:auto;
    }
  .slide-enter-active, .slide-leave-active {
    transition:all .3s ease-in-out
  }
  .slide-enter{

    transform: translateX(100%);
  }
  .slide-enter-to{
    position: absolute;
    top:0;
      bottom: 0;
    width: 100%;
  }
  .slide-leave-to {
    transform: translateX(-100%);
  }
  .fade-enter-active, .fade-leave-active {
    transition:all .3s ease-in-out
  }
  .fade-enter{
    transform: translateX(-100%);
  }
  .fade-enter-to{
    position: absolute;
    top:0;
      bottom:0px;
    width: 100%;
  }
  .fade-leave-to {
    transform: translateX(100%);
  }
  #app {
    position: absolute;
    background-color: map_get($colors, bg);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0px;
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

</style>
