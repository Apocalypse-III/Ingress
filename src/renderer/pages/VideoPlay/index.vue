<template>
  <div class="video-container">
    <div id="player" ref="player"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Player from 'xgplayer'
import HlsJsPlayer from 'xgplayer-hls.js'
import FlvJsPlayer from 'xgplayer-flv.js'

export default {
  name: "video-play",
  data() {
    return {
      url: '',
      player: null,
      config: {
        id: 'player',
        // el: this.$refs.player,
        url: '',
        lang: 'zh-cn',
        width: '100%',
        height: 400,
        volume: 1,
        autoplay: true,
        videoInit: true,
        screenShot: true,
        keyShortcut: 'off',
        crossOrigin: true,
        cssFullscreen: true,
        defaultPlaybackRate: 1,
        playbackRate: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4, 5],
        playPrev: true,
        pip: true,
        playNextOne: true,
        videoStop: true,
        showList: true,
        showHistory: true,
        quitMiniMode: true,
        videoTitle: true,
        airplay: true,
        closeVideoTouch: true,
        ignores: ['replay', 'error'], // 为了切换播放器类型时避免显示错误刷新，暂时忽略错误
        preloadTime: 300,
      },
    }
  },
  created() {
    const {url, title} = this.$route.params

    this.setSecondPageTitle(title)
    this.config.url = url
  },
  mounted() {
    this.initPlayer()
  },
  methods: {
    ...mapActions('Window', ['setSecondPageTitle']),
    initPlayer() {
      const ext = this.config.url.match(/\.\w+?$/)[0].slice(1)
      switch (ext) {
        case 'mp4':
          this.player = new Player(this.config)
          break
        case 'flv':
          this.player = new FlvJsPlayer(this.config)
          break
        default:
          this.player = new HlsJsPlayer(this.config)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.video-container {
  width: 100%;
}
</style>