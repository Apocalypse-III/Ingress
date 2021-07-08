<template>
  <div id="app" v-bind:style="appStyle">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Ingress',
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  watch: {
    $route(to, from) {
      this.pageTitle = to.meta.title
      const toDepth = to.meta.depth
      const fromDepth = from.meta.depth
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
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
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    will-change: transform;
    transition: all 0.3s ease-out;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(0%, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate(100%, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate(0%, 0);
  }
}
</style>
