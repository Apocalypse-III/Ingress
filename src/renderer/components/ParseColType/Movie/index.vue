<template>
  <div class="default-movie" v-bind:style="movieStyle" @click="urlProcess(url)">
    <div class="movie-pic">
      <el-image :src="picUrl" class="movie-pic-image" fit="cover"></el-image>
    </div>
    <div class="movie-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "default-movie",
  props: {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    picUrl: {
      type: String,
    },
    customStyle: {
      type: Object,
      default: () => {
        return {

        }
      }
    },
  },
  data() {
    return {

    }
  },
  computed: {
    movieStyle() {
      return {
        height: this.customStyle.height + 'px',
        lineHeight: this.customStyle.height + 'px',
        backgroundColor: this.customStyle.background,
        color: this.customStyle.color,
      }
    },
  },
  methods: {
    async fetchImage(image) {
      const response = await fetch(image)
      const myBlob = await response.blob();

      return URL.createObjectURL(myBlob);
    },
    urlProcess(url) {
      this.$emit('urlProcess', url, this.title)
    },
  },
}
</script>

<style scoped lang="scss">
.default-movie {
  cursor: pointer;
  .movie-pic {
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    .movie-pic-image {
      width: 100%;
      height: 100%;
    }
  }
  .movie-title {
    padding: 4px 8px;
    text-align: center;
    color: #767676;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
}
</style>