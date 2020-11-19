<template>
  <div id="app" v-bind:style="appStyle">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'ingress',
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters('AppStyle', ['appStyle']),
    },
    mounted() {
      this.initInterfaceFromSetting()
    },
    methods: {
      ...mapActions('AppStyle', ['changeAppStyle']),
      initInterfaceFromSetting() {
        this.$ingress.db.settings.createOrFind({
          key: 'style.app.backgroundColor',
          name: '背景颜色',
          value: '#fff',
          type: 'color'
        }).then(res => {
          this.changeAppStyle({key: 'backgroundColor', value: res.value})
        })
        this.$ingress.db.settings.createOrFind({
          key: 'style.app.borderRadius',
          name: '边框圆角',
          value: 16,
          type: 'int'
        }).then(res => {
          this.changeAppStyle({key: 'borderRadius', value: res.value !== 0 ? res.value + 'px' : '0'})
        })
      },
    }
  }
</script>

<style>
  @import "./assets/fonts/Nunito/Nunito.css";

  @font-face {
    font-family: "AlexBrush";
    src: url("./assets/fonts/AlexBrush-Regular.ttf");
  }
  /* CSS */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: 'Nunito', 'Source Sans Pro', sans-serif;
    user-select: none;
    cursor: default;
  }

  #app {
    height: 100%;
    overflow: hidden;
  }
</style>
