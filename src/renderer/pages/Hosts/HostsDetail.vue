<template>
  <div class="main">
    <div class="header">
      <div class="back" @click="back"><i class="el-icon-back" style="margin-right: 8px"></i>返回</div>
      <div class="actions">
        <div class="save" @click="save"><el-button type="success" size="mini" :disabled="saveForm.content === ''">保存</el-button></div>
        <div class="cancel" @click="back"><el-button type="info" size="mini">取消</el-button></div>
      </div>
    </div>
    <codemirror class="code" v-model="saveForm.content" :options="cmOptions"></codemirror>

    <el-dialog title="保存" :visible.sync="saveFormVisible">
      <el-form :model="saveForm">
        <el-form-item label="分组类型" label-width="75px">
          <el-switch v-model="groupFormTypeSwitch" active-color="#13ce66" inactive-color="#ff4949" active-text="选择已有分组" inactive-text="新增分组"></el-switch>
        </el-form-item>
        <el-form-item label="分组" label-width="75px" v-if="groupFormTypeSwitch">
          <el-select v-model="saveForm.group" placeholder="请选择分组" size="mini">
            <el-option :label="group" :value="group" v-for="(group, index) in groupList" :key="index">{{group}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新增分组" label-width="75px" v-else>
          <el-input v-model="saveForm.group" placeholder="请填写名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="75px">
          <el-input v-model="saveForm.name" placeholder="请填写名称" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveHosts" size="mini" :loading="saveLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { codemirror } from 'vue-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/lua/lua.js';

export default {
  name: "HostsDetail",
  components: {
    codemirror
  },
  data() {
    return {
      saveForm: {
        content: '# 127.0.0.1    localhost',
        group: '',
        name: '',
      },
      groupList: [],
      type: '',
      id: '',
      groupFormTypeSwitch: true,
      saveFormVisible: false,
      saveLoading: false,
      cmOptions: {
        lineNumbers: true,
        matchBrackets: true,
        readOnly: false,
        mode: 'text/plain',
        theme: 'material',
        tabSize: 4,
        line: true
      }
    }
  },
  mounted() {
    const { type, group } = this.$route.params
    this.type = type
    this.groupList = JSON.parse(group)
    if (type === 'edit') {
      this.id = this.$route.params.id
      this.init()
    }
  },
  methods: {
    init() {
      this.$ingress.db.hosts.findOne(this.id).then(res => {
        this.saveForm = res
      })
    },
    back() {
      this.$router.back()
    },
    save() {
      this.saveFormVisible = true
    },
    saveHosts() {
      this.saveLoading = true
      if (this.type === 'edit') {
        this.saveForm._id = this.id
        this.$ingress.db.hosts.update(this.saveForm)
      } else {
        this.$ingress.db.hosts.create(this.saveForm)
      }
      this.saveLoading = false
      this.saveFormVisible = false
      this.$message.success('保存成功！')
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    }
    .actions {
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .save {
        margin-right: 16px;
      }
    }
  }
  .code {
    margin-top: 16px;
    height: calc(100% - 60px);
    ::v-deep .CodeMirror {
      height: calc(100% - 30px);
    }
  }
}
</style>
