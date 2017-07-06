<template>
  <div>
      <div class="weui-cell weui-cell_select"  :class="{'weui-cell_select-before':type=='left','weui-cell_select-after':type=='right'}">
          <div class="weui-cell__hd" v-if="type!='middle'">
              <label v-if="type=='right'">{{title}}</label> 
              <select class="weui-select" v-if="type=='left'" @change="setVal">
                  <option v-for="item in options" :selected="judge($index)">{{item}}</option>
    </select>
    </div>
          <div class="weui-cell__bd">
              <slot name="containing"><label v-if="type=='left'" class="weui-label">{{title}}</label></slot>
              <select class="weui-select" v-if="type!='left'" @change="setVal">
                <option v-for="(item,index) in options":selected="judge(index)" :value="item">{{item}}</option>
    </select>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
      props:{
          type:{
              type:String,
              default:"middle",
              required:false
          },
          title:{
              type:String,
              default:"",
              required:false
          },
          options:{
              type:Array,
              default:null,
              required:true
          },
          defaultVal:{
              type:Number,
              default:0,
              required:false
          }
      },
      data()
      {
          return{
              selectVal:""
          }
      },
      watch:{
          selectVal(){  
              this.$emit('update',this.selectVal);
          }
      },
      methods:{
          judge(val){
              return val==this.defaultVal;
          },
          setVal(val){
              
              this.selectVal=val.target.value;
          }
      }
  }
</script>

<style scoped lang="scss">

</style>
