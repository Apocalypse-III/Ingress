<template>
  <el-container class="main">
    <el-aside width="150px" class="tab-bar-container">
      <div class="tab-bar" v-bind:style="tabBarStyle">
        <div class="menu">
          <div class="menu-item" v-for="item in icons" :key="item.key" @click="navToPage(item.key)" :title="item.title">
            <el-image class="menu--image" :src="item.icon" fit="fill"></el-image>
          </div>
        </div>
      </div>
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "TabBar",
  data() {
    return {
      icons: [
        {key: 'home', title: '首页', icon: require('../assets/icons/home.png')},
        {key: 'hosts', title: '切换 Hosts', icon: require('../assets/icons/switch.png')},
        {key: 'note', title: '笔记', icon: require('../assets/icons/edit.png')},
        {key: 'todo', title: 'TODO', icon: require('../assets/icons/todo.png')},
        {key: 'record', title: '录制', icon: require('../assets/icons/record.png')},
        {key: 'video2', title: '视界', icon: require('../assets/icons/video.png')},
      ],
    }
  },
  computed: {
    ...mapGetters('AppStyle', ['tabBarStyle'])
  },
  mounted() {

  },
  methods: {
    navToPage(name) {
      if (name !== this.$route.name) this.$router.push({name: name})
    },
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: calc(100% - 40px);
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  .tab-bar-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 32px 0;
    .tab-bar {
      width: 100px;
      height: inherit;
      border-radius: 16px;
      padding: 16px;
      .menu {
        margin: 18px 0;
        height: calc(100% - 36px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 12px;
        .menu-item {
          padding: 12px 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          cursor: pointer;
          .menu--image {
            width: 44px;
            height: 44px;
          }
        }
      }
    }
  }
}
</style>
