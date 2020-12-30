<template>
  <div>
    <q-carousel animated v-model="slide" navigation infinite style="height:200px" swipeable v-if="user.images && user.images.length > 1">
      <q-carousel-slide :name="index" :img-src="baseu + 'file_proveedor/' + item" v-for="(item, index) in user.images" :key="index" >
        <div style="position:absolute;top:0px;left:0px;font-size:20px" class="text-white" >
          <q-btn icon="keyboard_arrow_left" color="white" flat round @click="$router.go(-1)" />
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-img v-if="user.images" :src="user.images.length === 1
      ? baseu + 'file_proveedor/' + user.images[0]
      : user.images.length === 0
      ? 'portada_proveedor.png'
      : 'portada_proveedor.png' " style="height:200px">
      <q-btn icon="keyboard_arrow_left" color="white" flat round @click="$router.go(-1)" style="position:absolute;top:0px;left:0px;font-size:20px" />
    </q-img>
    <q-img v-else :src="'portada_proveedor.png' " style="height:200px">
      <div style="position:absolute;top:0px;left:0px;font-size:20px" class="text-white" >
        <q-btn icon="keyboard_arrow_left" color="white" flat round @click="$router.go(-1)" />
      </div>
    </q-img>
    <div class="row justify-end q-mr-sm q-mt-xs">
      <q-btn rounded size="10px" color="primary" label="Ver anuncio" />
    </div>
    <div class="q-ml-xl q-mr-xl q-mt-lg text-grey-7 text-bold">
      {{user.name}}
    </div>
    <div class="row justify-center q-mt-lg">
      <q-chip @click="chipClick(index)" square dense class="q-pa-sm q-ml-md q-mt-sm" :color="chip.select ? 'grey-9' :'grey-5'" text-color="white" v-for="(chip, index) in chips" :key="index" clickable>
        {{chip.name}}
      </q-chip>
    </div>
    <div>
      <q-tab-panels v-model="panel" animated class="bg-grey-4 q-mt-md" style="border-top-left-radius:20px;border-top-right-radius:20px;height:250px">
        <q-tab-panel name="Descripcion">
          <div class="column">
            <div class="text-h6 text-grey-9">Descripcion</div>
            <div>
              <q-input borderless v-model="user.descripcion" class="full-widht full-height" style="height:500px" oulined type="textarea" />
            </div>
            <div class="row justify-center absolute-bottom q-mb-sm">
              <q-btn label="guardar" class="gradiente-buttom" push style="border-radius:12px; width:300px; height:50px" @click="guardarDescripcion()" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="Preguntas">
          <div class="text-h6 text-grey-9">Preguntas Frecuentes</div>
          <preguntas-frecuentes />
        </q-tab-panel>

        <q-tab-panel name="Mapas">
          <div class="text-h6 text-grey-9">Mapa de Ubicación</div>
          <div class="text-subtitle2 q-ma-md text-grey-9 text-capitalize"> {{user.direccion}} - {{user.ciudad}} </div>
          <div class="row justify-center absolute-bottom q-mb-sm">
            <q-btn label="Contactame" class="gradiente-buttom" push style="border-radius:12px; width:300px; height:50px" />
          </div>
        </q-tab-panel>

        <q-tab-panel name="Imagenes">
          <div class="text-h6 text-grey-9">Imagenes</div>
          <imagenes />
        </q-tab-panel>

        <q-tab-panel name="Videos">
          <div class="text-h6 text-grey-9">Videos</div>
          <videos />
        </q-tab-panel>

        <q-tab-panel name="Opiniones">
          <div class="text-h6 text-grey-9">Opiniones</div>
          <opiniones />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import PreguntasFrecuentes from '../../components/Proveedor/EditarAnuncio/Preguntas'
import Imagenes from '../../components/Proveedor/EditarAnuncio/Imagenes'
import Videos from '../../components/Proveedor/EditarAnuncio/Videos'
import env from '../../env'
import Opiniones from '../../components/Proveedor/EditarAnuncio/Opiniones.vue'
export default {
  components: { PreguntasFrecuentes, Imagenes, Videos, Opiniones },
  data () {
    return {
      panel: 'Descripcion',
      form: {
        descripcion: ''
      },
      slide: 1,
      user: {},
      chips: [
        { name: 'Descripcion', select: true }, { name: 'Preguntas', select: false }, { name: 'Mapas', select: false }, { name: 'Imagenes', select: false },
        { name: 'Videos', select: false }, { name: 'Opiniones', select: false }
      ]
    }
  },
  mounted () {
    this.getUser()
    this.baseu = env.apiUrl
  },
  methods: {
    getUser () {
      this.$api.get('users_perfil').then(res => {
        if (res) {
          this.user = res
          console.log(this.user, 'this user')
        }
      })
    },
    chipClick (index) {
      const chips = this.chips
      const indexChip = chips.findIndex(v => v.select === true)
      chips[indexChip].select = false
      chips[index].select = true
      this.chips = chips
      this.panel = chips[index].name
    },
    async guardarDescripcion () {
      this.$q.loading.show()
      await this.$api.post('guardar_descripcion_proveedor', this.user).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Descripcion Guardada Exitosamente',
            color: 'positive'
          })
          this.getUser()
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>
