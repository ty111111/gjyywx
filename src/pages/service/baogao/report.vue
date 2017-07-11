<template>
  <div class="app">
      <app-header>
          <p>查报告单</p>
    </app-header>
      <div class="weui-cells">
          <a class="weui-cell weui-cell_access myPanel" @click="getReport">
              <div class="weui-cell__hd">
                  <p>检验报告</p>
    </div>
              <div class="weui-cell__bd">
    </div>
              <div class="weui-cell__ft">
    </div>
    </a>
          <a class="weui-cell weui-cell_access myPanel">
              <div class="weui-cell__hd">
                  <p>检查报告</p>
    </div>
              <div class="weui-cell__bd">
    </div>
              <div class="weui-cell__ft">
    </div>
    </a>
    </div>
      <div class="tips">
          <p class="title">温馨提示:</p>
          <p>1.检验报告：查看血常规、尿检等生化类报告单信息；</p>
          <p>2.检查报告：查看CT、MRI（磁共振）、X光、B超等检查类报告单信息；</p>
          <p>3.报告仅供参考，请以医院实际纸质报告为准。</p>
    </div>
      
  </div>
</template>

<script>
    import AppHeader from "../../../components/business/app-header.vue";
  export default {
    data() {
      return {

      };
    },
    computed:{

    },
    components:{
        AppHeader

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        getReport(){
            this.$router.push("/service/baogao/reportInfo");
        }

    }
  };
</script>

<style scoped lang="scss">
    p{
        font-size:0.88rem;
    }
    .app{
        flex:1 1 auto;
        background:rgb(248,248,248);
    }
    .myPanel{
        border:1px solid rgb(204,204,204);
    }
    .tips{
        padding:1rem 0.625rem;
        p{
            color:#999999;
            font-size:0.77rem;
            &.title{
                color:black;
                padding-bottom:1rem;
            }
        }
        
    }
</style>
