<template>
  <div>
    <div style="position:absolute;top:0px;left:0px;font-size:20px;z-index:2" class="text-white" >
      <q-btn icon="keyboard_arrow_left" color="white" flat round @click="$router.go(-1)" />
    </div>
    <div style="position:absolute;top:0px;right:0px;font-size:20px;z-index:2" class="text-white" v-if="!isAnuncioP" >
      <q-btn :icon="favorito ? 'favorite' : 'favorite_border'" :color="favorito ? 'primary': 'white'" flat round @click="addFavoritos()" />
    </div>
    <!-- <div class="fondo-para-nube-anuncio" style="width:100%;height:200px;z-index:1">
    </div> -->
    <q-carousel animated v-model="slide" navigation infinite style="height:200px;z-index:0" swipeable v-if="user.images && user.images.length > 1">
      <q-carousel-slide :name="index" :img-src="baseu + 'file_proveedor/' + item" v-for="(item, index) in user.images" :key="index" >
      </q-carousel-slide>
    </q-carousel>
    <q-img v-else-if="user.images" :src="user.images
      ? baseu + 'file_proveedor/' + mostrarImg
      : user.images.length === 0
      ? 'portada_proveedor.png'
      : 'portada_proveedor.png' " style="height:200px;z-index:-1;">
    </q-img>
    <q-img v-else :src="baseu + 'file_proveedor/portada/' + user._id " style="height:200px;z-index:-1">
    </q-img>
    <div class="q-ml-xl q-mr-xl q-mt-lg text-grey-7 text-bold">
      {{user.name}}
    </div>
    <div class="row justify-center q-mt-lg">
      <q-chip @click="chipClick(index)" square dense class="q-pa-sm q-ml-md q-mt-sm" :color="chip.select ? 'grey-9' :'grey-5'" text-color="white" v-for="(chip, index) in chips" :key="index" clickable>
        {{chip.name}}
      </q-chip>
    </div>
    <div>
      <q-tab-panels v-model="panel" animated class="q-mt-md" style="border-top-left-radius:20px;border-top-right-radius:20px;height:350px">
        <q-tab-panel name="Descripcion">
          <div class="column full-height ">
            <div>
              <div class="text-h6 text-grey-9">Descripcion</div>
            </div>
            <div class="q-pa-sm bg-grey-4" style="height:70%;border-radius:12px">
              <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height:100%; width:100%" >
                <p class="q-pa-sm">
                  {{user.descripcion}}
                </p>
              </q-scroll-area>
            </div>
            <div class="col" v-if="otherProviders.length > 0">
              <div class="text-h6 text-primary">Recomendados</div>
              <q-scroll-area horizontal style="height: 350px; width: 100%;" class="rounded-borders q-mb-md q-mt-sm q-ml-sm" >
                <div class="row no-wrap q-gutter-sm">
                  <div class="column" v-for="(card, index) in otherProviders" :key="index">
                    <div class="text-center q-mt-sm text-bold text-primary"> {{card.name}} </div>
                    <q-card class="forma-card-info bg-primary">
                      <q-img :src="baseu + 'file_proveedor/portada/' + card._id" style="height:90%"></q-img>
                      <q-btn dense class="full-width gradiente-buttom" push style="border-radius:6px" label="mas informacion" size="10px"
                        @click="masInformacion(card._id)"
                      />
                    </q-card>
                  </div>
                </div>
              </q-scroll-area>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="Preguntas">
          <div class="text-h6 text-grey-9">Preguntas Frecuentes</div>
          <preguntas-frecuentes :id_proveedor="id" />
        </q-tab-panel>

        <q-tab-panel name="Mapas">
          <div class="bg-grey-4 q-pa-md q-mb-md" style="height:75vh; border-radius:12px">
            <div class="text-h6 text-grey-9">Mapa de Ubicación</div>
            <div class="text-subtitle2 q-ma-md text-grey-9 text-capitalize">{{user.direccionCad}} </div>
            <mapa :center="user.ubicacion" :zoom="10" @getBounds="getBounds" @newPlace="handleNewPlace" :withoutDirection="true" />
          </div>
        </q-tab-panel>

        <q-tab-panel name="Imagenes" class="bg-grey-4">
          <div class="text-h6 text-grey-9">Imagenes</div>
          <imagenes @cambiarImg="cambiarImg" :id_proveedor="id" />
        </q-tab-panel>

        <q-tab-panel name="Videos" class="bg-grey-4">
          <div class="text-h6 text-grey-9">Videos</div>
          <videos :id_proveedor="id" />
        </q-tab-panel>

        <q-tab-panel name="Opiniones" class="bg-grey-4">
          <div class="text-h6 text-grey-9">Opiniones de Usuario</div>
          <opiniones :id_proveedor="id" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-dialog v-model="showEvents">
      <modal-eventos @goChat="goChat" />
    </q-dialog>
    <div class="absolute-bottom full-width row justify-center q-mb-sm" style="height:50px">
      <q-btn :disable="isAnuncioP" class="gradiente-buttom" label="contactame" @click="showEvents = true" style="width:70%;height:50px" push />
    </div>
  </div>
