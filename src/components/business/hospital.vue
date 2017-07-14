<template>
  <div class="app">
      <div class="app">
      <app-header>
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden; flex:1 1 auto">预约挂号</div>
          <div slot="right"  class="appointl" @click="getMyScheme" style="0 0 auto;width:4rem;"><p class="right">我的挂号</p></div>
    </app-header>
    <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
      <div class="weui-loadmore weui-loadmore_line" v-show="failure">
          <span class="weui-loadmore__tips">网络错误</span>

    </div>
    <div class="weui-panel weui-panel_access containing" v-show="Got&&!failure">
        <div class="weui-panel__bd scroller" >
                    <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="item in hospital" @click="show(item.bookHosId,item.hosName)" :id="item.bookHosId">
                <div class="weui-media-box__hd">
                    <a :href="item.picture"><img class="weui-media-box__thumb" :src="item.hosPic" alt="" style="border-radius:50%; height:100%"></a>
                </div>
                <div class="weui-media-box__bd">
                    <p class="weui-media-box__title">{{item.hosName}}</p>
                    <p class="weui-media-box__desc">{{item.hosLevel}}<br>{{item.hosAddress}}</p>
                </div>
            </a>
        </div>
    </div>
	<app-footer msg="service" class="footer">

	</app-footer>
    </div>
    <div class="background" v-show="isShown" >
        <div class="option weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                <a @click="changeRoute('true')"  class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" src="../../../images/u4088.png" alt="" >
            </div>
           <div class="weui-media-box__bd">
                <p class="weui-media-box__title">预约挂号</p>
                <p class="weui-media-box__desc">七天内普通号、专家号预约</p>
            </div>
    </a>

    </div>
    </div>
                <div class="option weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                        <a  @click="changeRoute('false')"class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" src="../../../images/u4088.png" alt="" >
            </div>
            <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">当天挂号</h4>
                <p class="weui-media-box__desc">今天号源立挂立取</p>
            </div>
        </a>

    </div>
    </div>
    </div>
  </div>
</template>

<script>
    import AppHeader from "../../components/business/app-header";
    import api from "../../lib/api.js";
	import AppFooter from "../../components/business/app-footer";
  export default {
      data()
      {
         return{
             hospital:[],
             isShown:false,
             hospitalId:"",
             hosName:'',
             isAppt:true,
             Got:false,
             failure:false

         }
      }
      ,

      methods:
      {
          getMyScheme(){
              this.$router.push("/myRegistration/"+window.localStorage["myId"]);
          },
          check(){
              console.log("click get");
          },
          show(id,name){
              this.hosName=name;
              this.isShown=true;
              this.hospitalId=id;
          },
          changeRoute(id){
              let that=this;
              this.isAppt=id;
              setTimeout(()=>{that.isShown=false;},1000);
              let path="/service/book/department/"+this.hospitalId;
              this.$router.push({path:path,query:{key:this.key}});
          }

      },
        mounted(){
            window.localStorage.removeItem("deptIndex");
      },
      computed:{
          key(){
              return (new Date()).valueOf();
          }
      },
      created(){
          console.log("获取医院信息");
          api("nethos.book.hos.area.list",{gbCityCode:""})
          .then((val)=>{
              console.log(val);
              if(!val.succ){
                  return;
              }
              this.Got=true;
              this.hospital=val.list;
              console.log(val)
          },(e)=>{
              this.failure=true;
              this.Got=true;
              console.log("failed");
          })
      },
	  components:{
		AppFooter,
          AppHeader
	  },
      beforeDestroy(){
          window.localStorage["isAppt"]=this.isAppt;
          window.localStorage['hosName']=this.hosName;
//          window.localStorage['backSrc']="/service/book/";
      }
  }
</script>

<style scoped lang="scss">
    .background{
        padding-top:45%;

        display:flex;
        align-items:center;
        flex-direction: column;
    }
    .option{
        margin-top:5%;
        width:80%;
        height:30%;
        box-shadow: 2px 5px 5px lighten(black,40%);

    }
    .footer{
        flex: 0 0 auto;
        
    }
    .containing{
        flex:1 1 auto;
    }
    .app{
        flex:1 1 auto;
        display:flex;
        flex-direction:column;
    }
</style>
