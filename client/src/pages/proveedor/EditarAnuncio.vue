<template>
  <div>
    <q-carousel animated v-model="slide" navigation infinite style="height:200px" swipeable >
      <q-carousel-slide :name="item.name" :img-src="item.img" v-for="(item, index) in imagenes" :key="index" >
        <div style="position:absolute;top:0px;left:0px;font-size:20px" class="text-white" >
          <q-btn icon="keyboard_arrow_left" color="white" flat round @click="$router.go(-1)" />
        </div>
      </q-carousel-slide>
    </q-carousel>
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
            <div class="row justify-center">
              <q-btn label="guardar" push style="border-radius:12px; width:300px; height:50px" color="primary" @click="guardarDescripcion()" />
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
          <div class="row justify-center">
            <q-btn label="Contactame" push style="border-radius:12px; width:300px; height:50px" color="primary" />
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
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import PreguntasFrecuentes from '../../components/Proveedor/EditarAnuncio/Preguntas'
import Imagenes from '../../components/Proveedor/EditarAnuncio/Imagenes'
import Videos from '../../components/Proveedor/EditarAnuncio/Videos'
export default {
  components: { PreguntasFrecuentes, Imagenes, Videos },
  data () {
    return {
      panel: 'Descripcion',
      form: {
        descripcion: ''
      },
      slide: 1,
      user: {},
      imagenes: [
        {
          name: 1,
          img: 'example_4.jpg'
        },
        {
          name: 2,
          img: 'example_1.jpg'
        },
        {
          name: 3,
          img: 'example_2.jpg'
        },
        {
          name: 4,
          img: 'example_3.jpg'
        }
      ],
      chips: [
        { name: 'Descripcion', select: true }, { name: 'Preguntas', select: false }, { name: 'Mapas', select: false }, { name: 'Imagenes', select: false },
        { name: 'Videos', select: false }, { name: 'Opiniones', select: false }
      ]
    }
  },
  mounted () {
    this.getUser()
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
