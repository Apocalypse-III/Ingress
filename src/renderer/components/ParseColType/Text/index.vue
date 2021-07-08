<template>
  <div class="default-text" v-bind:style="textStyle">{{title}}</div>
</template>

<script>
export default {
  name: "default-text",
  props: {
    title: {
      type: String,
    },
    customStyle: {
      type: Object,
      default: () => {
        return {
          height: 36,
          background: '#f7f7f7',
          color: '#767676',
        }
      }
    },
  },
  data() {
    return {

    }
  },
  computed: {
    textStyle() {
      return {
        height: this.customStyle.height + 'px',
        lineHeight: this.customStyle.height + 'px',
        backgroundColor: this.customStyle.background,
        color: this.customStyle.color,
      }
    },
  }
}
</script>

<style scoped lang="scss">
.default-text {
  padding: 0 8px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
}
</style>