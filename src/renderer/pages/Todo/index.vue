<template>
  <el-main>
    <div class="header">
      <div class="back" @click="back"><i class="el-icon-back" style="margin-right: 8px"></i>返回</div>
    </div>
    <div class="main">
        <div class="date-list">
        <el-radio-group class="date-switch" v-model="type" size="mini">
            <el-radio-button label="日期"></el-radio-button>
            <el-radio-button label="标签"></el-radio-button>
        </el-radio-group>
            <el-date-picker
                v-if="type === '日期'"
                v-model="date"
                type="date"
                placeholder="选择日期"
                size="mini">
            </el-date-picker>
        </div>
        <div class="todo-list"></div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "todo",
  data() {
      return {
          type: '日期',
          date: new Date()
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
.main {
    margin: 24px 0 12px 0;
    padding: 0 8px;
    height: calc(100% - 88px);
    overflow-y: auto;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;

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
    .date-list {
        flex: 7;
        border-right: 1px dashed #e1e1e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .date-switch {
            margin: 8px 0;
        }
        ::v-deep .el-date-editor.el-input,.el-date-editor.el-input__inner {
            width: auto;
            margin-right: 8px;
        }
    }
    .todo-list {
        flex: 13;
    }
}
</style>
