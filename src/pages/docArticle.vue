<template>
  <div>
      <app-header>
          <img slot="left" src="../../static/img/u436.png">
          <div class="middle big">医生文章</div>
    </app-header>
      <div>
          <scroll-fresh height="50" :isCompleted="isCompleted" @pullDown="pullDown" top="45">
              <div slot="containing" class='weui-cells'>
                  <a class="weui-cell" v-for="item in articleList" @click="getDetail(item)">
                      <div class="weui-cell__hd">
                          <p>{{item.title}}</p>
                          <p class="weui-msg__desc"><span v-show="item.isGrade" class="recTag">推荐</span> {{item.readTimes}}阅读 {{item.createTime}} | {{docName}}</p>
    </div>

    </a>
    </div>
    </scroll-fresh>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import ScrollFresh from '../components/business/scroll-fresh';
    import AppHeader from '../components/business/app-header';
    import api from '../lib/api.js';
  export default {
    data() {
      return {
          isCompleted:false,
          articleList:[],
          docName:"",
          docId:""
      };
    },
    computed:{
    },
    components:{
        AppHeader,
        ScrollFresh
    },
    mounted() {
      console.log(this.$route.params.docId,898989)
        this.update();
    },
    beforeDestroy() {

    },
    methods: {
        getDetail(item){
            console.log(item.articleId);
            this.$router.push("/user/articleDetail/"+item.articleId);
        },
        update(){

          this.$set(this.$data,'docId',this.$route.params.docId)

            api("nethos.doc.card",{docId:this.docId})
            .then((val)=>{
                this.docName=val.obj.sysDoc.docName;
                this.articleList=val.obj.docArticleList||[];
                this.articleList.forEach((item)=>{
                    item.createTime=this.getLocalTime(item.createTime);
                })

                setTimeout(()=>{this.isCompleted=true},20);
                setTimeout(()=>{this.isCompleted=false},100);
            })
        },
        pullDown(){
            this.update();
        },
        getLocalTime(time){
            time/=1000;

            var date=new Date(time*1000);
            return new Date(time * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        }
    }
  };
</script>

<style scoped lang="scss">
    .recTag{
        border:1px solid #999;
        border-radius:5px;
        padding:0 5px;
    }
</style>
