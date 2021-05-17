<template>
  <el-main>
    <div class="header">
      <div class="description">hosts 列表</div>
      <div class="title">切换 hosts</div>
    </div>
    <div class="main">
      <el-collapse v-model="activeGroup">
        <el-collapse-item :title="item.group" :name="index" v-for="(item, index) in list" :key="index">
          <div class="switch-container" v-for="hosts in item.list" :key="hosts._id">
            <div class="hosts-info pure-hosts-name" @click="readyToChangeHostsName(hosts)" v-if="!changeHostsNameStatus">{{hosts.name}}</div>
            <div class="hosts-info" v-else>
              <el-input v-model="currentHosts.name" size="mini" clearable></el-input>
              <el-button class="save-hosts-name" type="success" @click="saveHostsName" size="mini" :disabled="currentHosts.name === '' || currentHostsPrevName === currentHosts.name">保存</el-button>
              <el-button class="cancel-save-hosts-name" type="info" @click="cancelSaveHostsName" size="mini">取消</el-button>
            </div>
            <div class="hosts-actions">
              <div class="hosts-action-action hosts-action-edit"><i class="el-icon-edit" @click="hostsDetail(hosts)" title="编辑"></i></div>
              <div class="hosts-action-action hosts-action-delete"><i class="el-icon-delete" @click="hostsDelete(hosts)" title="删除"></i></div>
              <el-switch v-model="hosts.status" title="切换" active-color="#13ce66" inactive-color="#ff4949" @change="e => hostsSwitch(e, hosts)"></el-switch>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-button size="small" class="new" @click="addHosts">新增</el-button>
  </el-main>
</template>

<script>
import fs from "fs"
import process from 'process'

const HOSTS_PATH = process.platform == 'win32' ? 'C:/Windows/System32/drivers/etc/hosts' : '/etc/hosts'

// fs.chmod(HOSTS_PATH, '0777', function(err) {
//   console.log(err);
// })

export default {
  name: "List",
  data() {
    return {
      list: [],
      activeGroup: [],
      changeHostsNameStatus: false,
      currentHosts: {_id: '', name: ''},
      currentHostsPrevName: '',
    }
  },
  mounted() {
    this.getHostsGroup()
  },
  methods: {
    getHostsGroup() {
      let activeGroupIndex = 0
      let hosts_list = []

      // 初始化
      this.activeGroup = []

      this.$ingress.db.hosts.getAll().then(res => {
        // 若无记录,则使将本地hosts录入
        if (res.length === 0) {
          this.createFirstHosts()
        } else {
          // 分组
          let group_object = this.$ingress._.groupBy(res, 'group')
          // 集合
          this.$ingress._.forIn(group_object, (item, group) => {
            hosts_list.push({group: group, list: item})
            this.activeGroup.push(activeGroupIndex)
            activeGroupIndex++
          })
          // 排序
          this.list = this.$ingress._.orderBy(hosts_list, [item => item.group === 'Default'], ['desc'])
        }
      })
    },
    createFirstHosts() {
      try {
        fs.accessSync(HOSTS_PATH, fs.constants.R_OK);
      } catch (e) {
        this.$notify.error('没有读取权限')
        return false
      }
      let content = fs.readFileSync(HOSTS_PATH).toString()
      const system_hosts = {name: 'System Hosts', group: 'Default', status: true, content}
      this.$ingress.db.hosts.create(system_hosts).then(res => {
        this.list = [{group: 'Default', list: [res]}]
        this.activeGroup.push(0)
      })
    },
    readyToChangeHostsName(hosts) {
      this.changeHostsNameStatus = true
      this.currentHosts = hosts
      this.currentHostsPrevName = hosts.name
    },
    saveHostsName() {
      this.$ingress.db.hosts.update(this.currentHosts).then(_ => {
        this.changeHostsNameStatus = false
        this.currentHosts = {_id: '', name: ''}
        this.currentHostsPrevName = ''
        this.getHostsGroup()
      })
    },
    cancelSaveHostsName() {
      this.changeHostsNameStatus = false
      this.currentHosts = {_id: '', name: ''}
      this.currentHostsPrevName = ''
    },
    hostsDetail(hosts) {
      const group = JSON.stringify(this.$ingress._.map(this.list, 'group'))
      this.$router.push({name: 'hosts-detail', params: {type: 'edit', group, id: hosts._id}})
    },
    hostsDelete(hosts) {
      const loading = this.$loading({
        lock: true,
        text: '删除中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })

      this.$ingress.db.hosts.remove(hosts._id).then(_ => {
        this.getHostsGroup()
        loading.close()
      })
    },
    hostsSwitch(e, hosts) {
      const loading = this.$loading({
        lock: true,
        text: '切换中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })

      if (e) {
        // 判断写入权限
        try {
          fs.accessSync(HOSTS_PATH, fs.constants.W_OK);
        } catch (e) {
          loading.close()
          hosts.status = false
          this.$notify.error('没有写入权限')
          return false
        }

        // 写入hosts
        fs.writeFileSync(HOSTS_PATH, hosts.content);

        // 更改数据库状态
        this.$ingress.db.hosts.trueToFalse().then(_ => {
          hosts.status = true
          this.$ingress.db.hosts.update(hosts).then(_ => {
            this.getHostsGroup()
            loading.close()
          })
        })
      } else {
        let timeout = setTimeout(_ => {
          clearTimeout(timeout)
          hosts.status = true
          loading.close()
        }, 300)
      }
    },
    addHosts() {
      const group = JSON.stringify(this.$ingress._.map(this.list, 'group'))
      this.$router.push({name: 'hosts-detail', params: {type: 'create', group}})
    },
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
  margin: 24px 0 12px 0;
  padding: 0 8px;
  height: calc(100% - 128px);
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

  .switch-container {
    display: flex;
    height: 36px;
    margin-right: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .hosts-info {
      font-size: 16px;
      font-weight: 600;
      margin-right: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .save-hosts-name {
        margin-left: 10px;
      }
    }
    .pure-hosts-name {
      cursor: pointer;
    }
    .hosts-actions {
      display: flex;
      height: 36px;
      flex-direction: row;
      align-items: center;
      .hosts-action-action {
        margin-right: 16px;
        font-size: 15px;
        cursor: pointer;
      }
      .hosts-action-edit {
        color: #409EFF;
      }
      .hosts-action-delete {
        color: #F56C6C;
      }
    }
  }
}
.new {
  width: 100%;
}
</style>
