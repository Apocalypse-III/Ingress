<template>
  <el-container class="main">
    <el-aside width="264px" class="tab-bar-container">
      <div class="tab-bar" v-bind:style="tabBarStyle">
        <div class="title">Ingress</div>
        <div class="user-info"></div>
        <div class="menu">
          <div class="menu-item" @click="navToPage('home')">
            <div class="item-icon"></div>
            <div class="item-title">Dashboard</div>
            <div class="item-to"><i class="el-icon-arrow-right"></i></div>
          </div>
          <div class="menu-item" @click="navToPage('edit-hosts')">
            <div class="item-icon"></div>
            <div class="item-title">编辑hosts</div>
            <div class="item-to"><i class="el-icon-arrow-right"></i></div>
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
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  .tab-bar-container {
    //width: 264px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 0 32px 0;
    .tab-bar {
      width: 200px;
      height: inherit;
      border-radius: 16px;
      padding: 16px;
      .title {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 28px;
        font-weight: 600;
        font-family: 'AlexBrush', Serif;
      }
      .user-info {
        width: 100%;
        height: 60px;
        padding: 12px 24px;
        background-color: deepskyblue;
      }
      .menu {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        padding: 0 12px;
        .menu-item {
          padding: 12px 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          cursor: pointer;
          .item-icon {}
          .item-title {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .item-to {}
        }
      }
    }
  }
}
</style>
