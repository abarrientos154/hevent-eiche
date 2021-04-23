<template>
  <div>
    <div v-if="imagenes.length > 0" style="height:100px;border-radius:12px;width:100%" class="row justify-between">
      <q-card class="q-ml-sm q-mr-sm q-mt-sm" v-for="(item, index) in imagenes" :key="index" style="height:100px;border-radius:12px;width:140px">
        <q-img :src="baseu + 'file_proveedor/' + item" style="height:100px;border-radius:12px;width:140px" @click="cambiarPortada(item)" >
          <q-btn @click="confirmEliminar(item)" flat class="absolute all-pointer-events" size="15px" dense icon="delete" color="negative" style="top: 0px; left: 0px" rounded />
        </q-img>
      </q-card>
      <div class="column shadow-3 justify-center items-center q-ma-sm q-ml-sm bg-grey-5" style="height:100px;border-radius:12px;width:140px">
        <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Agregar Imagen</div>
        <q-avatar size="50px">
          <div style="z-index:1">
            <q-file borderless v-model="img" class="button-camera" @input="addImg()" accept=".jpg, image/*">
              <q-icon name="add" class="absolute-center" size="20px" color="white" />
            </q-file>
          </div>
        </q-avatar>
      </div>
    </div>
    <div v-if="imagenes.length === 0" class="column shadow-3 justify-center items-center q-ma-sm q-ml-sm bg-grey-5" style="height:100px;border-radius:12px;width:120px">
      <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Agregar Imagen</div>
      <q-avatar size="50px">
        <div style="z-index:1">
          <q-file borderless v-model="img" class="button-camera" @input="addImg()" accept=".jpg, image/*">
            <q-icon name="add" class="absolute-center" size="20px" color="white" />
          </q-file>
        </div>
      </q-avatar>
    </div>
  </div>
</template>

<script>
import env from '../../../env'
export default {
  data () {
    return {
      imagenes: [
      ],
      img: null,
      baseu: ''
    }
  },
  mounted () {
    this.cargarImagenes()
    this.baseu = env.apiUrl
  },
  methods: {
    cambiarPortada (img) {
      console.log(img, 'img')
      this.$emit('cambiarImg', img)
    },
    cargarImagenes () {
      this.$api.get('users_perfil').then(res => {
        if (res) {
          if (res.images) {
            this.imagenes = res.images
          }
          console.log(res, 'this user')
        }
      })
    },
    async addImg () {
      console.log('add img', this.img)
      if (this.img) {
        var formData = new FormData()
        var files = []
        files[0] = this.img
        formData.append('files', files[0])
        await this.$api.post('subir_archivo_proveedor', formData, {
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
            this.imagenes = res.images
          }
        })
      }
    },
    eliminarImg (nameFile) {
      this.$api.delete('eliminar_archivo_proveedor/' + nameFile).then(res => {
        if (res) {
          this.imagenes = res.images
        }
      })
    },
    confirmEliminar (nameFile) {
      this.$q.dialog({
        title: '¡Atención!',
        message: '¿Esta seguro que Quiere Eliminar Esta Imagen?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.eliminarImg(nameFile)
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
</style>
