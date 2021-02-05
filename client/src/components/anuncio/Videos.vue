<template>
  <div v-if="videos && videos.length > 0">
    <div v-if="videos.length > 0" style="height:100px;border-radius:12px;width:100%" class="row justify-between">
      <q-card class="q-ml-sm q-mr-sm q-mt-sm fondo-video-default bg-primary" v-for="(item, index) in videos" :key="index" style="height:100px;border-radius:24px;width:140px">
        <q-btn @click="dialog = true, fileName = item" flat class="absolute-center all-pointer-events gradiente-buttom" size="20px" dense icon="play_arrow" rounded />
      </q-card>
    </div>
    <q-dialog v-model="dialog" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <ver-video :filename="fileName" />
    </q-dialog>
  </div>
  <div v-else>
    <div class="text-center text-grey-8 absolute-center text-capitalize">
        El proveedor no ha subido ningún video
      </div>
  </div>
</template>

<script>
import env from '../../env'
import VerVideo from '../VerVideo'
export default {
  components: {
    VerVideo
  },
  props: ['id_proveedor'],
  data () {
    return {
      videos: [
      ],
      video: null,
      baseu: '',
      dialog: false,
      fileName: ''
    }
  },
  mounted () {
    this.cargarVideos()
    this.baseu = env.apiUrl
  },
  methods: {
    cargarVideos () {
      this.$api.get('info_proveedor/' + this.id_proveedor).then(res => {
        if (res) {
          if (res.videos) {
            this.videos = res.videos
          }
          console.log(res, 'this user')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  background-color: $primary;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width:40px
}
.fondo-video-default {
  background-image: url('../../../public/proveedor-video-default.png');
  background-size: 100% 100%;
  background-color: $primary;
}
</style>
