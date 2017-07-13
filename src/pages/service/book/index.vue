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
              transitionName:"slide-left"
          }
      },
      components:{
      },
      methods:{

      },
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
        width:60px;
        margin-right:5px;
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
    .slide-left-enter-active, .slide-left-leave-active,.slide-right-enter-active,.slide-right-leave-active{
        transition:all .5s ease-in-out;
    }
    .slide-left-enter,.slide-right-leave-to{
        transform:translateX(100%);
    }
    .slide-left-enter-to,.slide-right-enter-to{
        position:absolute;
        top:0px;
        width:100%;
/*
        .footer{
            
            display:none;
        }
*/
    }
    .slide-left-leave-to,.slide-right-enter{
        transform:translateX(-100%);
    }
</style>
