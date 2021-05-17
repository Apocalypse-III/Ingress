<template>
<el-main>
    <div class="header">
      <div class="description">屏幕录制</div>
      <div class="title">屏幕录制</div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "record"
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
</style>
