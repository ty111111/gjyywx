<template>
  <div class="viewpage">
      <app-header style="display:flex;flex-direction:row">
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden; flex:1 1 auto">{{title}}</div>
          <div slot="right"  class="appointl" @click="getMyScheme" style="0 0 auto;width:4rem;"><p v-show="isShown">我的挂号</p></div>
    </app-header>
      <transition :name="transitionName">
      <router-view @headerInfo="check" @hasRight="setRight" class="Router"></router-view>
    </transition>
  </div>
</template>

<script>
    import AppHeader from '../../../components/business/app-header.vue';
  export default {
      data(){
          return{
              title:"",
              src:"",
              isShown:false,
              transitionName:"slide-left"
          }
      },
      components:{
          AppHeader
      },
      methods:{
          check(option){
              this.title=option.title;
              this.src=option.backSrc;
          },
          setRight(){
              if(this.isShown){
                  this.isShown=false;
              }
              else{
                  this.isShown=true;
              }
          },
          getMyScheme(){
              this.$router.push("/myRegistration/"+window.localStorage["myId"]);
          }
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
    .appointl{
        color:$info;
        padding-right:5px;
    }
    @font-face {
      font-family: 'iconfont';
      src: url('//at.alicdn.com/t/font_33qiq29sp5y7gb9.woff') format('woff'),
    }
    #arrow{
        
      font-family: 'iconfont';
      font-size: 18px;
        padding-left:1rem;
        color:black;
    }
    p, span{
        font-family:宋体
    }
    .Router{
        position:absolute;
        top:45px;
        width:100%;
        transition:all .5s ease;
    }
 .slide-left-leave-active, .slide-right-enter {
   transform: translate(-100% 0);
     opacity:0;
}
.slide-left-enter, .slide-right-leave-active{
   transform: translate(100%, 0);
    opacity:0;
}
</style>
