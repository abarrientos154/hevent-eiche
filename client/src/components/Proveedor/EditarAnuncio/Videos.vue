<template>
  <div>
    <div v-if="videos.length > 0" style="height:100px;border-radius:12px;width:100%" class="row justify-between">
      <q-card class="q-ml-sm q-mr-sm q-mt-sm fondo-video-default bg-primary" v-for="(item, index) in videos" :key="index" style="height:100px;border-radius:24px;width:140px">
        <!-- <q-video :src="baseu + 'file_proveedor_video/' + item" style="height:100px;border-radius:12px;width:140px" />
        <div class="text-center text-primary q-mb-sm q-mt-sm" style="text-decoration: underline">Reproducir</div>
        <q-icon class="absolute-center q-mt-sm" v-ripple name="play_circle_outline" color="primary" style="z-index:0" size="lg" />-->
        <q-btn @click="dialog = true, fileName = item" flat class="absolute-center all-pointer-events gradiente-buttom" size="20px" dense icon="play_arrow" rounded />
        <q-btn @click="confirmEliminar(item)"  flat class="absolute all-pointer-events" size="15px" dense icon="delete" color="negative" style="top: 2px; left: 5px" rounded />
      </q-card>
      <div class="column shadow-3 justify-center items-center q-ma-sm q-ml-sm bg-grey-5" style="height:100px;border-radius:12px;width:140px">
        <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Agregar Video</div>
        <q-avatar size="50px">
          <div style="z-index:1">
            <q-file borderless v-model="video" class="button-camera" @input="addVid()" accept=".mp4, video/*">
              <q-icon name="add" class="absolute-center" size="20px" color="white" />
            </q-file>
          </div>
        </q-avatar>
      </div>
    </div>
    <div v-if="videos.length === 0" class="column shadow-3 justify-center items-center q-ma-sm q-ml-sm bg-grey-5" style="height:100px;border-radius:12px;width:120px">
      <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Agregar Video</div>
      <q-avatar size="50px">
        <div style="z-index:1">
          <q-file borderless v-model="video" class="button-camera" @input="addVid()" accept=".mp4, video/*">
            <q-icon name="add" class="absolute-center" size="20px" color="white" />
          </q-file>
        </div>
      </q-avatar>
    </div>
    <q-dialog v-model="dialog" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <ver-video :filename="fileName" />
    </q-dialog>
  </div>
</template>

<script>
import env from '../../../env'
import VerVideo from '../../../components/VerVideo'
export default {
  components: {
    VerVideo
  },
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
      this.$api.get('users_perfil').then(res => {
        if (res) {
          if (res.videos) {
            this.videos = res.videos
          }
          console.log(res, 'this user')
        }
      })
    },
    async addVid () {
      console.log('add video', this.video)
      if (this.video) {
        var formData = new FormData()
        var files = []
        files[0] = this.video
        formData.append('files', files[0])
        await this.$api.post('subir_archivo_proveedor_video', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res.error) {
            this.$q.notify({
              color: 'negative',
              message: res.message
            })
          } else if (res) {
            console.log(res, 'respuesta')
            this.videos = res.videos
          }
        })
      }
    },
    eliminarVid (nameFile) {
      this.$api.delete('eliminar_archivo_proveedor_video/' + nameFile).then(res => {
        if (res) {
          this.videos = res.videos
        }
      })
    },
    confirmEliminar (nameFile) {
      this.$q.dialog({
        title: '¡Atención!',
        message: '¿Esta seguro que Quiere Eliminar Este Video?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.eliminarVid(nameFile)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
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
  background-image: url('../../../../public/proveedor-video-default.png');
  background-size: 100% 100%;
  background-color: $primary;
}
</style>
