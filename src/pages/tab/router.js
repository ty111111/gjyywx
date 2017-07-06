/**
 * Created by Administrator on 2017/6/5 0005.
 */
import News from "./news.vue";
import Detail from './detail.vue';
export default [{
  path: '/tab',
  component: resolve => {
    require(['./index.vue'], resolve)
  },
  children:[{
    path:"news",
    component:News
  },
    {
    path:"detail/:id",
    component:Detail
  }       ]
}
];
