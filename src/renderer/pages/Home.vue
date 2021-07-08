<template>
  <el-main>
    <div class="main">
      <header-tab
          :listArray="list"
          :current="current"
          @change="changeTab"
          ref="tab"
      >
        <!--          <img :src="imgSrc" alt="" slot="header_tab_img" />-->
      </header-tab>
      <div class="channel-container">
        <component :is="currentComponent"></component>
      </div>
    </div>
  </el-main>
</template>

<script>
import Vue from 'vue'
import cheerio from "cheerio"
import { Interpreter } from "eval5"
import HeaderTab from '@/components/HeaderTab'
import Host from '@/components/Hosts/List'
import ParseColType from '@/components/ParseColType'

/*let res = request({
  url: "https://cn.pornhub.com/video?o=hot&cc=jp&page=1",
  method: "get",
  json: true,
  // headers: {
  //   "content-type": "application/json",
  // },
  // body: JSON.stringify(requestData)
}, function(error, response, body) {
  console.log(error)
})*/

export default {
  name: "Home",
  components: {
    HeaderTab,
    Host,
    ParseColType,
  },
  data() {
    return {
      list: [
        { id: 1, name: "我的主页" },
        { id: 2, name: "编辑 hosts" },
        { id: 3, name: "笔记" },
        { id: 4, name: "录制" },
      ],
      current: 0,
      currentComponent: 'async-webpack-component',
      icons: [
        // {key: 'home', title: '首页', icon: require('@/assets/icons/home.png')},
        {key: 'hosts', title: '切换 Hosts', icon: require('@/assets/icons/switch.png')},
        {key: 'notes', title: '笔记', icon: require('@/assets/icons/edit.png')},
        {key: 'todo', title: 'TODO', icon: require('@/assets/icons/todo.png')},
        {key: 'record', title: '录制', icon: require('@/assets/icons/record.png')},
        {key: 'video2', title: '视界', icon: require('@/assets/icons/video.png')},
      ],
    }
  },
  async created() {
    Vue.component('async-webpack-component', () => import('@/components/ParseColType'))

    let response = await fetch("http://www.zzzfun.com/vod_type_id_42_page_5.html");
    let list = cheerio('.search-result a', await response.text())

    list.each((index, item) => {
      // console.log(cheerio(item).parent().html())
    })
    /*const ctx = {
      $message: this.$message,
      $notify: this.$notify,
    };

    const interpreter = new Interpreter(ctx, {
      rootContext: global,
      timeout: 1000,
    });

    let result;

    try {
      interpreter.evaluate(

      );
      // result = interpreter.evaluate("console.log(this)");
      // console.log(result);

      // interpreter.evaluate("var a=100");
      // interpreter.evaluate("var b=200");
      // result = interpreter.evaluate("a+b");

    } catch (e) {
      console.log(e);
    }*/
  },
  methods: {
    changeTab(index, e) {
      this.current = index
      let tab = this.$refs.tab.$refs.headerTab
      let tabItem = this.$refs.tab.$refs.tabItem
      let winWidth = window.innerWidth
      let liList = e.target
      if (liList) {
        let liLeft = liList.offsetLeft,
            liWidth = liList.offsetWidth,
            liCenter = (winWidth - liWidth) / 2,
            liTarget = liLeft - liCenter
        let ulWidth = tabItem.offsetWidth
        if (liTarget < 0) {
          tab.scrollLeft = 0
          return;
        }
        if (liTarget < winWidth - ulWidth) {
          tab.scrollLeft = - (winWidth - ulWidth) + liWidth;
          return;
        }
        tab.scrollLeft = liTarget;
      }
    }
  },
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .title {
    font-size: 24px;
    font-weight: 600;
    color: #42b983;
  }
  .description {
    font-size: 12px;
    font-weight: 400;
    color: #666;
  }
}
.main {
  width: 100%;
  height: 100%;
  .tabs {
    height: 45px;
  }
  .channel-container {
    height: calc(100% - 50px);
  }
}
</style>
