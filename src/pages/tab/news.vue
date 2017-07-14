<template>
  <div class="viewpage view">
    <app-header>
      <div class="middle big">健康资讯</div>
    </app-header>

      <div class="horiScroller">
      <div class="nav scroller">
          <div v-for="(item,index) in typeList">
              <div><a class="small"@click="setChosedItem(index)" :class="{'Chosed':chosedIndex==index}">{{item.typeName}}</a></div>
    </div>
    </div>
    </div>
        <div class="weui-loadmore" v-show="!Got">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
    <scroll-fresh  @pullDown="pulldown" @pullUp="pullup":isCompleted="isCompleted" bottom="3rem"v-show="Got">
        <div slot="containing">

        <my-panel v-for="item in list[chosedIndex]" :key="item.newId" class="panel" @activate="getDetail(item)" >
            <img slot="picture" :src="item.imgUrl" style="height:4.375rem">
            <div slot="article" class="article">
                <h3>{{item.title}}</h3>
                <div style="overflow:hidden ;height:2.5rem;text-overflow:ellipsis;">
                <p>{{item.content}}</p>
    </div>
    </div>
    </my-panel>
    </div>
    </scroll-fresh>

  </div>
</template>
<script>
  import Api from "../../lib/api"
  import AppHeader from "../../components/business/app-header.vue"
  import ScrollFresh from "../../components/business/scroll-fresh.vue"
  import MyPanel from "../../components/business/panel";

  export default {
    data() {
      return {
          typeList:[],
          isCompleted:false,
          chosedIndex:0,
          list:{},
          Got:false 
      };
    },
    watch:{
        chosedIndex(){
            this.setInfo();
        }
    },
    computed: {
    },
    components: {
      AppHeader,

        ScrollFresh,
        MyPanel},

    mounted() {
        let lastIndex=window.localStorage['chosedIndex'];
        this._getData();

        Api("nethos.system.information.type.list",{})
        .then((val)=>{
            this.typeList=val.list;
            if(lastIndex && this.typeList[lastIndex]){
                this.chosedIndex=lastIndex;
            }
            setTimeout(()=>{this.update();},100);
        })


    },
    beforeDestroy() {
    },
    methods: {

        getDetail(item){
            window.localStorage["chosedIndex"]=this.chosedIndex;
            this.$router.push("/tab/detail/"+item.newId);
        },
        setChosedItem(index){
            this.chosedIndex=index;
        },
        async _getData(){
          let data=await Api("nethos.system.web.pat.index",{})
          //console.log(data);
        },
        pulldown(){
            this.update();
        },
        update(){
            Api("nethos.system.information.list",{typeId:this.typeList[this.chosedIndex].id})
            .then((val)=>{
                this.list[this.chosedIndex]=val.list;
                this.Got=true;
                this.isCompleted=true;
                setTimeout(()=>{
                    this.isCompleted=false;
                },100);
            })
        },
        pullup(){
            this.update();
        },
        setInfo(){
            if(!this.list[this.chosedIndex]){
                this.Got=false;
                this.update();
            }
            else{
                this.Got=true;
//                this.Got=false;
//                this.isCompleted=true;
                setTimeout(()=>{this.isCompleted=true;},10);
//                setTimeout(()=>{this.isCompleted=true;},300);
                setTimeout(()=>{
//                    this.Got=true;
                    this.isCompleted=false;
                },100);
            }

        }
    }
  };
</script>

<style scoped lang="scss">
    .nav{
        display:flex;
        flex-direction:row;  
        padding-top:0.625rem;
        height:3.125rem;
        div{
            padding-top:0.625rem;
            min-width:6.25rem;
            height:1.875rem;
            text-align: center;
            color:#999999;
            font-size:0.77rem;
            flex:1 1 auto;
            display:flex;
            flex-direction:column-reverse;
/*            vertical-align:bottom;*/
/*            position:relative;*/
/*            bottom:-10px;*/
            a{
                display:inline;
            }
        }
    }
    .horiScroller{
        background-color:white;
        border:1px solid silver;
        height:3.125rem;
        display:flex;
        flex-direction:column;
        width:100%;
        overflow-x:scroll;
    }
    .panel{
        border:1px solid silver;
        background-color:white;
        img.div{
            max-height:4.4rem;
        }
    }
    .article{
        margin-left:0.5rem;
    }
    .Chosed{
        font-size:0.875rem;
        color:black;
    }
    .footer{
        position: fixed;
    bottom: 0px;
    width: 100%;
    }
</style>
