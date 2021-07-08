<template>
  <div class="header">
    <div class="header-tab" ref="headerTab">
      <ul ref="tabItem">
        <li
            v-for="(item, index) in listArray"
            :key="index"
            :class="index === current ? 'active-header' : ''"
            @click="getTab(index, $event)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
<!--    <div class="header-search">
      <slot name="header-tab-img"></slot>
    </div>-->
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "HeaderTab",
  props: {
    listArray: {
      type: Array,
    },
    current:{
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      gapX: 0,
      startX: 0,
    };
  },
  mounted() {
    this.$nextTick(_ => {
      const el = this.$refs.tabItem
      const boxEl = this.$refs.headerTab
      $(el).bind("mousedown", start);

      function start(event){
        if(event.button === 0){//判断是否点击鼠标左键
          this.gapX = event.clientX;
          this.startX = $(boxEl).scrollLeft();  // scroll的初始位置

          // mousemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的
          $(el).bind("mousemove", move);
          // 此处的$(document)可以改为obj
          $(el).bind("mouseup", stop);
        }
        return false;//阻止默认事件或冒泡
      }
      function move(event){
        let left = event.clientX - this.gapX; // 鼠标移动的相对距离

        $(boxEl).scrollLeft(this.startX - left);

        return false;//阻止默认事件或冒泡
      }
      function stop(){
        //解绑定，这一步很必要，前面有解释
        $(el).unbind("mousemove", move);
        $(el).unbind("mouseup", stop);
      }
    })
  },
  methods: {
    getTab(index, e) {
      this.$emit('change', index, e)
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 45px;
  background-color: #fff;
  display: flex;
  .header-tab {
    width: 100%;
    height: 45px;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      display: inline-block;
      white-space: nowrap;
      //touch-action: none;
      li {
        display: inline-block;
        line-height: 45px;
        padding: 0 10px;
        font-size: 14px;
        color: #333;
        // 点击高亮某一项时,将原来的字体变大,会导致没有高亮的元素距离上面有空隙,会出现纵向滚动条
        margin-top: -1px;
      }
      .active-header {
        font-size: 16px;
        font-weight: 600;
        color: #42b983;
        position: relative;
        &:after {
          position: absolute;
          content: "";
          width: 36%;
          height: 2px;
          bottom: 0;
          left: 32%;
          background-color: #42b983;
          border-radius: 50px;
        }
      }
    }
  }
  .header-search {
    width: 10%;
    height: 45px;
    position: relative;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }
}
</style>