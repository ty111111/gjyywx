<template>
  <div >
    <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
      <div class="weui-loadmore weui-loadmore_line" v-show="failure">
          <span class="weui-loadmore__tips">网络错误</span>
          
    </div>
    <div class="weui-panel weui-panel_access" v-show="Got&&!failure">
        <div class="weui-panel__bd">
                    <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="item in hospital" @click="show(item.bookHosId,item.hosName)" :id="item.bookHosId">
                <div class="weui-media-box__hd">
                    <a :href="item.picture"><img class="weui-media-box__thumb" :src="item.hosPic" alt="" style="border-radius:50%; height:100%"></a>
                </div>
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{item.hosName}}</h4>
                    <p class="weui-media-box__desc">{{item.hosLevel}}<br>{{item.hosAddress}}</p>
                </div>
            </a>
        </div>
    </div>
	<app-footer class="footer">
		
	</app-footer>
    <div class="background" v-show="isShown" >
        <div class="option weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                <a @click="changeRoute('true')"  class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" src="../../../images/u4088.png" alt="" >
            </div>
           <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">预约挂号</h4>
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
              this.$router.push({path:path});
          }

      },
        mounted(){
            window.localStorage.removeItem("deptIndex");
            this.$emit("headerInfo",{
                title:"预约挂号",
                backSrc:"/"
            })
            this.$emit("hasRight");
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
		AppFooter
	  },
      beforeDestroy(){
          this.$emit("hasRight");
          window.localStorage["isAppt"]=this.isAppt;
          window.localStorage['hosName']=this.hosName;
//          window.localStorage['backSrc']="/service/book/";
      }
  }
</script>

<style scoped lang="scss">
    .background{
        padding-top:45%;
        position:fixed;
        left:0px;
        top:0px;
        background-color:grey;
        width:100%;
        height:100%;
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
        position:fixed;
        bottom:0px;
        width:100%;
    }
</style>
