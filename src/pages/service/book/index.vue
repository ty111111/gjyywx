<template>
  <div class="viewpage">
      <transition :name="transitionName">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
      data(){
          return{
              transitionName:"fade"
          }
      },
      components:{
      },
      methods:{

      },
    watch: {
      $route(to, from) {
        console.log("转换路由");
      console.log(this.$store.state.routeChain,77777)
      console.log(this.$store.state.pageDirection,88888)
        this.$set(this.$data,'transitionName',this.$store.state.pageDirection)
      }
    }
  }
</script>

<style  lang="scss">
$price: #FFCC00;
$info:  #3399FF;
    .background{
        position:fixed;
        left:0px;
        top:0px;
        background-color:grey;
        width:100%;
        height:100%;
        z-index:999
    }
    header{
        flex:0 0 auto;
    }
    .app{
        flex: 1 1 auto;
        display:flex;
        flex-direction:column;
    }
    .viewpage{
        display:flex;
        flex-direction:column;
        flex:1 1 auto;
    }
.figure
    {
        width:3.75rem;
        height:3.75rem;
        margin-right:.3rem;
        display:block;
        border-radius:50%;
    }
    .font-hide{
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }
    .arrow{
        width:2rem;
        height:2rem;
        margin-top:0.5rem;
    }
        .font-warn{
        color:#FF6666;
        div{
            color:#FF6666;
        }
    }
    p, span{
        font-family:宋体
    }
    .weui-loadmore{
        font-size:0.875rem;
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
