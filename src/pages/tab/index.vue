<template>
  <div class="viewpage view">
      <transition :name="transitionName">
    <router-view></router-view>
    </transition>
    <app-footer msg="essay"></app-footer>
  </div>
</template>

<script>
  import AppHeader from "../../components/business/app-header.vue"
  import AppFooter from "../../components/business/app-footer.vue"
  export default {
    data() {
      return {

        transitionName:this.$store.state.pageDirection
      };
    },
    computed: {},
    components: {
      AppHeader, AppFooter
    },
    mounted() {

    },
    watch: {
      $route(to, from) {
        console.log("转换路由");
      console.log(this.$store.state.routeChain,77777)
      console.log(this.$store.state.pageDirection,88888)
        this.$set(this.$data,'transitionName',this.$store.state.pageDirection)
      }
    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  .tab {
    display: flex;
    flex-direction: column;
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
</style>
