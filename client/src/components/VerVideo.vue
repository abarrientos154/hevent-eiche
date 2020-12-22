<template>
  <q-card class="fit q-pa-md" style="max-width: 400px">
    <div style="position:absolute;top: 10px;right:0px;z-index:1">
      <q-btn icon="highlight_off" flat color="grey-5" v-close-popup round />
    </div>
    <div class="container q-mt-xl q-ml-md" style="width:90%; height:220px">
      <my-video :sources="video.sources" :options="video.options"></my-video>
    </div>
  </q-card>
</template>

<script>
import env from '../env'
import myVideo from 'vue-video'
export default {
  props: ['filename'],
  components: {
    myVideo
  },
  data () {
    return {
      baseu: '',
      video: {
        sources: [
          {
            src: '',
            type: 'video/mp4'
          }
        ],
        options: {
          autoplay: false,
          volume: 0.1,
          poster: 'https://heventapp.com/favicon.ico'
        }
      }
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'file_proveedor_video/' + this.filename
    this.video.sources[0].src = this.baseu
    console.log(this.baseu, 'baseu')
  }
}
</script>

<style>

</style>
