<template>
  <div class="view">
      <app-header>
          <div> <p class="middle big" style="font-size:1rem;">医生评价</p></div>
    </app-header>
      <div class="totalComment">
      <p class="header weui-msg__desc">{{doctor.docName}}的评价</p>
        <div>
          <label v-for="i of 5" :class="{active : Math.round(doctor.docScoure/2)>=i}">
            &#xe60b;</label>
        </div>
    </div>
      <pull-up @pullUp="pullUp" class="wrapper">
          <div v-for="item in comments" class="well">
              <div>
                <span class="xingxing" v-for="i of 5" :class="{active : Math.round(item.sysComment.score/2)>=i}">
                  &#xe60b;</span>
              </div>
              <p>{{item.sysComment.content}}</p>
              <div class="test">
              <p>{{item.sysComment.moudleType}}</p>
                  <p style="flex:1 1 auto;text-align:right;padding-top:0.3125rem" class="weui-msg__desc"><img :src="item.sysPat.patAvatar" onerror="this.src='../../../src/assets/u6883.png'"class="smallPic">{{item.sysPat.patName}} | {{item.sysComment.createTime | goodTime}}</p>
    </div>
    </div>
    </pull-up>
    <div id="toast" v-show="nothingMore">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <p style="padding-top:2.5rem;font-size:1rem">无更多内容</p>
    </div>
</div>
  </div>
</template>

<script >
    import PullUp from '../../components/business/pullUp';
    import ScrollFresh from '../../components/business/scroll-fresh.vue';
    import AppHeader from "../../components/business/app-header";
    import api from "../../lib/api";
    import {goodTime} from  '../../lib/filter'
  export default {
    data() {
      return {
          doctor:{},
          comments:[],
          page:{},
          topValue:0,
          interval:{},
          nothingMore:false
      };
    },
    filters:{
      goodTime
    },
    computed:{

    },
      created(){
 
      },
    components:{
        PullUp,
        AppHeader,
        ScrollFresh
    },
    mounted() {
        let params={"docId":this.$route.params.id,'pageSize':10,'pageNo':1};
        this.apiRequest(params);

    },
    beforeDestroy() {

    },
    methods: { 
        apiRequest(params,pullUp){
            api("nethos.doc.comment.list",params)
            .then((val)=>{
                this.doctor=val.list[0].sysDoc;
                if(pullUp){
                    this.comments.push(...val.list);
                }
                else{
                    this.comments=val.list;
                }
                this.page=val.paginator;
                this.update();
            })
        },
        pullUp(){
            let params={'docId':this.$route.params.id,'pageNo':this.page.nextPage,'pageSize':10};

            if(this.page.hasNextPage){
                this.apiRequest(params,true);
            }
            else{
                this.nothingMore=true;
                setTimeout(()=>{this.nothingMore=false;},1000);
            }
        },
        update(){
            var test=0;
            this.comments.forEach((item)=>{
                if(item.sysComment.moudleType=='DOCPIC'){
                    item.sysComment.moudleType="图文问诊";
                    test++;
                }
                else if(item.sysComment.moudleType=="DOCVIDEO"){
                    item.sysComment.moudleType="视频问诊"
                }
            })
        }

    }
  };
</script>

<style scoped lang="scss">
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_umg51q7zjupzxgvi.woff') format('woff');
  }
  label {
    font-family: 'iconfont';
    font-size: 1.5625rem;
  }
    .wrapper{
        flex:1 1 auto;
        overflow:auto;
    }
  .xingxing{
    font-family: 'iconfont';
    font-size: 0.75rem;
  }
  .active {
    color: #eeba1b;
  }
    $totalHeight:6.25rem;
    $background:s#333333;
    .well{
        width:18rem;
        background:white;
        margin:0.625rem auto;
        border-radius:0.3125rem;
        border:1px solid $background;
    }
    .scroller{
        background:rgb(248,248,248);
        overflow:auto;
    }
    .test{

        display:flex;
        flex-direction:row;
    }
    .totalComment{
        flex: 0 0 auto;/*flex:0 1 auto*/
        padding-top:0.625rem;
        height:$totalHeight;
        text-align:center;
    }
    header{
        flex: 0 0 auto;
    }
    p{
        font-size:0.77rem;
        padding:0.3125rem;
        &.header{
            padding-top:0.625rem;
            font-size:1rem;
        }
    }
    .smallPic{
        height:1rem;
        padding-top:0.3125rem;
        border-radius:0.625rem;
    }
    .view{
        display:flex;
        overflow:hidden;
        flex-direction:column;
    }
</style>
