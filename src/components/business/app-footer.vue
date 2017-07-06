<template>
  <footer>
    <ul>
      <li class="tac">
        <div class="icon">
          <font class="font"></font>
        </div>
          <div class="text"><img src="../../../static/img/u4088.png" class="icon" @click="goOnlineDoc"><p>首页</p></div>

      </li>
      <li class="tac">
        <div class="icon">
          <font class="font"></font>
        </div>

          <div class="text" @click="toService"><img src="../../../static/img/u4088.png" class="icon"><p>服务</p></div>


      </li>
      <li class="tac">
        <div class="icon">
          <font class="font"></font>
        </div>
          <div class="text" @click="toInfo"><img src="../../../static/img/u4088.png" class="icon"><p>健康资讯</p></div>
      </li>
      <li class="tac">
        <div class="icon">
          <font class="font"></font>
        </div>
          <div class="text"><img src="../../../static/img/u4088.png" class="icon" @click="goMyCenter"><p>我的</p></div>

      </li>
    </ul>

  </footer>
</template>
<script>
  export default {
    data() {
      return {

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
            console.log("toService");
            this.$router.push({path:'/service/book'});
        },
		toInfo(){
			this.$router.push("/tab/news");
		},
      goMyCenter(){
        this.$router.push('/myCenter')
      },
      goOnlineDoc(){
        this.$router.push("/online");
      }


    }
  };
</script>

<style scoped lang="scss">
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
