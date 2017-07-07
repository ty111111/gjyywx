<template>
  <div id="wrapper" ref="wrapper">
      <div id="scroller"  class="scroller"ref="scroller">
          <slot name="pullDown">
              <div id="pullDown" style="display:flex;flex-direction:row;justify-content:center;align-items:center"><div>下拉刷新</div></div>
    </slot>
          <slot name="containing"></slot>

          <div ref="supplement" style="height:0px;background-color:#F8F8F8" id="supplement"></div>
          <slot name="pullUp" v-if="hasRight">
              <div id="pullUp" ref="pullUp" style="text-align:center;" >正在加载</div>
    </slot>
    </div>
    </div>
</template>

<script>
    import {scrollprobe} from"./iscroll-probe.js";



  export default {
      mounted()
      {
          var that=this;
          document.getElementById("wrapper").style.top=this.top+'px';
          if(this.hasRight)
          {
              document.getElementById("pullUp").style.height=this.bottom+'px';
          }
          var overscroll = function(el){
		  el.addEventListener('touchstart', function(){
              var top = el.scrollTop;
              var totalScroll = el.scrollHeight;
              var currentScroll = top + el.offsetHeight;
              if(top === 0) {
            el.scrollTop = 1;   
              }else if(currentScroll === totalScroll){
                  el.scrollTop = top - 1;
              }
		});
		el.addEventListener('touchmove', function(evt){
			if(el.offsetHeight < el.scrollHeight||el.offsetWidth<el.scrollWidth){
				evt._isScroller = true;
			}
		});
	}
          var list=document.getElementsByClassName("scroller");
          for(let i =0;i<list.length;i++){
              overscroll(list[i]);
          }
          document.body.addEventListener('touchmove',this.myFun);
          setTimeout(that.load,20);


      },
      data()
      {
          return{
              myScroll:{},
              pullDownOffset:0,
              step:0,
              isShown:false,
              flag:false
          }
      },
      computed:{
          hasRight(){
              return eval(this.right);
          }
      },
      beforeDestroy(){
          console.log("delete");
          document.body.removeEventListener("touchmove",this.myFun);
      },
      props:
      {
          right:{
             type:String,
              default:"false",
              required:false
          },
          isCompleted:
          {
              type:Boolean,
              default:false,
              required:false
          },
          nothingMore:
          {
              type:Boolean,
              default:false,
              required:false
          }
          ,

          height:{
              type:String,
              default:"50",
              required:false
      },
          top:{
              type:String,
              default:"105",
              requried:false
          },
          bottom:{
              type:String,
              default:"30",
              required:false
          }
      },
      watch:
      {
          isCompleted()
          {

              if(this.isCompleted){
                  if(this.step==1)
                  {
                      this.myScroll.scrollTo(0,this.pullDownOffset,300);
                      document.getElementById("pullDown").innerHTML="下拉刷新";
                  }
                  else
                  {

                      if(this.nothingMore)
                      {
                          this.$refs.pullUp.innerHTML="无更多内容";
                      }
                  }
                  this.step=0;
                 setTimeout(()=>{this.step=0;},500);
                  setTimeout(()=>{this.refresh()},100);
              }
          }
      },
      methods:
      {
          myFun(evt){
             
              if(!evt._isScroller){
                  evt.preventDefault();
              }
          },
          refresh(){
            this.$refs.supplement.style.height=0+'px';
              let wrapperHeight=this.myScroll.wrapper.clientHeight;
              let scrollerHeight=this.myScroll.scroller.clientHeight;
              let tempHeight=wrapperHeight-scrollerHeight-this.pullDownOffset;
              if(this.hasRight){
                  tempHeight+=parseInt(this.bottom);
              }
              this.$refs.supplement.style.height=Math.max(tempHeight,0)+'px'
              if(this.$refs.supplement.style.height==0){this.isShown=true};
              this.myScroll.refresh();
          },
          load()
              {  
                  var pullUp=document.getElementById("pullUp");
                  var pullDown = document.getElementById('pullDown');
                  pullDown.style.height=this.height+'px';

                  this.pullDownOffset=-parseInt(this.height);
                  this.myScroll = new IScroll('#wrapper', {
                       useTranstion:true,
                       fadeScrollbars:true,
                       scrollY:true,
                       probeType:2,
                       startY:this.pullDownOffset,
                      momentum:false
                   });
                  this.refresh();
                  this.myScroll.scrollTo(0,this.pullDownOffset,300);
                  
                  this.myScroll.on("scrollEnd",()=>{
                      if(this.step==0)  {
                          
                          if(this.myScroll.y==0){
                              this.step=1;
                              pullDown.innerHTML="加载中";
                              setTimeout(()=>{this.$emit("pullDown");},200);
                          }                      
                          else if(this.myScroll.y==this.myScroll.maxScrollY&&this.hasRight){
                              this.step=2;
                              this.$emit("pullUp");
                          }
                          else if (this.myScroll.y>this.pullDownOffset){
                              this.myScroll.scrollTo(0,this.pullDownOffset,300);
                          }
                          
                      }
          
                });
                  
                  


          }
      }
  }
</script>

<style scoped lang="scss">

#wrapper {
    position: absolute;
    z-index: 1;
    bottom: 50px;
    left: 0;
    width: 100%;
    background: rgb(248, 248, 248);
    overflow: auto;
}

#scroller {
    background-color:rgb(248, 248, 248);
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 100%;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
}
</style>
