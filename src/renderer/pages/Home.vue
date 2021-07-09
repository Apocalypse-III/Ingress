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
      <div class="channel-container" id="channel">
        <component :is="currentComponent" :native-parse-result="nativeParseResult"></component>
      </div>
    </div>
  </el-main>
</template>

<script>
import Vue from 'vue'
import cheerio from "cheerio"
import { JSDOM } from 'jsdom'
import { Interpreter } from "eval5"
import HeaderTab from '@/components/HeaderTab'
import Host from '@/components/Hosts/List'
import ParseColType from '@/components/ParseColType'

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
        {
          id: 1,
          name: "我的主页",
          rule: {
            nativeStyle: true,
            host: 'http://www.979797.wang/index.php/vod/type/id/1.html',
            base_rule: '',
          },
        },
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
      nativeParseResult: []
    }
  },
  async created() {

    Vue.component('async-webpack-component', () => import('@/components/ParseColType'))
    await this.parseNativeRule({})

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
  activated() {
    const scrollTop = this.$route.meta.scrollTop;
    const $content = document.querySelector('#channel');
    if (scrollTop && $content) $content.scrollTop = scrollTop;
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
    },
    async parseNativeRule(rule) {
      let response = await fetch("http://www.979797.wang/index.php/vod/type/id/1.html");
      const html = await response.text()

      const document = new JSDOM(html).window.document
      const list = document.querySelectorAll(".stui-vodlist li")

      list.forEach(item => {
        let item_document = new JSDOM(item.outerHTML).window.document;
        let title = item_document.querySelector("h4").textContent
        let pic_url = item_document.querySelector(".lazyload").getAttribute('data-original')
        let desc = item_document.querySelector(".pic-text").textContent
        let url = item_document.querySelector("a").href

        this.nativeParseResult.push({
          type: 'movie',
          width: 4,
          title,
          url,
          pic_url,
          desc,
        })
      })
      /*const rule_list = rule.base_rule.split(';')
      try {
        rule_list[0]
      } catch (e) {}*/


    },
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
    padding-right: 8px;
    height: calc(100% - 50px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
