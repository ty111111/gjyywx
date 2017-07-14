<template>
  <div ref="main" class="app">
          <app-header>
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden; flex:1 1 auto">{{title}}</div>
    </app-header>
            <div class="weui-loadmore" v-show="!Got">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>               
          <div class="weui-loadmore weui-loadmore_line" v-show="failure">
              <span class="weui-loadmore__tips">网络错误</span>
    </div>
      <div v-show="Got&&!failure" class="flex overflow">
      <div class="weui-cells flex">
          <div class="weui-cell">
              <div>
                  <span class="big">预约信息</span><br><br>
             <div class="containing" style="font-size:0.77rem">
                 <p>医院: {{reserveInfo.hosName}}</p>
                 <p>科室: {{reserveInfo.deptName}}</p>
                 <p>医生: {{reserveInfo.name}}</p>
                 <p>就诊日期: {{reserveInfo.date}}  {{reserveInfo.Ampm}}</p>
                 <p >预估就诊时间: {{reserveInfo.time}}  <span class="weui-msg__desc" style="font-size:0.77rem">(以医院实际情况为准)</span></p>
                 <p>支付方式: 现场支付</p>
                 <p>挂号费: <span style="color:#FFCC00;font-size:0.77rem">{{reserveInfo.bookFee}}.0元</span></p>
    </div>
    </div>
              
    </div>
    </div>
      <div class="weui-cells flex">
          <div class="weui-cell">
              <div style="width:100%">
              <div class="patInfo">
                  <div style="text-align:left;width:40%">
                      <p class="big">就诊人信息</p>
    </div>
                  <div style="color:#3399ff;width:60%;text-align:right" @click="setPat">
                      切换就诊人>
    </div>
    </div>
    <div class="containing" style="font-size:0.77rem">
    <p>姓名: {{patInfo.name}}</p>
    <p>手机号: {{patInfo.phone}}</p>
    <p>身份证号: {{patInfo.id}}</p>
    <p>病案号: {{patInfo.compatRecord}}</p>
    </div>
    </div>
              
    </div>
    </div>

      <div class="weui-cells flex" v-show="Got">
      <my-nav title="验证码" :hasRight="hasRight" placeholder="请输入验证码" @update="updateVal">
          <div slot="right"><img src="" id="au" style="height:1.875rem;width:3.75rem;"></div>
    </my-nav>
      <div style="padding:20px 10px; background-color:rgb(248,248,248);">
      <button class="weui-btn weui-btn_plain-default" @click="done" style="background-color:white;height:2.6rem;border:1px solid #cccccc;font-size:1rem">确认挂号</button>
    </div>
    </div>

    <div v-show="isShown">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">提交失败</strong></div>
            <div class="weui-dialog__bd">{{msg}}</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="isShown=false">确定</a>
            </div>
        </div>
    </div>
    <div  v-show="recordDis">
        <div class="weui-mask" style="background-color:#666666"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd">该就诊人没有绑定病案号，无法查询</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="recordDis=false">取消</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="bind">去绑卡</a>
            </div>
        </div>
    </div>
  </div>
    </div>
</template>

