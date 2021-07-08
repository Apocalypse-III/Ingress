<template>
  <div class="video-container">
    <div id="DPlayer" ref="DPlayer"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DPlayer from 'dplayer'
import ffmpeg from 'fluent-ffmpeg'
const ffmpegPath = require('@ffmpeg-installer/ffmpeg')
const http = require('http')

export default {
  name: "video-play",
  data() {
    return {
      url: '',
      dp: null,
    }
  },
  created() {
    const {url, title} = this.$route.params

    this.setSecondPageTitle(title)
    this._ffmpegCommand = ffmpeg()
        .setFfmpegPath(ffmpegPath.path)
        .input(url)
        .nativeFramerate()
        .format('mp4')
        .outputOptions('-movflags', 'frag_keyframe+empty_moov')
    // read input at native framerate
    /*.nativeFramerate()
    .videoCodec(videoCodec)
    .audioCodec(audioCodec)
    .format('mp4')
    .seekInput(startTime)
    // fragmeted mp4
    .outputOptions('-movflags', 'frag_keyframe+empty_moov');*/
    let videoStream = this._ffmpegCommand.pipe();
    console.log(videoStream.pipe())
    // this.url = videoStream.url
    // videoStream.pipe(response);
    // this.url = "http://127.0.0.1:8888"
  },
  mounted() {
    this.initDP()
  },
  methods: {
    ...mapActions('Window', ['setSecondPageTitle']),
    initDP() {
      this.dp = new DPlayer({
        container: this.$refs.DPlayer,
        screenshot: true,
        video: {
          url: this.url,
          /*pic: 'demo.jpg',
          thumbnails: 'thumbnails.jpg',*/
        },
        /*subtitle: {
          url: 'webvtt.vtt',
        },
        danmaku: {
          id: 'demo',
          api: 'https://api.prprpr.me/dplayer/',
        },*/
      })
    },
  },
}
</script>

<style scoped lang="scss">
.video-container {
  width: 100%;
}
</style>