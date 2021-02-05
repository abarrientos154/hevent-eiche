<template>
  <div>
    <div v-if="imagenes && imagenes.length > 0" style="height:100px;border-radius:12px;width:100%" class="row justify-between">
      <q-card class="q-ml-sm q-mr-sm q-mt-sm" v-for="(item, index) in imagenes" :key="index" style="height:100px;border-radius:12px;width:140px">
        <q-img :src="baseu + 'file_proveedor/' + item" style="height:100px;border-radius:12px;width:140px" @click="cambiarPortada(item)" >
        </q-img>
      </q-card>
    </div>
    <div v-else>
      <div class="text-center text-grey-8 absolute-center text-capitalize">
        El proveedor no ha subido ninguna imagen
      </div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  props: ['id_proveedor'],
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
      this.$api.get('info_proveedor/' + this.id_proveedor).then(res => {
        if (res) {
          if (res.images) {
            this.imagenes = res.images
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
</style>
