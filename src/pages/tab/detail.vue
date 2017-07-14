<template>

  <div class="viewpage view">
    <div id="toast" v-show="isSucc">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">已完成</p>
        </div>
    </div>
    <app-header>
      <div class="middle big">文章详情</div>
    </app-header>

    <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
      <my-article :containing="containing" v-show="Got"></my-article>
  </div>
</template>

<script>
  import Api from "../../lib/api"
  import AppHeader from "../../components/business/app-header.vue"
  import MyArticle from "../../components/business/detail";
  export default {
    data() {
      return {
          isSucc:false,
          Got:false,
          containing:"{}"
      };
    },
    computed:{
    },
    components:{
        MyArticle,
        AppHeader
    },
    mounted() {
        Api("nethos.system.information.details",{newId:this.$route.params.id})
        .then((val)=>{
            this.Got=true;
            console.log(val);
            this.containing=JSON.stringify(val.obj);
        })
    },
    beforeDestroy() {

    },
    methods: {

    }
  };
</script>

<style scoped lang="scss">
    .title{
        font-family: 'Arial Normal', 'Arial';
        font-style: normal;
        font-weight: 400;
        font-size: 2.125rem;
        color: #CC6633;
    }
    .page__hd{
        text-align:center;
        
    }
    .page__desc{
        color:#CCCCCC;
        font-size:12px;
    }
    .page{
        overflow:auto;
        -webkit-overflow-scrolling:touch;
        position:absolute;
        top:2.8rem;
        width:100%;
        border-top:1px solid lightgrey;
    }
</style>
