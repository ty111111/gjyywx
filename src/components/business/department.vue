<template>
<div class="app">
      <app-header>
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden; flex:1 1 auto">{{title}}</div>
    </app-header>
    <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-if="failure">
        <span class="weui-loadmore__tips">网络错误</span>
    </div>
  <div class="view" id="module" v-if="Got&&!failure">

      <div class="sidebar scroller" id="sidebar">
        <ul>
            <li v-for="(item,index) in departmentFilter" @click="changeDepartment(index)" :class="{'isChosed':checkIfChosed(index)}">

                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <p>{{item.deptName}}</p>
                        </div>
                        <div class="weui-cell__ft"></div>
                    </div>

    </li>
    </ul>
    </div>
      <div class="main scroller" id="main">
          <ul>
              <li v-for="item in subDepartment" :class="{'li-disabled':!item.hasScheme}">
    <a class="weui-cell weui-cell_access" href="javascript:;" @click="next(item)">
        <div class="weui-cell__bd">
            <p>{{item.deptName}}</p>
        </div>
        <div class="weui-cell__ft">
        </div>
    </a>
    </li>
    </ul>
    </div>
  </div>
    </div>
</template>

<script>
    import AppHeader from "../../components/business/app-header";
    import api from '../../lib/api.js';
  export default {
      data(){
          return{
              department:[{'name':'外科',id:'001',sub:[{'name':'a科室','src':''},{'name':'b科室','src':''}]},{'name':' 内科',id:'002',sub:[{'name':'c科室','src':''},{'name':'d科室','src':''}]},{'name':'儿科',id:'003',sub:[]}],
              subDepartment:[],
              isChosed:"",
              hospital:{hosName:"浙二医院"},
              departmentId:"",
              isAppt:false,
              Got:false,
              failure:false,
              title:""
          }
      },
      methods:{
          changeDepartment(index){
              console.log(index);
              let item=this.department[index];
              this.subDepartment=item.deptList;
              this.isChosed=index;
          },
          checkIfChosed(id){
              return id==this.isChosed;
          },
          next(item){
              let storage=window.localStorage;
              if (item.hasScheme){
                  storage["bookDeptId"]=item.bookDeptId;
                  storage["deptName"]=item.deptName;
                  storage["deptIndex"]=this.isChosed;
//                  storage["deptList"]=JSON.stringify(this.subDepartment);
                  let path="/service/book/doctor/"+item.bookDeptId;
                  this.$router.push({path:path,query:{key:this.key}});

              }
              else{
                  alert("该科室暂无号源");
              }
          }
      },
      components:{
          AppHeader
      },
      computed:{
        departmentFilter(){
            let department=this.department;
            return department.filter((item)=>{
                return item.deptList&&item.deptList.length>0
            });
        },
        key(){
            return (new Date()).valueOf();
        }
      },
      created(){


          
      },
      mounted(){
          let bookHosId=this.$route.params.id;
          if(window.localStorage["isAppt"]!=undefined){
            this.isAppt=window.localStorage["isAppt"];
          }
          var storage=window.localStorage;
          if (storage['hosName']){
              this.title=storage['hosName'];
          }
          else
          {
              api("nethos.book.hos.info",{bookHosId:bookHosId})
          .then((val)=>{
                this.title=val.obj.hosName;
          },
               ()=>{
                  this.failure=true;
                  this.Got=true;
              })}
          api("nethos.book.dept.list.scheme.state",{bookHosId:bookHosId})
          .then((val)=>{
              
              this.failure=false;
              this.department=val.list;
              this.Got=true;          
              let index=0;
              if(window.localStorage["deptIndex"]){
                  index=storage["deptIndex"];
//                  this.subDepartment=eval('('+storage["deptList"]+')');
              }
              this.changeDepartment(index);
          },
               ()=>{
              this.failure=true;
              this.Got=true;
          })
          
          

      }
  }
</script>

<style scoped lang="scss">
    ul
    {
        list-style-type:none;
    }
    #module{
        
        display:flex;
        flex-direction:row;
        align-items:stretch;

    }
    li{
        text-align:center;
        border-top:1px solid #CCCCCC;
        li-disabled{
            color:lightgrey;
        }
    }
    .li-disabled{
        color:lightgrey;
    }
    .sidebar
    {
        background-color:#F2F2F2;
        width:7rem;
        overflow-y: auto;
        border:1px solid #CCCCCC;

    }
    .main{
        flex: 1;
        overflow-y: scroll;
/*        -webkit-overflow-scrolling: touch;  */
        max-width: 13rem;
        border:1px solid #CCCCCC;

    }
    .isChosed
    {
        background-color:white;
    }
</style>
