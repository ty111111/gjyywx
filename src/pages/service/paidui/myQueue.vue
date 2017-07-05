<template>
  <div>
      <app-header>
          <div class="middle big">我的叫号</div>
          <img slot="left" src="../../../../static/img/u436.png" onClick="window.history.back()"> 
    </app-header>
      <div v-if="list.length==0" class="noItem">
          当前没有您的叫号
    </div>
      <div class="weui-cells" v-for="item in list">
          <div class="weui-cell weui-cell-access">
              <div class="weui-cell__hd">
              <img :src="item.imgSrc" onerror="javascript:this.src='../../../../static/img/u4088.png'">
    </div>
              <div class="weui-cell__bd">
              <div>{{item.deptName}}<br>
                  <p style="font-size: 14px;color: #999999;">{{item.time}} {{item.Ampm}}<br>{{item.name}} {{item.num}}</p>
    </div>
    </div>
              <div class="weui-cell__ft">
                  <div >当前叫号<br><span style="color:black">231</span></div>
    </div>
    </div>
          <div class="weui-cell weui-cell-accesss">
              <p style="margin:0 auto;"> 前面还有<span>24</span>个号</p>
    </div>
    </div>
  </div>
</template>

<script>
    import MyPanel from "../../../components/business/panel";
    import api from "../../../lib/api.js";
    import AppHeader from "../../../components/business/app-header";
  export default {
    data() {
      return {
          list:[]
      };
    },
    computed:{

    },
    components:{
        AppHeader,
        MyPanel
    },
    mounted() {
        api("nethos.my.queue.num",{compatId:this.$route.params.id,token:window.localStorage['token']})
        .then((val)=>{
            console.log(val);
        })
    },
    beforeDestroy() {

    },
    methods: {

    }
  };
</script>

<style scoped lang="scss">
    span{
        color: #3399FF;
    }
    .weui-cell{
        border:1px solid lightgrey;
    }
    .noItem{
        padding-top:100px;
        text-align:center;
        width:100%;
        height:200px;
        font-size: 24px;
        color: #999999;
    }    
</style>