</template>

<script>
import ModalEventos from '../../components/ModalEventos'
import PreguntasFrecuentes from '../../components/anuncio/Preguntas'
import Imagenes from '../../components/anuncio/Imagenes'
import Videos from '../../components/anuncio/Videos'
import env from '../../env'
import Opiniones from '../../components/anuncio/Opiniones'
import Mapa from '../../components/GoogleMap'
export default {
  components: { PreguntasFrecuentes, Imagenes, Videos, Opiniones, Mapa, ModalEventos },
  data () {
    return {
      baseu: env.apiUrl,
      basico: true,
      otherProviders: [],
      isAnuncioP: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '2px',
        opacity: 0.75
      },
      favorito: false,
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '2px',
        opacity: 0.1
      },
      showEvents: false,
      id: this.$route.params.id,
      panel: 'Descripcion',
      mostrarImg: '',
      form: {
        descripcion: ''
      },
      slide: 1,
      user: {},
      chips: [
        { name: 'Descripcion', select: true }, { name: 'Preguntas', select: false }, { name: 'Mapas', select: false },
        { name: 'Imagenes', select: false }, { name: 'Videos', select: false }, { name: 'Opiniones', select: false }
      ]
    }
  },
  async mounted () {
    this.baseu = env.apiUrl
    await this.getUser()
    this.getFavorito()
    if (this.$route.params.anuncio) {
      this.isAnuncioP = true
    }
    this.proveedoresPlanPremiun()
  },
  methods: {
    async masInformacion (id) {
      this.$q.loading.show()
      this.$router.push('/proveedor/alimentos/' + id)
      await this.$api.post('impressions/' + id).then(res => {
        this.$q.loading.hide()
        console.log(res, 'res impresiones')
      })
      location.reload()
    },
    proveedoresPlanPremiun () {
      if (this.basico) {
        this.$api.get('proveedores_premiun').then(res => {
          this.otherProviders = res
          console.log(this.otherProviders, 'proveedores premiun')
        })
      }
    },
    getFavorito () {
      this.$api.get('favoritos/' + this.id).then(res => {
        this.favorito = res.favorito
      })
    },
    addFavoritos () {
      this.$api.post('favoritos/' + this.id).then(res => {
        this.getFavorito()
      })
    },
    getBounds (bounds, center) {
      console.log(center, 'center')
    },
    handleNewPlace (place, coordinates) {
      console.log('handleNewPlace', coordinates)
      this.form.ubicacion = coordinates
      console.log(this.form, 'formmmmmmmmmmmmmmmmmmmmmmm')
    },
    cambiarImg (img) {
      console.log('entro', img)
      this.mostrarImg = img
    },
    async getUser () {
      console.log(this.id, 'idddddddd')
      await this.$api.get('info_proveedor/' + this.id).then(res => {
        if (res) {
          console.log(res, 'res')
          this.user = res
          if (res.images) {
            this.mostrarImg = res.images[0]
          } else {
            this.mostrarImg = 'portada_proveedor.png'
          }

          if (res.plan_id > 1) { this.basico = false }
          console.log(this.user, 'this user', this.basico, 'basico')
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
    },
    goChat (event) {
      console.log(event, 'eventttttt')
      this.$api.get('create_cotization/' + this.id + '/' + event._id).then(v => {
        if (v) {
          this.$router.push('/chat/' + v._id)
        }
      })
    }
  }
}
</script>

<style>
.fondo-para-nube-anuncio {
  background-image: url('../../../public/nube-carousel.png');
  background-size: 100% 100%;
}
.bordes-bottom-descripcion {
  border-radius: 20px;
}
.forma-card-info {
  border-radius: 12px;
  height: 230px;
  width: 170px;
}
</style>
