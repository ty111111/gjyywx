<template>
  <div>
      <app-header>
          <div><p class="big middle">选择就诊人</p></div>
    </app-header>
      <div class="containing">
          <div class="weui-cells">
              <my-panel hasArrow="true" v-for="item in patList" class="panel" @activate="setPat(item)">
                  <div slot="picture"></div>
                  <div slot="article" class="patInfo">
                      <p>姓名:<span>{{item.compatName}}</span></p>
                      <p>年龄:<span>{{item.compatAge}}</span></p>
                      <p>手机号:<span>{{item.compatMobile}}</span></p>
                      <p>身份证号:<span>{{item.compatIdcard}}</span></p>
    </div>
                  
    </my-panel>
    </div>
    </div>
  </div>
</template>

<script>
    import Api from "../../../lib/api.js";
    import AppHeader from "../../../components/business/app-header.vue";
    import MyPanel from "../../../components/business/panel.vue";
  export default {
    data() {
      return {
          patList:[]
      };
    },
    computed:{

    },
    components:{
        AppHeader,
        MyPanel
    },
    mounted() {
        Api("nethos.pat.compat.list",{token:window.localStorage['token']})
        .then((val)=>{
            console.log(val);
            this.patList=val.list;
        })
    },
    beforeDestroy() {

    },
    methods: {
        setPat(item){
            window.localStorage['compatInfo']=JSON.stringify(item);
            window.history.back();
        }

    }
  };
</script>

<style scoped lang="scss">
    .patInfo{
        p{
            color:black;
            padding-top:0.5rem;
        }
    }
    .panel{
        border:0.5px solid #cccccc;
    }
</style>
