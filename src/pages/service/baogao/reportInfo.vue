<template>
  <div class="app">
      <app-header>
          <p style="flex:1 1 auto;text-align:center">检验报告</p>
    </app-header>
      <div class="hori">
          <div v-for="item,index in timeList" @click="setType(index)" :class="{'chosed':chosedItem==index}">
              {{item}}
    </div>
    </div>
        <div class="weui-loadmore" v-show="!Got">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
      <div  v-show="Got">
          <div class="containing" v-for="item in filteredList" v-show="!noList&&mode=='jy'" @click="getDetail(item.recordId)">
              <p class="title">{{item.inspectType}}报告</p>
          <div class="tip"><p>{{item.name}}</p><p class="right">{{item.inspectDate}}</p></div>
    </div>
          <div class="containing" v-for="item in filteredList" v-show="!noList&&mode=='jc'" @click="getDetail(item.recordNum)">
              <p class="title">{{item.checkName}}报告</p>
          <div class="tip"><p>{{item.name}}</p><p class="right">{{item.checkTime}}</p></div>
    </div>
    </div>
      <p v-show="Got&&noList" class="prime">当前没有查到您的报告单</p>
  </div>
</template>

<script>
    import AppHeader from "../../../components/business/app-header.vue";
    import Api from "../../../lib/api.js";
  export default {
    data() {
      return {
          timeList:['一周内','三个月','半年内','一年内'],
          chosedItem:0,
          list:[],
          mode:'jy',
          name:"",
          compatId:"",
          Got:false

      };
    },
    computed:{
        noList(){
            if(this.filteredList.length==0){
                return true;
            }
            return false;
        },
        filteredList(){
            return this.list.filter((item)=>{
                return item.index==this.chosedItem;
            })
        }
    },
    components:{
        AppHeader
    },
    mounted() {
        [this.compatId,this.name]=this.$route.params.id.split("&");
        this.mode=window.localStorage['mode']?window.localStorage['mode']:'jy';
        var url=this.mode=='jy'?"nethos.book.inspect.list":"nethos.book.inspect.examination"
        console.log(url);
        var startTime=this.getTime("start");
        var endTime=this.getTime("end");
        console.log(startTime,endTime);
        Api(url,{token:window.localStorage['token'],compatId:this.compatId,startDate:startTime,endDate:endTime})
        .then((val)=>{
            console.log(val);
            this.list=val.list;
            for(let i=0;i<this.list.length;i++){
            this.setTimeTag(this.list[i]);
            this.Got=true;
        }
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
        },
        getDetail(id){
            console.log("getDetail");
            if(this.mode=='jy')
                {
                    this.$router.push("/service/baogao/detail/"+id+"&"+this.compatId);
                }
            else{
                this.$router.push("/service/baogao/reportDetail/"+id+"&"+this.compatId+"&"+this.name);
            }
        },
        setType(item){
            this.chosedItem=item;
        },
        setTimeTag(item){
            var checkDate=this.mode=='jy'?item.inspectDate:item.checkTime;
            var date=new Date();
            console.log(item);
            if(item.inspectDate){
                item.inspectDate=item.inspectDate.replace(/\//g,"-");
            }
            if(item.checkTime){
                item.checkTime=item.checkTime.replace(/\//g,"-");
            }
            
            var newDate=new Date(checkDate);
            var date3=date.getTime()-newDate.getTime();
            var days=Math.floor(date3/(24*3600*1000));
            if(days<7){
                item.index=0;
            }
            else if(days<93){
                item.index=1;
            }
            else if(days<183){
                item.index=2;
            }
            else if(days<365){
                item.index=3;
            }
        }

    }
  };
</script>

<style scoped lang="scss">
    .app{
        display:flex;
        flex-direction:column;
        flex:1 1 auto;
        background:rgb(248,248,248);
    }
    p{
        color:#999999;
        &.prime{
            text-align:center;
            font-size:1.3rem;
            margin:0 auto;
            padding-top:5rem;
        }
    }
    header{
        flex:0 0 auto;
        p{
            
        font-size:0.875rem;
        color:black;
        }
    }
    .hori{
        flex:0 0 auto;
        border:1px solid #cccccc;
        background:white;
        display:flex;
        flex-direction:row;
        width:20rem;
        div{
            width:5rem;
            margin:0 1rem;
            padding:0.5rem 0;
        }
        
    }
    .containing{
        flex:1 1 auto;
        overflow:auto;
        margin:0.5rem;
        background:white;
        height:4rem;
        border:1px solid #ccc;
        box-shadow:0px 3px 0px #cccccc;
        p{
            &.title{
                color:black;
                padding:0 0.5rem;
                font-size:1.3rem
            }
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
        }
        div{
            display:flex;
            flex-direction:row;
            padding-top:0.5rem;
            p{
                flex:1 1 auto;
                font-size:0.77rem;
                padding:0 0.5rem;
                &.right{
                    text-align:right;
                }
            }
        }
    }
    .chosed{
        color:#3399FF;
        border-bottom:1px solid #3399FF;
    }
</style>
