<template>
  <el-main>
    <div class="header">
<!--      <div class="description">编辑</div>-->
      <div class="title">编辑 Hosts</div>
    </div>
    <div class="main">
      <el-form :inline="true" :model="host" v-for="(host, index) in hosts" :key="index" class="form">
        <el-form-item label="IP：">
          <el-input v-model="host.ip" placeholder="ip" size="small" class="form-input" @input="e => inputChange(e, index, 'ip')"></el-input>
        </el-form-item>
        <el-form-item label="主机：">
          <el-input v-model="host.host" placeholder="主机" size="small" class="form-input" @input="e => inputChange(e, index, 'host')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="save(false)" size="small" :disabled="! host.saveBtn">保存</el-button>
          <el-button type="danger" @click="deleteItem(index)" size="small">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button size="small" class="new" @click="addItem()" :disabled="! newBtn">新增</el-button>
  </el-main>
</template>

<script>
import fs from 'fs'
import { mapGetters, mapActions } from 'vuex';
import {deepClone} from "@/utils/function/deepClone";

const HOSTS_PATH = 'C:/Windows/System32/drivers/etc/hosts'

export default {
  name: "EditHosts",
  data() {
    return {
      hosts: [],
      newBtn: true
    }
  },
  computed: {
    ...mapGetters('Hosts', ['has_delete_hosts']),
  },
  created() {
    this.getHosts()
  },
  methods: {
    ...mapActions('Hosts', ['saveOriginalHosts', 'hasDeleteHosts']),
    getHosts() {
      this.hosts = []
      try {
        fs.accessSync(HOSTS_PATH, fs.constants.R_OK);
      } catch (e) {
        this.$notify.error('没有读取权限')
        return false
      }
      let content = fs.readFileSync(HOSTS_PATH)
      let data = content.toString().split('\n').map(val => val.trim()).filter(val => val && val.indexOf("#") < 0)

      data.forEach(item => {
        let temp = item.split(' ').filter(Boolean)
        if (temp.length === 2) {
          this.hosts.push({
            ip: temp[0],
            host: temp[1],
            saveBtn: false,
          })
        }
      })

      this.saveOriginalHosts(deepClone(this.hosts))
    },
    save(formDelete = false) {
      let content = ''
      this.hosts.forEach(item => {
        content += `${item.ip}        ${item.host}\r\n`
      })
      try {
        fs.accessSync(HOSTS_PATH, fs.constants.W_OK);
      } catch (e) {
        this.$notify.error('没有写入权限')
        return false
      }

      fs.writeFileSync(HOSTS_PATH, content);

      this.newBtn = true
      if (! formDelete) this.$message.success('保存成功')
      this.getHosts()
    },
    inputChange(val, index, key) {
      this.hosts[index].saveBtn = val.toString() !== this.has_delete_hosts[index][key].toString();
    },
    addItem() {
      this.hosts.push({
        ip: '127.0.0.1',
        host: '',
        saveBtn: false,
      })
      this.newBtn = false
      this.saveOriginalHosts(deepClone(this.hosts))
    },
    deleteItem(index) {
      this.hosts.splice(index, 1)
      this.hasDeleteHosts(deepClone(this.hosts))
      this.$message.success('删除成功')
      this.save(true)
    }
  }
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
  margin-top: 24px;
  margin-bottom: 12px;
  height: calc(100% - 120px);
  //display: flex;
  //flex-direction: column;
  //justify-content: flex-start;
  //align-content: flex-start;
  //flex-wrap: nowrap;
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
  .form {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    .form-input {
      width: 180px;
    }
  }
}
.new {
  width: 100%;
}
</style>
