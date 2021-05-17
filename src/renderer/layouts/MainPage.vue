<template>
  <el-container class="main">
    <el-header class="status-bar" height="60px">
      <div class="bar-left">
        <div class="title">Ingress</div>
        <div class="top" @click="top" v-if="isTop" title="取消置顶">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M927.701333 375.978667l-279.637333-279.637334A37.546667 37.546667 0 0 0 621.397333 85.333333a37.546667 37.546667 0 0 0-26.666666 11.008L411.904 279.296a366.506667 366.506667 0 0 0-41.770667-2.304 374.016 374.016 0 0 0-234.325333 82.048 37.717333 37.717333 0 0 0-3.072 56.064l206.208 206.208-244.48 244.224a17.92 17.92 0 0 0-5.205333 11.093333l-3.84 42.24a18.090667 18.090667 0 0 0 18.048 19.754667c0.554667 0 1.109333 0 1.706666-0.128l42.24-3.84a17.92 17.92 0 0 0 11.093334-5.248l244.437333-244.437333 206.208 206.208a37.546667 37.546667 0 0 0 26.666667 11.008 37.546667 37.546667 0 0 0 29.397333-14.08 374.826667 374.826667 0 0 0 79.658667-276.224l182.826666-182.826667a37.589333 37.589333 0 0 0 0-53.077333z m-240.725333 178.346666l-27.776 27.818667 4.266667 39.04a294.997333 294.997333 0 0 1-34.474667 174.677333L228.309333 394.922667a293.546667 293.546667 0 0 1 174.634667-34.517334l39.04 4.309334 27.818667-27.776 151.722666-151.722667 217.301334 217.301333-151.850667 151.850667z" fill="#ffffff"></path></svg>
        </div>
        <div class="not-top" @click="top" v-else title="置顶">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M927.701333 375.978667l-279.637333-279.637334A37.546667 37.546667 0 0 0 621.397333 85.333333a37.546667 37.546667 0 0 0-26.666666 11.008L411.904 279.296a366.506667 366.506667 0 0 0-41.770667-2.304 374.016 374.016 0 0 0-234.325333 82.048 37.717333 37.717333 0 0 0-3.072 56.064l206.208 206.208-244.48 244.224a17.92 17.92 0 0 0-5.205333 11.093333l-3.84 42.24a18.090667 18.090667 0 0 0 18.048 19.754667c0.554667 0 1.109333 0 1.706666-0.128l42.24-3.84a17.92 17.92 0 0 0 11.093334-5.248l244.437333-244.437333 206.208 206.208a37.546667 37.546667 0 0 0 26.666667 11.008 37.546667 37.546667 0 0 0 29.397333-14.08 374.826667 374.826667 0 0 0 79.658667-276.224l182.826666-182.826667a37.589333 37.589333 0 0 0 0-53.077333z m-240.725333 178.346666l-27.776 27.818667 4.266667 39.04a294.997333 294.997333 0 0 1-34.474667 174.677333L228.309333 394.922667a293.546667 293.546667 0 0 1 174.634667-34.517334l39.04 4.309334 27.818667-27.776 151.722666-151.722667 217.301334 217.301333-151.850667 151.850667z"></path></svg>
        </div>
      </div>
<!--      <i class="el-icon-rank "></i>-->
      <div class="button-group">
