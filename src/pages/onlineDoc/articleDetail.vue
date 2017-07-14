<template>
  <div>
      <app-header>

          <div ><p class="middle big">文章详情</p></div>
    </app-header>
      <div class="weui-loadmore" v-show="!Got">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
      <div class="window" ref="window" v-show="Got">

      <my-panel @activate="follow()" :hasArrow="hasArrow">
          <div slot="picture"><img :src="info.docAvatar"class="figure" onerror="this.src='../../../src/assets/u6883.png'"></div>
          <div slot="article" style="color:black">{{info.docName}}</div>
          <div  slot="ft" class="small">{{footerWord}}</div>
    </my-panel>
      <my-article :containing="containing" height="25rem"></my-article>
          <div style="border-top:1px solid #ccc">
              <p  style="text-align:center;color:#999999"class="small">长按识别二维码，关注我{{this.hasArrow}}</p>
              <img :src="info.docQrcodeUrl" class="QrCode">
    </div>
    </div>
  </div>
</template>

<script>

    import MyArticle from "../../components/business/detail.vue";
    import MyPanel from "../../components/business/panel.vue";
    import AppHeader from "../../components/business/app-header.vue";
    import api from "../../lib/api";
  export default {
    data() {
      return {
          headerHeight:45,
          command:"nethos.doc.article.detail",
          containing:'{}',
          info:{},
          Got:false,
          params:{},
          isFollowed:false

      };
    },
    computed:{
        footerWord(){
            return this.isFollowed?"已关注":"关注我";
        },
        hasArrow(){
            return this.footerWord=='已关注'?"false":"true";
        }
    },
    components:{
        MyArticle,
        MyPanel,
        AppHeader
    },
    mounted() {
        this.$refs.window.style.height=document.documentElement.clientHeight-this.headerHeight+'px';
    },
    beforeDestroy() {

    },
    created(){
        let articleId=this.$route.params.id;
        this.params={"articleId":articleId,"token":window.localStorage['token']};
        api(this.command,this.params)
        .then((val)=>{
            console.log(val);
            this.info=val.obj.sysDoc;
            this.containing=JSON.stringify(val.obj.docArticle);
            this.Got=true;
            this.params={docId:this.info.docId,token:window.localStorage['token']};

            api("nethos.follow.get",this.params)
            .then((val)=>{
//                console.log(val);
                this.isFollowed=val.succ;
            },
                     ()=>{
                alert("网络错误，请稍后重试");
            });
        });
    },
    methods: {
        follow(){
            
            if(this.info.follow){
                return;
            }
            api("nethos.follow.dp.add",this.params)
            .then((val)=>{
                api("nethos.follow.get",this.params)
                .then((val)=>{
                    this.isFollowed=val.obj.followDocpat.enable;
                },
                         ()=>{
                    alert("网络错误，请稍后重试");
                })
            },
                 ()=>{
                alert("网络错误，请稍后重试");
            })
        }
    }
  };
</script>

<style scoped lang="scss">

    .window{
        overflow:auto;
    }
        .figure
    {
        width:3.75rem;
        margin-right:0.3125rem;
        display:block;
        border-radius:50%;
        margin-right:1rem;
    }
    .QrCode{
        width:100%;
        padding:0 10%;
    }
</style>
