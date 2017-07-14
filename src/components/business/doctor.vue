<template>
<div class="view app">
      <app-header>
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden; flex:1 1 auto">{{title}}</div>
    </app-header>
    <div class="buttonArea" v-if="isAppt" >
        <div style="font-size:0px">
            <button @click="changeMode('doctorBased')" class=" weui-btn weui-btn_mini weui-btn_primary button" :class="{'clicked':isDoc}" style="border-radius:0.625rem 0 0 0.625rem"><p>按专家预约</p></button>
            <button @click="changeMode('dateBased')" class='button weui-btn weui-btn_mini weui-btn_default ' :class="{'clicked':!isDoc}"style="border-radius:0 10px 10px 0"><p>按日期预约</p></button>
    </div>
    </div>      
    <div class="time" v-if="!isDoc&&isAppt">
          <div class="scroller">
          <div v-for="item in timeList" @click="dateChange(item)" class="timeItem":class="{'clicked':checkIfClicked(item)}">
              {{item.day}}<br>
              {{item.date}}
    </div>
    </div>
    </div>
            <div class="weui-loadmore weui-loadmore_line" v-show="failure">
                <span class="weui-loadmore__tips">网络错误</span>
    </div>
  <div  id="module" class="app" v-show="Got">

    <div class="weui-loadmore weui-loadmore_line" v-show="!failure&&noInfo1&&noInfo2">
        <span class="weui-loadmore__tips">暂无号源</span>
    </div>
      <div class="appoint">
<div class="weui-cells">
    <a v-for="item in normalAppoint"class="weui-cell weui-cell_access" href="javascript:;" @click="next(item)">
        <div class="weui-cell__hd">
            <div style="background-image:url(./../../../static/img/u6883.png)" class="figure img">
                <p>普通</p><p>门诊</p>
    </div>
    </div>
        <div class="weui-cell__bd">
            <span class="big">{{item.name}}</span><br><br v-show="!isDoc">
            <div style="color:#666666">
            <p v-if="isDoc" class="font-hide" style="width:10rem;">{{item.hospital}}<br></p>
            <span v-if="isDoc">{{item.deptName}}</span>
            <span v-else>{{item.year}}-{{item.schemeDate}} {{item.schemeAmpm}} 普通</span>
    </div>
            
        </div>
                  <div :class="{'font-warn':item.status=='已满'}">
                <div v-if="isDoc" class="weui-cell__ft" >{{item.status}}</div>
                  <div v-else><div style="text-align:right">{{item.status}}</div><br>
                      <div  v-if="item.status=='预约'" style="color:#FFCC00">{{item.bookFee}}.0元</div>
    </div>
    </div>
    </a>

</div>
    </div>
      <div class="doctor">
          <div class="weui-cells">
              <a v-for="item in expert" class="weui-cell weui-cell_access" @click="next(item)">
                  <div class="weui-cell__hd">
                    <img :src="item.pic"class="figure" onerror="this.src='../../../static/img/u6883.png'"alt="暂无图像">

    </div>
                  <div class="weui-cell__bd">
                      <span class="big">{{item.name}}</span><br v-show="isDoc">
                      <div  style="color:#666666">
                      <span>  {{item.title}}</span>
                      <p class="font-hide"style="max-width:9rem;">{{item.description}}</p>
                      <span v-if="!isDoc">{{item.year}}-{{item.schemeDate}} {{item.schemeAmpm}} 专家</span>
    </div>
                      

    </div>
                  <div :class="{'font-warn':item.status=='已满'}">
                <div v-if="isDoc" class="weui-cell__ft" >{{item.status}}</div>
                  <div v-else><div style="text-align:right">{{item.status}}</div><br>
                      <div  v-if="item.status=='预约'" style="color:#FFCC00">{{item.bookFee}}.0元</div>
    </div>
    </div>
    </a>
    </div>
    </div>
  </div>
    <div class="background" v-if="isShown"@click="isShown=false;this.failure=false">

    </div>
        <transition name="fad">

        <div class="options" v-if="isShown">
            <div class="weui-loadmore" v-show="!Got">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>               

            <div  v-show="Got&&!failure" class="popup">
                <div>
                <p class="small">{{chosedItem.year}}-{{chosedItem.schemeDate}}
                    {{chosedItem.week}} {{chosedItem.schemeAmpm}}</p>
                <p class=" weui-msg__desc small">号源时段以医院实际情况为准</p>
    </div>
                <div style="overflow:auto;">
                <ul>
                    <li v-for="item in filteredBookList" @click="reserve(item)"> 
                        <a class="small">{{item.index}}号 {{item.hour}}:{{item.minute}}-{{item.newHour}}:{{item.newMinute}}</a>
    </li>
    </ul>
    </div>
    </div>
            
    </div>
    </transition>
    <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    </div>