<!--        <div class="button fullScreen" title="全屏" @click="fullScreen"><i class="el-icon-full-screen icon"></i></div>-->
        <div class="button" title="全屏" @click="fullScreen">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M909 959H780a30 30 0 0 1 0-60h99a20 20 0 0 0 20-20v-99a30 30 0 0 1 60 0v129a50 50 0 0 1-50 50z m20-685a30 30 0 0 1-30-30v-99a20 20 0 0 0-20-20h-99a30 30 0 0 1 0-60h129a50 50 0 0 1 50 50v129a30 30 0 0 1-30 30z m-157 28v420a50 50 0 0 1-50 50H302a50 50 0 0 1-50-50V302a50 50 0 0 1 50-50h420a50 50 0 0 1 50 50z m-60 30a20 20 0 0 0-20-20H332a20 20 0 0 0-20 20v360a20 20 0 0 0 20 20h360a20 20 0 0 0 20-20V332zM244 125h-99a20 20 0 0 0-20 20v99a30 30 0 0 1-60 0V115a50 50 0 0 1 50-50h129a30 30 0 0 1 0 60zM95 750a30 30 0 0 1 30 30v99a20 20 0 0 0 20 20h99a30 30 0 0 1 0 60H115a50 50 0 0 1-50-50V780a30 30 0 0 1 30-30z"></path></svg>
        </div>
        <div class="button" title="最小化" @click="min">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M863.7 552.5H160.3c-10.6 0-19.2-8.6-19.2-19.2v-41.7c0-10.6 8.6-19.2 19.2-19.2h703.3c10.6 0 19.2 8.6 19.2 19.2v41.7c0 10.6-8.5 19.2-19.1 19.2z"></path></svg>
        </div>
        <div class="button" title="最大化" @click="max">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M770.9 923.3H253.1c-83.8 0-151.9-68.2-151.9-151.9V253.6c0-83.8 68.2-151.9 151.9-151.9h517.8c83.8 0 151.9 68.2 151.9 151.9v517.8c0 83.8-68.1 151.9-151.9 151.9zM253.1 181.7c-39.7 0-71.9 32.3-71.9 71.9v517.8c0 39.7 32.3 71.9 71.9 71.9h517.8c39.7 0 71.9-32.3 71.9-71.9V253.6c0-39.7-32.3-71.9-71.9-71.9H253.1z"></path></svg>
        </div>
        <div class="button" title="关闭应用" @click="close">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M897.6 183.5L183 898.1c-7.5 7.5-19.6 7.5-27.1 0l-29.5-29.5c-7.5-7.5-7.5-19.6 0-27.1L841 126.9c7.5-7.5 19.6-7.5 27.1 0l29.5 29.5c7.5 7.4 7.5 19.6 0 27.1z"></path><path d="M183 126.9l714.7 714.7c7.5 7.5 7.5 19.6 0 27.1l-29.5 29.5c-7.5 7.5-19.6 7.5-27.1 0L126.4 183.5c-7.5-7.5-7.5-19.6 0-27.1l29.5-29.5c7.4-7.5 19.6-7.5 27.1 0z"></path></svg>
        </div>
      </div>
    </el-header>
    <router-view></router-view>

<!--    <el-dialog-->
<!--      title="是否关闭Ingress"-->
<!--      :visible.sync="closeDialogVisible"-->
<!--      width="400px"-->
<!--      :before-close="closeCloseDialog">-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button size="mini" @click="closeCloseDialog">取 消</el-button>-->
<!--        <el-button size="mini" type="primary" @click="close">最小化到系统托盘</el-button>-->
<!--        <el-button size="mini" type="danger" @click="close">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </el-container>
</template>

<script>
const { remote, ipcRenderer } = require('electron');
import { mapGetters, mapActions } from 'vuex';

const window = remote.getCurrentWindow()
const app = remote.app

export default {
  name: "MainPage",
  data() {
    return {
      closeDialogVisible: false,
      isTop: window.isAlwaysOnTop(),
    }
  },
  computed: {
    // ...mapGetters('Window', ['isTop'])
  },
  mounted() {

  },
  methods: {
    ...mapActions('Window', ['setTop']),
    top() {
      this.setTop()
      this.isTop = window.isAlwaysOnTop()
    },
    close() {
      this.$confirm('是否退出应用？', '提示', {
        confirmButtonText: '退出应用',
        cancelButtonText: '最小化到系统托盘',
        type: 'warning'
      }).then(() => {
        ipcRenderer.send('close-app')
      }).catch(() => {

      });
    },
    max() {
      if (window.isMaximized())
        window.unmaximize()
      else
        window.maximize()
    },
    fullScreen() {
      window.setFullScreen(! window.isFullScreen())
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
    margin-top: 2px;
    width: 100%;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    -webkit-app-region: drag;
    .bar-left {
      margin-left: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #42b983;
        font-size: 28px;
        font-weight: 600;
        font-family: 'AlexBrush', serif;
      }
      .top {
        margin-left: 60px;
        width: 24px;
        height: 24px;
        -webkit-app-region: no-drag;
        background-color: #42b983;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        .icon {
          margin: 3px;
          width: 18px;
          height: 18px;
        }
      }
      .not-top {
        margin-left: 60px;
        width: 24px;
        height: 24px;
        -webkit-app-region: no-drag;
        cursor: pointer;
        .icon {
          margin: 3px;
          width: 18px;
          height: 18px;
        }
      }
    }
    .button-group {
      height: 100%;
      margin-right: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      -webkit-app-region: no-drag;
      .button {
        margin-left: 32px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        .icon {
          width: 16px;
          height: 16px;
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
