<template>
<div>

<div class="weui-cell" :class="{'weui-cell_warn':isWarned}">
    <div v-show="title||hasLeft" class="weui-cell__hd">
        <slot name="left"><label  for="" class="weui-label">{{title}}</label></slot>
    </div>
    <div class="weui-cell__bd">
        <input class="weui-input" type="text" v-if="myType=='text'"v-model="inputData" :placeholder="placeholder" @blur="validate">
        <input class="weui-input" type="password" v-model="inputData" v-if="myType=='password'":placeholder="placeholder">

    </div>
    <div class="weui-cell__ft"v-show="isWarned">
        <i class="weui-icon-warn"></i>
    </div>
    <div class="weui-cell__ft" v-show="hasRight">
        <slot name="right"></slot>
    </div>
    </div>
    <div v-show="(warningWord||hasBottom)">
    <slot name="bottom"><div class="weui_cells_tips">{{warningWord}}</div></slot>
    </div>
</div>
</template>

<script>
export default {    
  props: {
      hasBottom:
      {
          type:Boolean,
          default:false,
          required:false
      },
      hasRight:
      {
          type:Boolean,
          default:false,
          required:false
      },
      hasLeft:
      {
          type:String,
          default:"false",
          required:false
      },

      title:
      {
          type:String,
          required:false,
          default:null
      },
      type:
      {
          type:String,
          required:false,
          default:"text"
      },
      placeholder:
      {
          type:String,
          required:false,
          default:""
      },
      pattern:
      {
          type:String,
          required:false,
          default:"/.*$/"
      },
      warningWord:
      {
          type:String,
          required:false,
      },
      value:{
          type:String,
          required:false,
          default:""
      },
  },
    data()
    {
        return {
            mySelected:this.selected,
            isWarned:false,
            inputData:this.value
        }
    },
    computed:
    {
        myType()
        {
            return this.type;
        },
        reg()
        {
            return eval(this.pattern);
        }
    },



    watch:
    {
        inputData(value)
        {
            this.$emit("update",value);
        },
        
        selected(value)
        {
            this.mySelected=value;
            console.log(this.mySelected);
        }
    },
    methods:
    {
        check(value)
        {
            alert(value);
        },
        validate()
        {
            this.isWarned=this.reg.test(this.inputData)?false:true;
        }
    }
}
</script>
