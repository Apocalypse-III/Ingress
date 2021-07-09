<template>
  <div class="native-layout">
    <el-row :gutter="20">
      <el-col :span="item.width" v-for="(item, index) in nativeParseResult" :key="index">
        <component
            :is="currentComponent(item.type)"
            :title="item.title || ''"
            :url="item.url || ''"
            :pic-url="item.pic_url || ''"
            @urlProcess="urlProcess"
        ></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {
    'default-text': () => import('@/components/ParseColType/Text'),
    'default-movie': () => import('@/components/ParseColType/Movie'),
  },
  props: {
    nativeParseResult: {
      type: Array,
    }
  },
  data() {
    return {
      // dataList: [
      //   {
      //     type: 'text',
      //     width: 8,
      //     title: '测试1',
      //     url: 'https://www.baidu.com',
      //   },
      //   {
      //     type: 'text',
      //     width: 8,
      //     title: '测试2',
      //     url: 'https://www.baidu.com',
      //   },
      //   {
      //     type: 'text',
      //     width: 8,
      //     title: '测试3',
      //     url: 'https://www.baidu.com',
      //   },
      //   {
      //     type: 'movie',
      //     width: 8,
      //     title: '测试1',
      //     url: 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4',
      //     pic_url: 'https://seopic.699pic.com/photo/40011/0709.jpg_wh1200.jpg',
      //     desc: '123',
      //   },
      //   {
      //     type: 'movie',
      //     width: 8,
      //     title: '测试2',
      //     url: 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4',
      //     pic_url: 'https://seopic.699pic.com/photo/40011/0709.jpg_wh1200.jpg',
      //     desc: '123',
      //   },
      //   {
      //     type: 'movie',
      //     width: 8,
      //     title: '测试3',
      //     url: 'https://vod8.wenshibaowenbei.com/20210708/AgiITSQU/index.m3u8#isVideo=true#',
      //     pic_url: 'https://seopic.699pic.com/photo/40011/0709.jpg_wh1200.jpg',
      //     desc: '123',
      //   },
      // ],
    }
  },
  methods: {
    currentComponent(type) {
      switch (type) {
        case 'text': return 'default-text'
        case 'movie': return 'default-movie'
      }
    },
    urlProcess(url, title) {
      let flag = 'sub-page'

      if (/#isVideo=(true|false)#/.test(url)) {
        const videoFlag = url.match(/#isVideo=(.*?)#/)[1]
        url = url.replace(/#isVideo=(true|false)#/, '')
        if (videoFlag === 'true') flag = 'video-page'
      } else if (/\.m3u8|\.mp4|\.wmv|\.flv|\.m4v|\.avi/.test(url)) {
        flag = 'video-page'
      }

      switch (flag) {
        case 'video-page': this.$router.push({name: 'video-play', params: {url, title}});break
        case 'sub-page': this.$router.push({name: 'sub-page', params: {url, title}});break
      }
    },
  },
}
</script>

<style scoped lang="scss">
.native-layout {
  width: 100%;
  height: 100%;
  .el-row {
    .el-col {
      margin: 10px 0;
    }
  }
}
</style>