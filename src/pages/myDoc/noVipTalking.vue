<template>
  <div id="onlinepage">
    <top>
      <div class="middle big">{{name}}</div>
    </top>
    <div class="wrap">

        <div  class="talk-detail" >
          <div class="rightMsg" v-for="item of msgList">
            <div class="floatImg">
              <img class="title" src="../../assets/logo.png" alt="">
            </div>
            <div class="floatRight">
              <div class="comment">
                {{item.msgText}}
              </div>
            </div>
          </div>

          <div class="leftMsg" >
            <div class="otherImg">
              <img class="otherTitle" src="../../assets/logo.png" alt="">
            </div>
            <div class="floatLeft">
              <div class="com">谢谢你的关注</div>
            </div>
          </div>


        </div>


      <div class="bottom">
        您暂时无法向医生发消息
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/business/app-header.vue'
  import Api from '../../lib/api'
  import editDiv from '../../lib/templete/editDiv.vue'
  var token  = localStorage.getItem('token')
  export default{
    components: {
      top,
      editDiv
    },
    data(){
      return {
        followId:null,
        name:'',
        msgList:[]
      }
    },
    mounted(){
      console.log(this.$route.params.id)
      this.$set(this.$data,'followId',this.$route.params.id)
      Api('nethos.follow.message.detail.list',{
        followId:this.followId,
        token:token,
        pageNo:1,
        pageSize:10
      }).then(req=>{
        console.log(req,111111)
        if(req.succ){
          this.$set(this.$data,'name',req.obj.sysDoc.docName)
          this.$set(this.$data,'msgList',req.list)

        }
      })
    },
    methods:{

    }
  }
</script>
<style scoped>
  #onlinepage{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .wrap{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .talk-detail{
    margin-top: 15px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }


  .rightMsg{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .leftMsg{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .floatRight{
    float: right;
    height: auto;
  }
  .floatLeft{
    float: left;
  }
  .floatImg{
    float: right;
    height: 30px;
  }
  .otherImg{
    float: left;
    height: 30px;
  }
  .title{
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 15px;
    padding-left: 5px;
  }
  .otherTitle{
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 15px;
    padding-right: 5px;
  }

  .input-msg input{
    height: 23px;
    width: 92%;
    margin-top: -12px;
    outline: none;
    border: none;
  }
  .input-msg a{
    text-decoration: none;
    width: 50px;
  }
  .input-msg a span{
    display: inline-block;
    background: greenyellow;
    width: 40px;
    text-align: center;
  }
  .comment {
    width: 150px;
    min-height: 30px;
    line-height: 30px;
    height: auto;
    position: relative;
    background: lawngreen;
    border-radius: 5px;
    word-wrap:break-word;
    word-break:break-all;
  }

  .comment:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    right: -16px;
    border: solid 8px;
    border-color: transparent transparent transparent lawngreen;
    font-size: 0;
  }
  .com {
    width: 150px;
    min-height: 30px;
    line-height: 30px;
    height: auto;
    position: relative;
    background: lawngreen;
    border-radius: 5px;
    word-wrap:break-word;
    word-break:break-all;
  }

  .com:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    left: -16px;
    border: solid 8px;
    border-color:  transparent lawngreen transparent transparent;
    font-size: 0;
  }
  .bottom{
    position: fixed;
    left: 0;
    bottom: 5px;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
</style>
