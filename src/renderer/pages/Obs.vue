<template>
  <el-main>
    <div class="header">
      <div class="description">OBS</div>
      <div class="title">OBS推流工具</div>
    </div>
    <div class="main">
      <!--<el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>
      <el-card class="item"></el-card>-->
    </div>
  </el-main>
</template>

<script>
// const osn = require("obs-studio-node");


export default {
  name: "Obs",
  data() {
    return {
      obsInitialized: false
    }
  },
  /*created() {
    osn.NodeObs.IPC.host('obs-studio-node-example'); // Usually some UUIDs go there
    osn.NodeObs.SetWorkingDirectory(path.join(__dirname, 'node_modules', 'obs-studio-node'));
  },*/
  methods: {
    initOBS() {
      console.debug('Initializing OBS...');
      osn.NodeObs.IPC.host('obs-studio-node-example'); // Usually some UUIDs go there
      osn.NodeObs.SetWorkingDirectory(path.join(__dirname, 'node_modules', 'obs-studio-node'));

      const obsDataPath = path.join(__dirname, 'osn-data'); // OBS Studio configs and logs

      // Arguments: locale, path to directory where configuration and logs will be stored, your application version
      const initResult = osn.NodeObs.OBS_API_initAPI('en-US', obsDataPath, '1.0.0');

      if (initResult !== 0) {
        const errorReasons = {
          '-2': 'DirectX could not be found on your system. Please install the latest version of DirectX for your machine here <https://www.microsoft.com/en-us/download/details.aspx?id=35?> and try again.',
          '-5': 'Failed to initialize OBS. Your video drivers may be out of date, or Streamlabs OBS may not be supported on your system.',
        }

        const errorMessage = errorReasons[initResult.toString()] || `An unknown error #${initResult} was encountered while initializing OBS.`;

        console.error('OBS init failure', errorMessage);

        this.shutdown();

        throw Error(errorMessage);
      }
    },
    shutdown() {
      if (!this.obsInitialized) {
        console.debug('OBS is already shut down!');
        return false;
      }

      console.debug('Shutting down OBS...');

      try {
        osn.NodeObs.OBS_service_removeCallback();
        osn.NodeObs.IPC.disconnect();
        this.obsInitialized = false;
      } catch(e) {
        throw Error('Exception when shutting down OBS process' + e);
      }

      console.debug('OBS shutdown successfully');

      return true;
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
</style>
