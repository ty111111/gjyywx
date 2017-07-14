<template>
  <div class="app">
      <app-header>
          <p style="flex:1 1 auto;text-align:center;">检查报告</p>
    </app-header>
      <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
      <div class="containing" v-show="Got">
      <div class="weui-cells" style="padding: 20px 15px">
          <p class="title">[医疗名称]</p>
          <div class="div_info">
              <div>
                  <p>姓名：{{name}}</p>
                  <p>性别：{{profile.gender|getGender|check}}</p>
                  <p>年龄：{{profile.age|getAge|check}}</p>
    </div>
              <div>
                  <p>送检医生：{{profile.sendDoc|check}}</p>
                  <p>检验医生：{{profile.inspectDoc|check}}</p>
                  <p>审核医生：{{profile.examineDoc|check}}</p>
    </div>
    </div>
          <div>
              <p>送检日期：{{profile.sendTime|check}}</p>
              <p>检查日期：{{profile.checkTime|check}}</p>
    </div>
          <p class="right title">具体报告信息请以医院纸质报告为准！</p>
    </div>
      <div class="weui-cells">
          <article class="weui-article">
              <h2>检验结果</h2>
              <p>{{profile.checkResult|check}}</p>
              <h2>检验结果描述</h2>
              <p>{{profile.checkDetail|check}}</p>
    </article>
    </div>
  </div>
    </div>
</template>

<script>
    import AppHeader from "../../../components/business/app-header";
    import Api from "../../../lib/api.js";
  export default {
    data() {
      return {
          profile:{},
          name:"",
          Got:false
      };
    },
    computed:{

    },
      filters:{
          getAge(item){
//              return item;
              var oldDate=new Date(item);
              var now=new Date();
              return now.getFullYear()-oldDate.getFullYear();
          },
          getGender(item){
              return item=="F"?"男":"女";
          },
          check(item){
              return !item||item==''?"无":item;
          }
      },
    components:{
        AppHeader
    },
    mounted() {
        var recordId,compatId;
        [recordId,compatId,this.name]=this.$route.params.id.split("&");
        var startDate=this.getTime("start");
        var endDate=this.getTime("end");
        Api("nethos.book.inspect.examination",{token:window.localStorage['token'],compatId:compatId,startDate:startDate,endDate:endDate})
        .then((val)=>{
            console.log(val);
            for(let i=0;i<val.list.length;i++){
                if(val.list[i].recordNum==recordId){
                    this.profile=val.list[i];
                    break;
                }
            }
            this.Got=true;
        })
    },
    beforeDestroy() {

    },
    methods: {
        setTime(date){
            let month= ("0" + (date.getMonth() + 1)).slice(-2);
            let day=("0" + (date.getDate())).slice(-2);
            let year=date.getFullYear();
            return year+"-"+month+"-"+day;
        },
        getTime(msg){
            var date=new Date();
//            var year=365;
            if(msg=="start"){
                date.setFullYear(date.getFullYear()-1);
            }
            return this.setTime(date);
        }
    }
  };
</script>

<style scoped lang="scss">
    header{
      flex:0 0 auto;  
    },

    .right{
        text-align:right;
    }
    .app{
        display:flex;
        flex-direction:column;
        flex: 1 1 auto;
        background:rgb(248,248,248);
    }
    .div_info{
        display:flex;
        flex-direction:row;
        div{
            flex:1 1 auto;
            p{
            padding-left:0.5rem;
                padding-top:0.3rem;
                padding-bottom:0.3rem;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
            }
        }
    }
    .containing{
    p{
        font-size:0.77rem;
        color:#666666;
        padding:0.3rem 0.5rem;
        &.title{
            color:black;
            font-size:0.875rem;
        }
    }
        flex:1 1 auto;
        overflow:auto;
    }
    .weui-cell{
        padding:20px 15px;
    }
</style>
