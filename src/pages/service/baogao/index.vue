<template>
  <div class="app">
      <app-header>
          <img slot="left" src="../../../../static/img/u436.png" class="arrow"onClick="window.history.back()">
          <div class="middle big">排队叫号</div>
          <a slot="right" class="chaxun" @click="query">查询</a>
    </app-header>
      <div class="weui-cells myPanel">
          <my-panel @activate="setPat" >
              <p slot="picture" style="color:#666666">就诊人信息</p>
              <p slot="ft" class="small" style="color:#3399cc" >切换就诊人</p>
    </my-panel>
          <div class="weui-cell weui-msg__desc small" >
              姓名： {{patInfo.compatName}}<br>
              手机号：{{patInfo.compatMobile}}<br>
              身份证号：{{patInfo.compatIdcard}}<br>
              病案号： {{patInfo.compatMedicalRecord}}
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
</template>

<script>
    import MyPanel from "../../../components/business/panel";
    import api from "../../../lib/api.js";
    import AppHeader from "../../../components/business/app-header";
  export default {
      components:{
          AppHeader,
          MyPanel
      },
      data(){
          return{
              patInfo:{},
              recordDis:false,
              compatRecord:""
          }
      },
      mounted(){
          if(!window.localStorage['token']){
              alert("请先登录");
          }
          else{
              var item={};
              if (window.localStorage['compatInfo']!=undefined){
                  item=window.localStorage['compatInfo'];
                  this.patInfo=JSON.parse(item);
                  if(!this.patInfo.compatMedicalRecord){
                      this.patInfo.compatMedicalRecord="暂未绑定病案号";
                  }
              }
              else{
                 api("nethos.pat.compat.list",{'token':window.localStorage['token']})
                 .then((val)=>{
                     console.log(val);
                     this.patInfo=val.list[0];
                  if(!this.patInfo.compatMedicalRecord){
                      this.patInfo.compatMedicalRecord="暂未绑定病案号";
                  }
                   this.compatRecord=this.patInfo.compatRecord;
                 })
              }
          }
      },
      methods:{
          setPat(){
             this.$router.push("/service/setPat/"); 
          },
          query(){
              if (this.patInfo.compatMedicalRecord=="暂未绑定病案号"){
                  this.recordDis=true;
//                  console.log(this.recordDis);
//                  this.$router.push("/service/bind/"+this.patInfo.patId);
              }
              else{
                  if(this.patInfo.compatId){
                    this.$router.push("/service/baogao/report/"+this.patInfo.compatId+"&"+encodeURI(this.patInfo.compatName));
                  }
                  else{
                      alert("该病人无法查询");
                      window.history.back();
                  }
              }
          },
          bind(){
              this.$router.push("/service/bind/"+this.patInfo.patId);
          }
      },
      beforeDestroy(){
          window.localStorage.removeItem("compatInfo");
      }
  }
</script>
<style scoped lang="scss">
    .myPanel{
        border:1px solid rgb(204,204,204);
    }
    .chaxun{
        font-size:0.875rem;
        color: #3399CC;
        padding-right:0.8rem;
        }
    .small{
        font-size:0.77rem;
        color:#666666;
    }
    .arrow{
        margin:0.5rem 0.3rem;
        height:2rem;
    }
    .app{
        flex:1 1 auto;
        background:rgb(248,248,248);
    }

</style>
