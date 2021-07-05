<template>
  <div id="app" v-bind:style="appStyle">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Ingress',
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
    ...mapActions('AppStyle', ['changeAllStyle']),
    initInterfaceFromSetting() {
      this.$ingress.utils.initAppStyle(this).then(res => {
        if (res instanceof Array && res.length > 0) res.forEach(style => this.changeAllStyle(style))
      })
    },
  }
}
</script>

<style lang="scss">
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
  &::-webkit-scrollbar {
    display: none;
  }
}

body {
  font-family: 'Nunito', 'Source Sans Pro', sans-serif;
  user-select: none;
  cursor: default;
}

#app {
  height: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    //border-radius: 4px;
    background-color: #e1e1e1;
  }
  ::-webkit-scrollbar-track {
    //border-radius: 4px;
    background-color: #e1e1e1;
  }
  ::-webkit-scrollbar-thumb {
    //border-radius: 4px;
    background: deepskyblue;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
}
</style>
