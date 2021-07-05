<template>
  <el-main>
<!--    <div class="header">
      <div class="description">设置</div>
      <div class="title">setting</div>
    </div>-->
    <div class="main">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "setting",
  methods: {

  }
}
</script>

<style scoped lang="scss">
/*.header {
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
}*/
.main {
  width: 100%;
  //margin-top: 12px;
  height: 100%;
  //height: calc(100% - 65px);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 4px;
    background-color: #e1e1e1;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: #e1e1e1;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: deepskyblue;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  ::v-deep.el-tabs {
    margin: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    .el-tabs__content {
      height: calc(100% - 39px);
    }
  }
}
</style>