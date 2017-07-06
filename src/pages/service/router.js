/**
 * Created by Administrator on 2017/6/5 0005.
 */
import hospital from '../../components/business/hospital'
export default [{
  path: '/service/book',
  component: resolve => {
    require(['./book/index.vue'], resolve)
  },
    children:[
        {
        path:"/",
        component:resolve=>{
            require(['../../components/business/hospital.vue'],resolve)
        }
    },
    {
        path:'/service/book/department/:id',
        name:'department',
        component:resolve=>{
            require(['../../components/business/department.vue'],resolve)
        }
    },   
        {
        path:"/service/book/doctor/:id",
        name:'doctor',
        component:resolve=>{
            require(['../../components/business/doctor.vue'],resolve)
        }
    },
    {
        path:"/service/book/doctorInfo/:id",
        name:"doctorInfo",
        component:resolve=>{
            require(['../../components/business/doctorInfo.vue'],resolve)
        }
    },
    {
        path:"/service/book/reserve/:id",
        name:"reserve",
        component:resolve=>{
            require(['../../components/business/reserve.vue'],resolve)
        }
    },
    {
        path:"/service/book/info/:id",
        name:"info",
        component:resolve=>{
            require(['../../components/business/info.vue'],resolve)
        }
    }]
}
  , {
    path: '/service/paidui/',
    component: resolve => {
      require(['./paidui/index.vue'], resolve)
    }
  }
  , 
    {
    path:"/service/paidui/myQueue/:id",
     component:resolve=>{
         require(['./paidui/myQueue.vue'],resolve)
          }
      },
                
    {
    path: '/service/baogao',
    component: resolve => {
      require(['./baogao/index.vue'], resolve)
    }
  },
    {
    path: '/service/bind/:id',
    component: resolve => {
      require(['./bind.vue'], resolve)
    }
  }]
