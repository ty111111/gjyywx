<template>
  <div class="view app">
      <app-header>
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden; flex:1 1 auto">{{title}}</div>
    </app-header>
        <div class="weui-loadmore" v-show="!Got">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
      <div class="weui-loadmore weui-loadmore_line" v-show="failure">
          <span class="weui-loadmore__tips">网络错误</span>
    </div>
      <div class="app"v-show="Got&&!failure">
      <div>
      <myPanel class="weui-cells">
          <img class="figure"slot="picture" :src="doctorInfo.docAvatar">
          <div slot="article">
              <p>{{doctorInfo.docName}}
                  <span >{{doctorInfo.docTitle}}</span></p>
              <p  class="font-hide" style="width:9rem">{{hospitalName}}</p>
              <p class="small" style="color:#999999">{{deptName}}</p>
              

    </div>
    <span slot="ft">在线问诊</span>
    </myPanel>
          
    </div>
      <div class="weui-cells">
          <MySelect :options="deptList" @update="update" v-show="deptList.length>0"></MySelect>
          <div class="weui-cell" style="display:flex;flex-direction:row" v-for="scheme in filteredSchemeList">
              <div >
                    {{scheme.time|getMyDay}}
                      {{scheme.Ampm}}
                      {{scheme.week}}
    </div>
              <div class="flex">
    </div>
              <div v-if="scheme.status=='预约'">
                  <a class="weui-btn weui-btn_mini weui-btn_default" style="background:white" @click="next(scheme)"><p>{{scheme.status}} {{scheme.bookFee}}.0元</p></a>
    </div>
              <div v-if="scheme.status!='预约'" style="width:3rem">
              <span  class="font-warn">{{scheme.status}}</span>
    </div>
    </div>
    </div>
      <div v-show="isDoctor">
          <div class="weui-cells__title" v-show="deptSchemeList.length>0"><p>该医生坐诊的其他科室:</p></div>
      <div class="weui-cells">
          
          <myPanel v-for="item in deptSchemeList" @activate="anotherDept(item)" :key="item.bookDeptId">
              <div slot="picture"><p>{{item.deptName}}</p></div>
    </myPanel>
    </div>
      <div class="weui-cells__title">医生擅长</div>
      <div class="weui-cells">
          <div class="weui-cell">
              <p>{{doctorInfo.docDescription}}</p>
    </div>
    </div>
    </div>

</div>
    <div class="background" v-if="isShown"@click="isShown=false;failure=false">

    </div>
        <transition name="fad">
            <div class="options" v-if="isShown">
                <div class="weui-loadmore" v-show="!Got">
                    <i class="weui-loading"></i>
                    <span class="weui-loadmore__tips">正在加载</span>
                </div>
                <div class="weui-loadmore weui-loadmore_line" v-show="failure">
                    <span class="weui-loadmore__tips">网络错误</span>
                </div>
                <div v-show="Got&!failure" class="popUp">
                    <div>
                    <p class="small">{{chosedItem.time | getMyDay}}  {{chosedItem.week}}  {{chosedItem.Ampm}}</p>
                    
                    <p class="weui-msg__desc small">号源时段以医院实际情况为准</p>
    </div>
                    <div class="overflow">
                    <ul>
                        <li v-for="item in filteredBookList" @click="reserve(item)"> 
                            <a>{{item.index}}号 {{item.hour}}:{{item.minute}}-{{item.newHour}}:{{item.newMinute}}</a>
                        </li>
                    </ul>
    </div>
    </div>
            
            </div>
        </transition>
    </div>
</template>

