<template>
  <div>
    <q-btn label="prueba" @click="test" />
    <div class="q-pa-md"  >
      <!-- <q-video src="https://www.dailymotion.com/video/x7xv5t2?playlist=x6niml" style="height:150px;width:100%" /> -->
      <!-- <q-img :src="baseu + 'test_file'" /> -->
    </div>
      <div class="column">
        <div class="container q-ml-md q-mt-xl" style="width:490px; height:120px">
          <my-video :sources="video.sources" :options="video.options"></my-video>
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
          volume: 1,
          poster: ''
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
          volume: 1,
          poster: ''
        }
      }
    }
  },
  mounted () {
    this.baseu = env.apiUrl
    this.video.sources[0].src = this.baseu + 'test_file/prueba.mp4'
    this.videoT.sources[0].src = this.baseu + 'test_file/video'
  },
  methods: {
    test () {
      console.log('esto es un test')
    }
  }
}
</script>

<style>

</style>>
