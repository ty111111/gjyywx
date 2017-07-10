<template>
  <header style="display:flex;flex-direction:row">
    <slot name="left" >

      <div class="left" @click="back" style="flex:0 0 auto;width:4rem"><font>返回</font></div>

    </slot>
    <slot style="flex:1 1 auto"></slot>
    <slot name="right" >
      <div class="right"style="flex:0 0 auto;width:4rem"></div>
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
  $w:45px;
  header{
    position: relative;
    height: 45px;
    line-height: 45px;
    background-color: white;
    display: flex;
flex: none;
   z-index:999;
    >.left,.right{
      text-align: center;
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
  }

</style>
