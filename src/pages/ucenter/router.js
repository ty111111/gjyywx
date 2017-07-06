/**
 * Created by Administrator on 2017/6/6 0006.
 */
export default [{
  path: '/user/reg',
  component: resolve => {
    require(['./register/index.vue'], resolve)
  }
},
               {
                   path:'/user/doctorInfo',
                   component:resolve=>{
                       require(['../docArticle.vue'],resolve);
                   }
               },
               {
                   path:"/user/articleDetail/:id",
                   component:resolve=>{
                       require(['../articleDetail.vue'],resolve);
                   }
               },
               {
                   path:"/user/docComment/:id",
                   component:resolve=>{
                       require(['../docComment.vue'],resolve);
                   }
               }]
