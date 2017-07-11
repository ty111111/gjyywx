<template>
  <div class="app">
      <app-header>
          <p>检验报告</p>
    </app-header>
      <div class="hori">
          <div v-for="item in timeList" @click="setType(item)" :class="{'chosed':chosedItem==item}">
              {{item}}
    </div>
    </div>
      <div class="containing">
              <p class="title">XXX报告</p>
          <div class="tip"><p>张三</p><p class="right">2017-4-25  09:00</p></div>
          
    </div>
  </div>
</template>

<script>
    import AppHeader from "../../../components/business/app-header.vue";
  export default {
    data() {
      return {
          timeList:['一周内','三个月','半年内','一年内'],
          chosedItem:"一周内"

      };
    },
    computed:{

    },
    components:{
        AppHeader
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        setType(item){
            this.chosedItem=item;
        }

    }
  };
</script>

<style scoped lang="scss">
    .app{
        flex:1 1 auto;
        background:rgb(248,248,248);
    }
    .hori{
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
        margin:0.5rem;
        background:white;
        height:4rem;
        border:1px solid #ccc;
        box-shadow:0px 3px 0px #cccccc;
        p{
            &.title{
                padding:0 0.5rem;
                font-size:1.3rem
            }
        }
        div{
            display:flex;
            flex-direction:row;
            padding-top:0.5rem;
            p{
                flex:1 1 auto;
                font-size:0.77rem;
                color:#999999;
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
