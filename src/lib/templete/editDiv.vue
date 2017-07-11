<template>
    <div contenteditable="true"
          @input="changeText" @click="test">
    </div>
</template>
<script>
  export default {
    props: ['value','message'],
    data(){
      return {innerText:this.value}
    },
    watch:{
      message(){
        this.$el.innerHTML="";
      }
    },
    methods:{
        test(){
            this.$emit("test");
        },
      changeText(){
        this.innerText = this.$el.innerText;
        var text = this.innerText.replace(/\ +/g,"");
        this.$emit('input',text);
      }
    }
  }
</script>
<style scoped>

</style>
