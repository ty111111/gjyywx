<template>
<div style="flex:1 1 auto;display:flex;flex-direction:column">
  <div id="onlinepage">
    <top  id="header">
      <div class="middle big">{{consult.docName}}</div>
      <span slot="right" class="step" @click="cancelApply">{{msg}}</span>
    </top>
    <div class="titleHeader">
      {{consult.consultStatusDescription}}
    </div>
    <div class="test">
      <chat  :message ='obj' :id="consultId" v-on:send="getData">
      </chat>
    </div>
    <div class="btn" v-show="consult.consultStatus=='NEEDPAY'">
      <a href="javascript:;" class="weui-btn weui-btn_primary">付款</a>
    </div>
    </div>
<div id="supplement">
    </div>
    </div>
</template>
<script >
  import top from '../../components/business/app-header.vue'
  import Api from '../../lib/api'
  import editDiv from '../../lib/templete/editDiv.vue'
  import chat from '../../lib/templete/chat.vue'
  import Ajax from '../../lib/ajax'
  var token = localStorage.getItem('token')
  export default{
    components: {
      top,
      editDiv,
      chat
    },
    data(){
      return {
        consultId:'',
        consult:{},
        text:'',
        msg:'',
        talkList:[],
        clean:true,
        attaList:[],
        attaIdList:[],
        obj:{}
      }
    },
    mounted(){
      this.$set(this.$data,'consultId',this.$route.params.consultId);
      this.getData()
    },
    methods:{
        
        setHeight(flag){
            if(flag){
            document.getElementById("supplement").style.height=300+"px";
            document.documentElement.scrollTop=0+'px';
            document.body.scrollTop=0+'px';
            document.documentElement.style.overflow="hidden";
            console.log(document.body.offsetHeight);
//            this.$refs.containing.style.overflow="hidden";
//            document.documentElement.scrollTop=document.documentElement.scrollHeight-document.documentElement.offsetHeight+20+"px";
            }
            else{
                document.getElementById("supplement").style.height=0+'px';
                
            }
        },
      getData(){
        Api('nethos.consult.info.detail',{
          token:token,
          consultId:this.consultId,
          pageNo:1,
          pageSize:10
        }).then(req=>{
          if(req.succ){
            console.log(req,9999)
//            var obj = req.obj.consult;
            var list = req.obj.messageList;
            this.$set(this.$data,'consult',req.obj.consult);
//              this.$set(this.$data,'talkList',list);
//              this.$set(this.$data,'attaList',req.obj.attaList);
            this.$set(this.$data,'obj',req.obj);

            if(list.length==0){
              this.$set(this.$data,'msg','取消申请');
            }else {
              this.$set(this.$data,'msg','结束咨询');
            }
          }
        })
      },

      cancelApply(){
        var url = this.consult.consultTypeName=='全科分诊'?'nethos.consult.info.pic.cancel':'nethos.consult.info.docpic.cancel';
        var self = this;
        weui.confirm(self.msg, {
          title: '我们将为你'+self.msg,
          buttons: [{
            label: '暂不取消',
            type: 'default',
            onClick: function(){ }
          }, {
            label: '确定取消',
            type: 'primary',
            onClick: function(){
              if(self.talkList.length>0){
                Api('nethos.consult.info.complete',{
                  token:token,
                  consultId:self.consultId
                }).then(req=>{
                  if(req.succ){
                    console.log(456)
                    self.$router.push({
                      name:'myInquiry'
                    })
                  }else {
                    weui.alert(req.msg)
                  }
                })
              }else {
                Api(url,{
                  token:token,
                  consultId:self.consultId
                }).then(req=>{
                  if(req.succ){
                    console.log(123)
                    self.$router.push({
                      name:"myInquiry"
                    })
                  }else {
                    weui.alert(req.msg)
                  }
                })
              }

            }
          }]
        });
      },
        cancel(){
          this.$set(this.$data,'checkList',false)
        }
    }
  }
</script>
<style scoped>
    #supplement{
        
        flex:0 0 auto;
        height:0px;
        width:100%; 
    }
    #header{
        flex:0 0 auto;
    }
  .step {
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
  #onlinepage{
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
  .test{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    /*margin-bottom: 50px;*/
  }
/*
    .test2{
        overflow:auto;
        display:flex;
        flex-direction:column;
        flex
        
    }
*/
  .titleHeader{
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    box-sizing: border-box;
    padding: 5px;
    background: white;
    text-align: center;
    flex: 0 0 auto;
  }

  .btn{
    position: fixed;
    left: 0;
    bottom: 25px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
  }


</style>
