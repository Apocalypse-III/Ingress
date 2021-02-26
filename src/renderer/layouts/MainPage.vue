<template>
  <el-container class="main">
    <el-header class="status-bar" height="40px">
<!--      <i class="el-icon-rank "></i>-->
      <div class="button-group">
<!--        <div class="button fullScreen" title="全屏" @click="fullScreen"><i class="el-icon-full-screen icon"></i></div>-->
        <div class="button min" title="最小化" @click="min"><i class="el-icon-minus icon"></i></div>
<!--        <div class="button max"><i class="far fa-window-maximize icon i-white"></i></div>-->
<!--        <div class="button max" title="最大化" @click="max"><i class="el-icon-copy-document icon"></i></div>-->
        <div class="button close" title="关闭应用" @click="close"><i class="el-icon-close icon"></i></div>
      </div>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
const { ipcRenderer, remote } = require('electron');
import { mapGetters, mapActions } from 'vuex';

const app = remote.app
const window = remote.getCurrentWindow()

export default {
  name: "MainPage",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('Window', ['isMaximized', 'isFullScreen'])
  },
  mounted() {

  },
  methods: {
    ...mapActions('Window', ['setMaximized', 'setFullScreen']),
    close() {
      window.close()
    },
    fullScreen() {
      if (this.isFullScreen){
        this.setFullScreen(false)
        window.setFullScreen(false)
      } else {
        this.setFullScreen(true)
        window.setFullScreen(true)
      }
      this.setMaximized(false)

    },
    max() {
      if (window.isMaximized() || window.isSimpleFullScreen() || window.isFullScreen()) {
        window.unmaximize()
        // window.setFullScreen(false)
      } else {
        window.maximize()
        // window.setFullScreen(true)
      }
      // this.setFullScreen(false)
    },
    min() {
      window.minimize()
    },
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  .status-bar {
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    -webkit-app-region: drag;
    .button-group {
      height: 100%;
      margin-right: 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      -webkit-app-region: no-drag;
      .button {
        margin-left: 16px;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        //align-items: center;
        .icon {
          line-height: 16px;
          font-size: 10px;
          font-weight: 600;
          color: #fff;
        }
      }
      .fullScreen {
        background-color: deepskyblue;
      }
      .min {
        background-color: #42b983;
      }
      .max {
        background-color: orange;
      }
      .close {
        background-color: orangered;
      }
    }
  }
}
</style>