<script>
    import MySelect from './select';
    import MyPanel from './panel';
    import api from '../../lib/api.js';
    import {getMyDay} from "../../lib/filter.js";
    import AppHeader from '../../components/business/app-header';
  export default {
    data() {
      return {
          doctorInfo:{},
          hospitalName:"",
          deptSchemeList:[],
          deptName:"",
          deptList:[],
          schemeList:[],
          table:{},
          chosedDeptName:"",
          bookDocId:"",
          isDoctor:false,
          isShown:false,
          chosedItem:{},
          bookList:[],
          Got:false,
          failure:false,
          title:""
      };
    },
    filters:{
        getMyDay
    },
    created(){
        let tempList=this.$route.params.id.split('&');
        if(tempList[0]!="undefined"){
            this.isDoctor=true;
            this.bookDocId=tempList[0];
            let bookDeptId=tempList[1];
            this.deptName=decodeURI(tempList[2]);
            api("nethos.book.doc.scheme.list",{bookDocId:this.bookDocId})
            .then((val)=>{
                this.getData(val,bookDeptId);
            },
                 ()=>{
                console.log("failed");
                this.failure=true;
                this.Got=true;
            });
        }
        else{
            var id=tempList[1];
            let bookDeptId=tempList[2];
            this.deptName=decodeURI(tempList[3]);
            api("nethos.book.doc.normal.scheme.list",{bookDeptId:id})
            .then((val)=>{
                this.getData(val,bookDeptId);
            },
                 ()=>{
                this.failure=true;
                this.Got=true;
                console.log("failed");
            })
        }
        
    },
    computed:{
        filteredSchemeList(){
            return this.schemeList.filter((item)=>{
                return item.bookDeptId==this.table[this.chosedDeptName];
            })
        },
        filteredBookList(){
            var list=[]
            for(let i=0;i<this.bookList.length;i++){
                var newNode=new Object();
                var date=new Date(this.bookList[i].numTime.replace(/\-/g, "/"));
                newNode.hour=("0" + (date.getHours())).slice(-2);
                newNode.minute=("0" + (date.getMinutes())).slice(-2);
                date.setMinutes(date.getMinutes()+20);
                newNode.newHour=("0" + (date.getHours())).slice(-2);
                newNode.newMinute=("0" + (date.getMinutes())).slice(-2);
                newNode.index=i+1;
                newNode.bookNumId=this.bookList[i].bookNumId;
                list.push(newNode);
            }
            return list;
        },
        key(){
            return (new Date()).valueOf();
        }

    },
    components:{
        myPanel:MyPanel,
        MySelect,
        AppHeader
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        next(item){
            console.log(item);
            this.isShown=true;
            this.chosedItem=item;
            this.Got=false;
            api("nethos.book.num.list",{bookSchemeId:item.bookSchemeId})
            .then((val)=>{
                let storage=window.localStorage;
                storage['hosName']=this.hospitalName;
                storage['deptName']=this.deptName;
                storage['bookFee']=item.bookFee;
                storage['date']=item.time;
                storage['Ampm']=item.Ampm;
                storage['name']=this.doctorInfo.docName;
                this.bookList=val.list;
                this.Got=true;
            },
                 ()=>{
                this.failure=true;
            })
        },
        reserve(item){
            window.localStorage['time']= item.hour+':'+item.minute+'-'+item.newHour+':'+item.newMinute;
            window.localStorage['last']="/service/book/doctorInfo/"+this.$route.params.id;
            this.$router.push({path:"/service/book/reserve/"+item.bookNumId+"&"+this.doctorInfo.bookHosId,query:{key:this.key}});
        },
        getTime(str){
            let date=new Date(str);
            let month= ("0" + (date.getMonth() + 1)).slice(-2);
            let day=("0" + (date.getDate())).slice(-2);
            let year=date.getFullYear();
            return year+"-"+month+"-"+day;
        },
        update(val){
            this.chosedDeptName=val;
        },
        anotherDept(item){
            this.$router.push("/service/book/doctor/"+item.bookDeptId);
        },
        getData(val,bookDeptId){
                this.doctorInfo=val.obj;
                if(!this.doctorInfo.docAvatar){
                    this.doctorInfo.docAvatar=require("../../../images/u6883.png");
                }
            console.log(val.obj);
                this.hospitalName=this.doctorInfo.hosName;
                this.title=this.doctorInfo.docName;
                this.deptSchemeList=val.obj.deptSchemeList.filter((item)=>{
                    return item.deptName!=this.deptName;
                });
                console.log(this.deptSchemeList);
                var weekList=["周一","周二","周三","周四","周五","周六","周日"];
                var statusList=["无","停诊","已满","即将","预约"];
                for(let i=0;i<this.deptSchemeList.length;i++){
                    this.deptList.push(this.deptSchemeList[i].deptName);
                    let list=this.deptSchemeList[i].schemeList;
                    for(let j=0;j<list.length;j++){
                        var temp=new Object();
                        temp.time=list[j].schemeDate;
                        temp.Ampm=list[j].schemeAmpm=="am"?"上午":"下午";
                        temp.week=weekList[list[j].weekNo-1];
                        temp.status=statusList[list[j].schemeStats];
                        temp.bookDeptId=this.deptSchemeList[i].bookDeptId;
                        temp.bookFee=list[j].bookFee;
                        temp.bookSchemeId=list[j].bookSchemeId;
                        this.schemeList.push(temp);

                    }
                    this.table[this.deptSchemeList[i].deptName]=this.deptSchemeList[i].bookDeptId;
                    if(i==0){
                        this.chosedDeptName=this.deptSchemeList[i].deptName;
                    }
                }
            this.Got=true;
        }

    }
  };
</script>

<style scoped lang="scss">
    .figure
    {
        width:3.75rem;
        margin-right:.3rem;
        display:block;
        border-radius:50%;
    }
    .background{
        position:fixed;
        left:0px;
        top:0px;
        z-index:30;
        background-color:gray;
        height:100%;
        width:100%;
    }
    .options{
        position:fixed;
        bottom:0px;
        left:0px;
        background-color:white;
        width:100%;
        height:18.75rem;
        z-index:31;
        ul{
            text-align:center;
            li{
                margin-top:1.875rem;
            }
        }
    }
    .fad-enter-active, .fad-leave-active {
      transition: height .5s
    }
    .fad-enter, .fad-leave-to{
        height:0px;
    }
    .small{
        font-size:0.75rem;
    }
    .popUp{
        display:flex;
        flex-direction:column;
        height:18.75rem;
        .small{
            font-size:0.75rem;
            padding:0.3rem 0 0 0.625rem;
        }
        a{
            font-size:0.75rem;
        }
    }
</style>
