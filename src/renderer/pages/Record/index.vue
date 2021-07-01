<template>
  <el-main>
    <div class="header">
      <div class="description">屏幕录制</div>
      <div class="title">屏幕录制</div>
    </div>
    <div class="container">
      <div class="status-group">
        <div class="group-left">
          <el-button type="primary" size="mini" @click="start" v-if="! recorderStatus">开始录制</el-button>
          <el-button type="danger" size="mini" @click="stop" v-else>结束录制</el-button>
        </div>
        <div class="group-right">
          <div>{{recorderStatus ? '录制中...' : '空闲中'}}</div>
        </div>
      </div>
      <div class="video-container">
        <video id="video-preview" src="" autoplay></video>
      </div>
    </div>
  </el-main>
</template>

<script>
import { desktopCapturer, remote, shell, ipcRenderer } from "electron"
import path from "path"
import fs from "fs"

export default {
  name: "record",
  data() {
    return {
      mediaRecorder: null,
      chunks: [],
      stream: null,
      recorderStatus: false,
    }
  },
  async mounted() {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "screen",
          chromeMediaSourceId: sources[0].id,
        },
      },
    });

    const video = document.querySelector("#video-preview");
    video.srcObject = this.stream;
  },
  methods: {
    async start() {
      if (this.mediaRecorder) return;

      this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: "video/webm; codecs=vp9" });
      // this.mediaRecorder = new MediaRecorder(stream, { mimeType: "video/mp4" });
      this.mediaRecorder.ondataavailable = (event) => {
        event.data.size > 0 && this.chunks.push(event.data);
      };

      this.mediaRecorder.start();
      this.updateStatusText(true)
    },
    stop(){
      if(! this.mediaRecorder) return

      this.mediaRecorder.onstop = async () => {
        const blob = new Blob(this.chunks, { type: "video/webm" });
        const buffer = Buffer.from(await blob.arrayBuffer());
        const filePath = path.resolve(remote.app.getPath("downloads"), `${Date.now()}.webm`);

        fs.writeFile(filePath, buffer, () => {
          // shell.openPath(filePath);
          this.mediaRecorder = null;
          this.chunks = []
        });
      };
      this.mediaRecorder.stop();
      this.updateStatusText(false)
    },
    updateStatusText(status){
      this.recorderStatus = status
    },
  },
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
.container {
  margin: 24px 0 12px 0;
  padding: 0 8px;
  height: calc(100% - 100px);
  overflow-y: auto;
  .status-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .video-container {
    margin-top: 12px;
    height: calc(100% - 40px);
    video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
