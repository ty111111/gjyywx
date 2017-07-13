<template>
  <footer>
    <ul>
      <li class="tac" @click="goOnlineDoc">
        <div class="icon">
          <font class="font"></font>
        </div>
          <div class="text" >
            <!--<img src="../../../static/img/u4088.png" class="icon" >-->
            <span :class="{active:msg=='index'}" >&#xe635;</span>
            <p>首页</p>
          </div>

      </li>
      <li class="tac" @click="toService">
        <div class="icon">
          <font class="font"></font>
        </div>
          <div class="text" >
            <!--<img src="../../../static/img/u4088.png" class="icon">-->
            <span :class="{active:msg=='service'}">&#xe605;</span>
            <p>服务</p>
          </div>
      </li>
      <li class="tac" @click="toInfo">
        <div class="icon">
          <font class="font"></font>
        </div>
          <div class="text" >
            <!--<img src="../../../static/img/u4088.png" class="icon">-->
            <span :class="{active:msg=='essay'}">&#xe606;</span>
            <p>健康资讯</p>
          </div>
      </li>
      <li class="tac" @click="goMyCenter">
        <div class="icon">
          <font class="font"></font>
        </div>
          <div class="text">
            <!--<img src="../../../static/img/u4088.png" class="icon" >-->
            <span :class="{active:msg=='my'}">&#xe821;</span>
            <p>我的</p>
          </div>
      </li>
    </ul>

  </footer>
</template>
<script>
  export default {
    props:['msg'],
    data() {
      return {
        value:'index'
      };
    },
    computed:{

    },
    components:{

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      toService(){
        this.$router.push({path:'/service/book'});
      },
      toInfo(){
        this.$router.push("/tab/news");
      },
      goMyCenter(){
        this.$router.push('/myDoc')
      },
      goOnlineDoc(){
        this.$router.push('/online');
      }
    }
  };
</script>

<style scoped lang="scss">
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_vuxmaejmdsjg7gb9.woff') format('woff')
  }
  span{
    font-family: 'iconfont';
    font-size: 18px;
  }

  .active{
    color: green;
  }
  footer{
      border-top:1px solid rgb(204,204,204);
    height:3rem;
    background-color: white;
    ul{
        padding-top:0.3rem;
      display: flex;
      li{
        width: 25%;
      }
    }
  }
    .icon{
        width:1.2rem;
    }
    .text{
        p{
            font-size:0.55rem;
            color:#999999;
        }
    }

</style>
