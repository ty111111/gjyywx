<template>
  <div >
      <div class="mask">
        <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
          <div class="option" v-show="Got">
                  <div class="weui-msg" v-if="isSucc">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <p class="weui-msg__desc">绑定成功，您的病案号是</p>
        </div>
    </div>
                  <div class="weui-msg" v-else>
        <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <p style="font-size:20px">绑定失败</p><br>
            <p class="small">若该就诊人曾在浙二就诊过，请保证姓名、身份证号、手机和医院留的一致；</p><br>
            <p class="small">如真实信息发生变化请前往医院修改。</p><br>
            <a  style="color:#00CC99" @click="lastPage">我知道了</a>
        </div>
    </div>
        </div>
  </div>

    </div>
</template>

<script>
    import api from "../../lib/api.js";
  export default {
    data() {
      return {
          isSucc:true,
          Got:false
      };
    },
    computed:{

    },
    components:{

    },
    mounted() {
        console.log(window.localStorage['token']);
        api("nethos.book.compat.bind",{compatId:this.$route.params.id,token:window.localStorage['token']})
        .then((val)=>{
            this.Got=true;
            if(!val.succ){
                this.isSucc=false;
            }
        })
        
    },
    beforeDestroy() {

    },
    methods: {
        lastPage(){
            window.history.back();
            //let src=window.localStorage['backSrc']||"/service/book/";
            //this.$router.push(src);
        }

    }
  };
</script>

<style scoped lang="scss">
    .mask{
        padding-top:30%;
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
        background-color:white;
        margin-top:5%;
        width:80%;
        box-shadow: 2px 5px 5px lighten(black,40%);
        
    }
    .small{
        font-size:0.77rem;
    }
</style>
