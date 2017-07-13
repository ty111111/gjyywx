<template>
  <header style="display:flex;flex-direction:row">
    <slot name="left" >

      <div class="left" @click="back"><font><span>&#xe600;</span></font></div>

    </slot>
    <slot style="flex:1 1 auto"></slot>
    <slot name="right" >
      <div class="right"></div>
    </slot>
  </header>
</template>


<script type="text/ecmascript-6">

  export default {
    props: {},
    data() {
      return {};
    },
    computed: {},

    mounted() {

    },
    beforeDestroy() {

    },

    methods: {
      back(){
        this.$router.go(-1)
      }
    }

  };
</script>

<style scoped lang="scss">
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_33qiq29sp5y7gb9.woff') format('woff'),
  }
  span{
    font-family: 'iconfont';
    font-size: 18px;
  }
  $w:4rem;
  header{
    position: relative;
    height: 45px;
    line-height: 45px;
    background-color: white;
    display: flex;
flex: none;
   z-index:999;
    >.left,.right{
        flex:0 0 auto;
      width: $w;
    }
    div:nth-child(2){
      flex:1;
      text-align: center;
    }
  }

  .right{
    padding-right: 5px;
    color: #3CC51F;
          text-align:center;
  }
    .left{
        padding-left:1rem;
    }

</style>
