<template>
  <div class="viewpage">
      <app-header>
          <div slot="left"><router-link :to="src" ><img class="arrow" src="../../../../static/img/u436.png"></router-link></div>
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">{{title}}</div>
          <div slot="right" v-show="isShown" class="appointl" @click="getMyScheme">我的挂号</div>
    </app-header>
      <router-view @headerInfo="check" @hasRight="setRight"></router-view>
  </div>
</template>

<script>
    import AppHeader from '../../../components/business/app-header.vue';
  export default {
      data(){
          return{
              title:"",
              src:"",
              isShown:false
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
</style>
