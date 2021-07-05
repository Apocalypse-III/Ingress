<template>
  <el-main>
    <div class="header">
      <div class="back" @click="back"><i class="el-icon-back" style="margin-right: 8px"></i>返回</div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "notes",
  data() {
    return {

    }
  },
  methods: {
    back() {
      this.$router.back()
    },
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .back {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
}
</style>