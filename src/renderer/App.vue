<template>
  <div id="app" v-bind:style="appStyle">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'ingress',
    data() {
      return {
        appStyle: {
          backgroundColor: '#fff',
          borderRadius: '16px'
        }
      }
    },
    mounted() {
      this.initInterfaceFormSetting()
    },
    methods: {
      initInterfaceFormSetting() {
        this.$ingress.db.settings.createOrFind({
          key: 'backgroundColor',
          name: '背景颜色',
          value: '#fff',
          type: 'color'
        }).then(res => {
          this.appStyle.backgroundColor = res.value
        })
        this.$ingress.db.settings.createOrFind({
          key: 'borderRadius',
          name: '边框圆角',
          value: '16',
          type: 'int'
        }).then(res => {
          this.appStyle.borderRadius = res.value !== 0 ? res.value + 'px' : '0'
        })
      },
    }
  }
</script>

<style>
  @import "./assets/fonts/Nunito/Nunito.css";

  /* Fontawesome */
  @import '~@fortawesome/fontawesome-free/css/fontawesome.css';
  @import '~@fortawesome/fontawesome-free/css/regular.css';
  @import '~@fortawesome/fontawesome-free/css/solid.css';
  @import '~@fortawesome/fontawesome-free/css/brands.css';

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
