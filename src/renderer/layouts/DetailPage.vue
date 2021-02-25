<template>
  <el-container class="main">
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "DetailPage"
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
}
</style>
