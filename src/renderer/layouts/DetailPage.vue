<template>
  <el-container class="main">
    <el-main>
      <el-page-header class="detail-page-header" @back="goBack" :content="secondPageTitle"></el-page-header>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "DetailPage",
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters('Window', ['secondPageTitle']),
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  },
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  .detail-page-header {
    margin-bottom: 12px;
    -webkit-app-region: drag;
    ::v-deep.el-page-header__left {
      -webkit-app-region: no-drag;
    }
  }
}
</style>
