<template>
  <div class="app">
      <app-header>
          <p class="middle big" style="flex: 1 1 auto; text-align:center;font-size:1rem">检验报告</p>
    </app-header>

      <div class="containing" >
      <div class="weui-cells">
        <div class="weui-loadmore" v-show="!Got1">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
          <div class="weui-cell" v-show="Got1">
              <div style="width:100%">
              <div class="div_title"><p class="big">[检验类别]</p><p style="flex:1 1 auto;" class="right">(检验id)</p></div>
              <div class="patInfo">
                  <div>
                      <p class="small">姓名：{{profile.name|check}}</p>
                      <p class="small">性别：{{profile.gender|setGender|check}}</p>
                      <p class="small">年龄：{{profile.age|check}}</p>
    </div>
                  <div>
                      <p class="small">科室：{{profile.examineDept|check}}</p>
                      <p class="small">病区：{{profile.inpatientArea|check}}</p>
                      <p class="small">床号：{{profile.bedNo|check}}</p>
    </div>
                  <div>
                      <p class="small">标本类型：{{profile.specimenType|check}}</p>
                      <p class="small">送检医生：</p>
                      <p class="small">检验医生：{{profile.inspectDoc|check}}</p>
    </div>
    </div>
                  <div>
                      <p class="small">临床诊断：{{profile.diagnosis|check}}</p>
                      <p class="small">检验样本号：{{profile.sampleNum|check}}</p>
                      <p class="small">采集日期：{{profile.collectionDate|check}}</p>
                      <p class="small">检验日期：{{profile.inspectDate|check}}</p>
                      <p class="right small">审核医生：{{profile.examineDoc|check}}</p>
    </div>
                  <div>
                      <p class="right" style="color:black">具体报告信息请以医院纸质报告为准！</p>
    </div>
    </div>
    </div>
    </div>
      <div class="weui-cells">
        <div class="weui-loadmore" v-show="!Got2">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
          <table v-show="Got2">
              <tr>
              <th>No</th>
              <th>项目</th>
              <th>结果</th>
              <th>参考值</th>
              <th>单位</th>
    </tr>
              <tr v-for="item in tableData">
                  <td>{{item.expCode}}</td>
                  <td>{{item.expName}}</td>
                  <td>{{item.expResultNum}}</td>
                  <td>{{item.consult}}</td>
                  <td>{{item.expUnit}}</td>
    </tr>
    </table>
    </div>
    </div>
  </div>
</template>

<script>
    import AppHeader from "../../../components/business/app-header.vue";
    import Api from "../../../lib/api.js";
  export default {
    data() {
      return {
          tableData:[{num:1,proj:"XXXXXX",conclusion:"10.24",approx:"10.01-11.36",unit:'10^9/L'}],
          profile:{},
          Got1:false,
          Got2:false
      };
    },
    computed:{

    },
    components:{
        AppHeader
    },
      filters:{
          setGender(item){
              if(item==1){
                  return "男";
              }
              return "女";
          },
          check(item){
            if(item==''){
                return "无";
            }
              return item;
      }
      },
    mounted() {
        var list=this.$route.params.id.split("&");
        var compatId=list[1];
        var recordId=list[0];
        var startDate=this.getTime("start");
        var endDate=this.getTime("end");
        Api("nethos.book.inspect.list",{token:window.localStorage['token'],startDate:startDate,endDate:endDate,compatId:compatId})
        .then((val)=>{
            console.log(val.list);
            var tempList=val.list;
            for(let i =0; i<tempList.length;i++){
                if(tempList[i].recordId==recordId){
                    this.profile=tempList[i];
                    break;
                }
            }
            this.Got1=true;
        })
        Api("nethos.book.inspect.info",{token:window.localStorage['token'],recordId:this.$route.params.id})
        .then((val)=>{
            console.log(val);
            this.tableData=val.list;
            this.Got2=true;
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
    .app{
        background:rgb(248,248,248);
        flex:1 1 auto;
        display:flex;
        flex-direction:column;
    }
    p,td{
        color:#666666;
        font-size:0.77rem;
        padding:0.3rem;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }
    .big{
        color:black;
        font-size:0.875rem;
        padding:0.3rem;
    }
    .patInfo{
        width:100%;
        display:flex;
        flex-direction:row;
        div{
            flex:1 1 auto;
        }
    }
    .div_title{
        display:flex;
        flex-direction:row;
        .small{
            text-align:right;
            flex:1 1 auto;
        }
    }
    .right{
        text-align:right;
    }
    .weui-cells{
        div{
            width:100%;
        }
        table{
            width:100%;
            td{
                text-align:center;
            }
        }
        border:1px solid rgb(204,204,204); 
    }
    header{
        flex:0 0 auto;
    }
    .containing{
/*        display:flex;*/
        flex: 1 1 auto;
        overflow:auto;
    }
</style>
