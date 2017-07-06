<template>
  <div>
      <app-header>
          <img slot="left" src="../../../../static/img/u436.png" class="arrow"onClick="window.history.back()">
          <div class="middle big">排队叫号</div>
          <a slot="right" class="chaxun" @click="query">查询</a>
    </app-header>
      <div class="weui-cells">
          <my-panel>
              <p slot="picture" style="color:#666666">就诊人信息</p>
              <p slot="ft" class="small" style="color:#3399cc">切换就诊人</p>
    </my-panel>
          <div class="weui-cell weui-msg__desc small" >
              姓名： {{patInfo.patName}}<br>
              手机号：{{patInfo.patMobile}}<br>
              身份证号：{{patInfo.patIdcard}}<br>
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
              recordDis:false
          }
      },
      mounted(){
          if(!window.localStorage['token']){
              alert("请先登录");
          }
          else{
              api("nethos.pat.info.get",{token:window.localStorage['token']})
              .then((val)=>{
                  console.log(val);
                  this.patInfo=val.obj;
                  if(!this.patInfo.compatMedicalRecord){
                    this.patInfo.compatMedicalRecord="暂无绑定病案号";
                  }
              })
          }
      },
      methods:{
          query(){
              if (this.patInfo.compatMedicalRecord=="暂无绑定病案号"){
                  this.recordDis=true;
//                  this.$router.push("/service/bind/"+this.patInfo.patId);
              }
              else{
                  this.$router.push("/service/paidui/myQueue/"+this.patInfo.patId);
              }
          },
          bind(){
              this.$router.push("/service/bind/"+this.patInfo.patId);
          }
      }
  }
</script>
<style scoped lang="scss">
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
</style>
