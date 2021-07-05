<template>
  <el-main>
    <div class="header">
      <div class="description">仪表盘</div>
      <div class="title">Dashboard</div>
    </div>
    <div class="main">
      <div class="card-item" v-for="(item, index) in icons" :key="index" @click="navToPage(item.key)">
        <el-image class="menu--image" :src="item.icon" fit="fill"></el-image>
        <div>{{item.title}}</div>
      </div>
    </div>
  </el-main>
</template>

<script>
import { remote } from 'electron'

export default {
  name: "Home",
  data() {
    return {
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
  mounted() {

  },
  methods: {
    navToPage(name) {
      if (name !== this.$route.name) this.$router.push({name: name})
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
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
  margin-top: 12px;
  height: calc(100% - 65px);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  .card-item {
    width: 16.6666%;
    padding: 24px 0;
    text-align: center;
    cursor: pointer;
    .menu--image {
      width: 44px;
      height: 44px;
    }
  }
}
</style>