<script>
    import api from '../../lib/api.js';
    import MyNav from "./nav";
    import AppHeader from "../../components/business/app-header";
  export default {
    data() {
      return {
          reserveInfo:{},
          hasRight:true,
          patInfo:{},
          bookHosId:"",
          bookNumId:"",
          token:"",
          imgSrc:"",
          auVal:"",
          isShown:false,
          recordDis:false,
          msg:"",
          Got:false,
          failure:false,
          patList:[],
          title:"就诊信息确认"
      };
    },
    computed:{
        key(){
            return (new Date()).valueOf();  
        }

    },
    components:{
        MyNav,
        AppHeader
    },
    mounted() {
        //this.setHeight();
        
    },
    beforeDestroy() {
        window.localStorage.removeItem("compatInfo")
    },
    methods: {
        setPat(){
            this.$router.push({path:"/service/setPat/",query:{key:this.key}});
        },
        bind(){
//            console.log(this.patInfo);
            this.$router.push({path:"/service/bind/"+this.patInfo.compatId,query:{key:this.key}});
        },
        updateVal(val){
            this.auVal=val;
        },
        done(){
            if(this.auVal==""){
                this.msg="验证码不能为空";
                this.isShown=true;
            }
            else if(this.patInfo.compatRecord=="暂未绑定病案号"){
                this.recordDis=true;
            }
            else{
                let command=window.localStorage['isAppt']?"nethos.book.order.register":"nethos.book.order.register";
                api(command,{bookNumId:this.bookNumId,bookHosId:this.bookHosId,compatId:this.patInfo.compatId,captcha:this.auVal,token:this.token})
                .then((val)=>{
                    console.log(val);
                    if(val.msg){
                        this.msg=val.msg;
                        this.isShown=true;
                    }
                    if(val.succ){
                    this.$router.push({path:"/service/book/info/"+"1",query:{key:this.key}});
                    }
                },
                     ()=>{
                    this.failure=true;
                })
            }
        },
        getPat(name,id,phone,compatRecord,compatId){
            var pat=new Object();
            pat.name=name;
            pat.id=id;
            pat.phone=phone;
            pat.compatRecord=compatRecord||"暂未绑定病案号";
            pat.compatId=compatId;
            this.patInfo=pat;
        }
        ,
        setHeight(){
            let screenHeight=document.documentElement.clientHeight;
            this.$refs.main.style.height=screenHeight-45 + 'px';
        },
        generateQR(){
              api("nethos.book.captcha.generate",{
                  compatId:this.patInfo.compatId,
                  bookHosId:this.bookHosId,
                  bookNumId:this.bookNumId,
                  token:this.token
                                                 })
              .then((val)=>{
                  this.Got=true;
                  this.imgSrc=val.obj.captcha;
                  this.imgSrc.replace(/[\r\n]/g,"");
                  document.getElementById('au').setAttribute("src","data:image/png;base64,"+this.imgSrc);
                  console.log(val.obj);
              },
                   ()=>{
                  this.failure=true;
                  this.Got=true;
              })
        }

    },
      created(){
          var tempList=this.$route.params.id.split("&");
          this.bookNumId=tempList[0];
          this.bookHosId=tempList[1];
          var storage=window.localStorage;
          var temp=new Object();
          if(!storage['hosName']||!storage['deptName']||!storage['name']||!storage['date']||!storage['date']||!storage['time']||!storage['Ampm'] ||!storage['bookFee']){
              alert("填写内容不完整，请重新填写");
              this.$router.push({path:"/service/book",query:{key:this.key}});
          }
          temp.hosName=storage["hosName"];
          temp.deptName=storage['deptName'];
          temp.name=storage['name'];
          temp.date=storage["date"];
          temp.time=storage['time'];
          temp.Ampm=storage['Ampm'];
          temp.bookFee=storage['bookFee'];
          temp.isAppt=eval(storage['isAppt'])||true;
          this.reserveInfo=temp;
          var backSrc=storage['last']||"/";
          this.token=window.localStorage['token'];
          var item={}
          if(window.localStorage['compatInfo']!=undefined){
              item=JSON.parse(window.localStorage['compatInfo']);
              this.getPat(item.compatName,item.compatIdcard,item.compatMobile,item.compatRecord,item.compatId);
              this.generateQR();              
          }
          else{
              api("nethos.pat.compat.list",{token:this.token})
              .then((val)=>{
                  this.patList=val.list;
                  var item=val.list[0];
                  this.getPat(item.compatName,item.compatIdcard,item.compatMobile,item.compatRecord,item.compatId);
                  this.generateQR();
              },
                   ()=>{
                  this.failure=true;
                  this.Got=true;
              })
          }
          
      }
  };
</script>

<style scoped lang="scss">
    .pat-header{
        display:flex;
        flex-direction:column;
        align-items:left
    }
    .patInfo{
        width:100%;
        display:flex;
        flex-direction:row;
    }
    .containing{
        font-size:0.77rem;
        p{
            font-size:0.77rem;
            padding:1rem 0;
            font-family: 宋体;
        }
    }

</style>
