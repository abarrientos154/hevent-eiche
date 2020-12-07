<template>
  <div>
    <q-btn label="prueba" @click="test" />
    <div class="q-pa-md"  >
      <!-- <q-video src="https://www.dailymotion.com/video/x7xv5t2?playlist=x6niml" style="height:150px;width:100%" /> -->
      <!-- <q-img :src="baseu + 'test_file'" /> -->
    </div>
      <div class="column">
        <div class="container q-ml-md q-mt-xl" style="width:190px; height:120px">
          <my-video :sources="video.sources" :options="video.options"></my-video>
        </div>
        <div class="container q-ml-md" style="width:190px; height:120px">
          <my-video :sources="videoT.sources" :options="videoT.options"></my-video>
        </div>
      </div>
  </div>
</template>

<script>
import env from '../env'
import myVideo from 'vue-video'
export default {
  components: {
    myVideo
  },
  data () {
    return {
      baseu: '',
      video: {
        sources: [
          {
            src: 'http://covteam.u.qiniudn.com/oceans.mp4',
            type: 'video/mp4'
          }
        ],
        options: {
          autoplay: false,
          volume: 0.1,
          poster: 'http://slimedeal.eichechile.com/app-logo-128x128.png'
        }
      },
      videoT: {
        sources: [
          {
            src: 'http://covteam.u.qiniudn.com/oceans.mp4',
            type: 'video/mp4'
          }
        ],
        options: {
          autoplay: false,
          volume: 0.1,
          poster: 'http://slimedeal.eichechile.com/app-logo-128x128.png'
        }
      }
    }
  },
  mounted () {
    this.baseu = env.apiUrl
    this.video.sources[0].src = this.baseu + 'test_file/mivideo'
    this.videoT.sources[0].src = this.baseu + 'test_file/CXdfhdoJ3ctsgte3L2D1w6qAQbpJSV'
  },
  methods: {
  }
}
</script>

<style>

</style>>
