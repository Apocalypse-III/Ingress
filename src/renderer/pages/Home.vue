<template>
  <el-main>
    <div class="header">
      <div class="description">仪表盘</div>
      <div class="title">Dashboard</div>
    </div>
    <div class="main">
      <!--<el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>-->
    </div>
  </el-main>
</template>

<script>
export default {
  name: "Home"
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
  height: calc(100% - 61px);
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
  .item {
    height: 300px;
    width: 33.33%;
    background-color: #42b983;
  }
}
</style>
