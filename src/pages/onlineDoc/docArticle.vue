<template>
  <div>
      <app-header>
          <div class="middle big">医生文章</div>
    </app-header>
      <div>
          <scroll-fresh height="3.125rem" :isCompleted="isCompleted" @pullDown="pullDown" top="2.8125rem" bottom="0rem">
              <div slot="containing" class='weui-cells'>
                  <a class="weui-cell" v-for="item in articleList" @click="getDetail(item)">
                      <div class="weui-cell__hd">
                          <p>{{item.title}}</p>
                          <p class="weui-msg__desc"><span v-show="item.isGrade" class="recTag">推荐</span> <span>{{item.readTimes}}阅读 {{item.createTime}} | {{docName}}</span></p>
    </div>

    </a>
    </div>
    </scroll-fresh>
    </div>
  </div>
</template>

<script >
  import ScrollFresh from '../../components/business/scroll-fresh.vue';
  import AppHeader from "../../components/business/app-header";
  import api from "../../lib/api";
  export default {
    data() {
      return {
          isCompleted:false,
          articleList:[],
          docName:"",
          docId:''
      };
    },
    computed:{
    },
    components:{
        AppHeader,
        ScrollFresh
    },
    mounted() {
      this.$set(this.$data,'docId',this.$route.params.docId)
        this.update();
    },
    beforeDestroy() {

    },
    methods: {
        getDetail(item){
            console.log(item.articleId);
            this.$router.push("/articleDetail/"+item.articleId);
        },
        update(){
            api("nethos.doc.card",{docId:this.docId})
            .then((val)=>{
                this.docName=val.obj.sysDoc.docName;
                this.articleList.push(...val.obj.docArticleList);
                console.log(this.articleList);
                for(let i=0;i<this.articleList.length;i++){
                    var item=this.articleList[i];
                    console.log(item);
                    item.createTime=this.getLocalTime(item.createTime);
                }
//                this.articleList.forEach((item)=>{
//                    item.createTime=this.getLocalTime(item.createTime);
//                })
          this.isCompleted=true;
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
        border-radius:0.3125rem;
        padding:0 0.3125rem;
    }
</style>