</template>

<script>
    import api from '../../lib/api.js';
    import AppHeader from "../../components/business/app-header";
  export default {
    data() {
      return {
          hosName:"",
          timeList:[{},{},{},{},{},{},{}],
          appoint:[],
          res:[],
          dateBased:[],
          doctorBased:[],
          isDoc:false,
          data:[],
          filterChoice:"",
          doctorList:[],
          bookList:[],
          dept:{},
          isAppt:true,
          isShown:false,
          chosedItem:{},
          Got:false,
          noInfo1:true,
          noInfo2:true,
          week:["周日","周一","周二","周三","周四","周五","周六","周日"],
          failure:false,
          title:""
      };
    },
    computed:{
        normalAppoint(){
            var res=this.data.filter((item)=>{
                return item.name=="普通号"&&(this.isDoc||item.year+"-"+item.schemeDate==this.filterChoice);
            });
            this.noInfo1=true;
            if (res.length>0){
                this.noInfo1=false;
            }
            return res;
            
        },
        expert(){
            var res=this.data.filter((item)=>{
                return item.name!="普通号"&&(this.isDoc||item.year+"-"+item.schemeDate==this.filterChoice);
            });
            this.noInfo2=true;
            if (res.length>0){
                this.noInfo2=false;
            }
            return res;
            
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
        AppHeader
    },
      
    mounted() {
        
        this.setHeight();
        
    },
    beforeDestroy() {

    },
    methods: {
        reserve(item)
        {
            window.localStorage['time']= item.hour+':'+item.minute+'-'+item.newHour+':'+item.newMinute;
            window.localStorage['last']="/service/book/doctor/"+this.dept.bookDeptId;
            this.$router.push({path:"/service/book/reserve/"+item.bookNumId+"&"+this.dept.bookHosId,query:{key:this.key}});
        },
        check(item)
        {
            console.log(item.event.target);
        },
        update(){
            let weekList=["无","停诊","已满","即将","预约"];
            for(let i=0;i<this.res.length;i++){
               let temp=new Object();
                let name=this.res[i].docName;
                let pic=this.res[i].docAvatar;
                let description=this.res[i].docDescription;
                let deptName=this.res[i].deptSchemeList[0].deptName;
                if (!description)
                    {
                        name=this.res[i].deptSchemeList[0].docName;
                    }
                let status=weekList[this.res[i].schemeStatus];
                let hospital=this.res[i].hosName;
                let docName=this.res[i].docName;
                let bookDocId=this.res[i].bookDocId;
                let title=this.res[i].docTitle;
                var newNode={name:name,pic:pic,description:description,scheme:this.res[i].deptSchemeList,hospital:hospital,deptName:deptName,status:status,bookDocId:bookDocId,title:title};
                this.doctorBased.push(newNode);
                let scheme=this.res[i].deptSchemeList[0].schemeList;
                for(let j=0;j<scheme.length;j++){
                    let bookFee=scheme[j].bookFee;
                    let bookSchemeId=scheme[j].bookSchemeId;
                    let status=weekList[scheme[j].schemeStats];
                    let schemeAmpm=scheme[j].schemeAmpm=="am"?"上午":"下午";
                    let schemeDate=scheme[j].schemeDate;
                    let week=this.week[scheme[j].weekNo];
                    let date=new Date(schemeDate);
                    let month= ("0" + (date.getMonth() + 1)).slice(-2);
                    let day=("0" + (date.getDate())).slice(-2);
                    let year=date.getFullYear();
                    schemeDate=month+'-'+day;
                    var newNode={name:name,description:description,bookFee:bookFee,status:status,schemeAmpm:schemeAmpm,schemeDate:schemeDate,pic:pic,title:title,year:year,bookSchemeId:bookSchemeId,week:week};
                    this.dateBased.push(newNode);
                }
            
                
            }
            this.Got=true;
            this.failure=false;
            this.data=this.dateBased;
        },
        dateChange(item){
            this.filterChoice=item.year+"-"+item.date;
        },
        checkIfClicked(item){
            return item.year+'-'+item.date==this.filterChoice;
        },
        changeMode(val){
            this.data=val=="doctorBased"?this.doctorBased:this.dateBased;
            this.isDoc=val=="doctorBased"?true:false;
            this.setHeight();
        },
        next(item){
            if(item.status!="预约"){
                return;
            }
            if(!this.isDoc){
                this.bookList=[];
                this.isShown=true;
                this.chosedItem=item;
                this.Got=false;
                api("nethos.book.num.list",{bookSchemeId:item.bookSchemeId})
                .then((val)=>{
                    let storage=window.localStorage;
                    storage['hosName']=this.hosName;
                    storage['deptName']=this.dept.deptName;
                    storage['bookFee']=item.bookFee;
                    storage['date']=item.year+"-"+item.schemeDate;
                    storage['Ampm']=item.schemeAmpm;
                    storage['name']=item.name;
                    this.bookList=val.list;
                    this.Got=true;
                },
                     ()=>{
                    this.Got=true;
                    this.failure=true;
                })
                
            }
            else{
                if (item.bookDocId!=undefined){
                    this.$router.push("/service/book/doctorInfo/"+item.bookDocId+"&"+this.dept.bookDeptId+'&'+encodeURI(this.dept.deptName));
                }
                else{
                    this.$router.push("/service/book/doctorInfo/"+item.bookDocId+"&"+item.scheme[0].bookDeptId+'&'+this.dept.bookDeptId+'&'+encodeURI(this.dept.deptName));

                }
            }
        }

    },
    created(){
        if(!eval(window.localStorage['isAppt'])){
            this.isAppt=false;
        }
        let bookDeptId=this.$route.params.id;
        api("nethos.book.dept.info",{bookDeptId:bookDeptId })
        .then((val)=>{
            this.dept=val.obj;
            this.title=this.dept.deptName;  
        });
        api("nethos.book.doc.list.scheme.list",{bookDeptId:bookDeptId })
        .then((val)=>{
            if(val.list[0]){
                this.hosName=val.list[0].hosName;
            }
            console.log(val);
            this.res=val.list;
            this.update();
        },
             ()=>{
            this.failure=true;
            this.Got=true;
        });
        
        
        /**获取当前时间**/
        let date=new Date();
        let week=["周日","周一","周二","周三","周四","周五","周六","周日"];
        for(let i =0;i<7;i++){
            this.timeList[i].day=week[date.getDay()];
            let month= ("0" + (date.getMonth() + 1)).slice(-2);
            let day=("0" + (date.getDate())).slice(-2);
            let year=date.getFullYear();
            var newNode={day:week[date.getDay()],date:month+'-'+day,year:year};
            this.timeList[i]=newNode;
            date.setDate(date.getDate()+1);
        }
        this.filterChoice=this.timeList[0].year+"-"+this.timeList[0].date;
        
    }
  };
</script>

<style lang="scss">
    $info:#3399FF;
    
    #module{
        display:flex;
        flex-direction:column;
        overflow:auto;
    }
    
    .buttonArea{
        flex: 0 0 auto;
        display:flex;
        justify-content: center;
        width:100%;
        height:3.75rem;
        background: white;
    }
    .time{
        flex:0 0 auto;
        background-color:white;
        overflow-x:auto;
        min-height:3.125rem;
        .scroller{
            display:flex;
            flex-direction:row;
            width:140%;
        div{
            border-right:1px solid #CCCCCC;
            border-top:1px solid #cccccc;
            border-bottom:1px solid #cccccc;
            min-width:3.125rem;
            height:3.125rem;
        }
        }
    }

    .timeItem{
        text-align:center;
        width:20%;
    }
    .options{
        position:fixed;
        bottom:0px;
        left:0px;
        background-color:white;
        width:100%;
        height:18.75rem;
        z-index:1001;
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
        height:0;
    }
    
    .weui-btn.button{
        color:$info;
        background-color:white;
        border:1px solid $info;
        height:2rem;
        margin:0px;
        padding:0px;
        width:6.4rem;
        &:active{
            background-color:#3399FF;
            color:white;
        }
        &.clicked{
            background-color:#3399FF;
            color:white;
        }
    }
    .clicked{
            background-color:#3399FF;
            color:white;
        }
    .img{
        background-repeat:no-repeat;
        background-size:101%;
        font-size:0.77rem;
        p{
            height:1.875rem;
            padding-left:.7rem;
            padding-top:.3rem;
        }
    }
    .popup{
        padding:1rem;
        display:flex;
        flex-direction:column;
        height:18.75rem;
    }
    .small{
        font-size:0.77rem;
    }

</style>
