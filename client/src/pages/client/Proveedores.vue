<template>
  <q-page class="q-pa-sm">
    <div class="col full-width">
      <div header class="column">
        <div class="row">
          <div class="col-3">
              <q-btn flat color="primary" round style="width: 50px" icon="keyboard_arrow_left" @click="$router.go(-1)"/>
          </div>
          <q-space />
          <q-btn flat round color="grey" icon="favorite_border" />
        </div>
        <div class="row justify-center">
          <div>
            <q-input class="input-border q-pl-sm" label-color="grey-14" type="email" v-model="busqueda" dense label="¿Que estas Buscando?" borderless style="width:300px" />
          </div>
          <q-btn flat round color="black" icon="tune" />
        </div>
      </div>
      <div class="column">
        <div class="text-center text-h6 text-grey-6 q-mt-md"> Escoger Proveedores </div>
        <q-scroll-area horizontal class="bg-grey-1 full-width" style="height:120px" :thumb-style="thumbStyle" :content-style="contentStyle"
          :content-active-style="contentActiveStyle" >
          <div class="row no-wrap">
            <div v-for="(serv, index) in servicios" :key="index" style="width:90px; height:40px;" class="q-mt-lg q-ml-md" @click="cambiarProveedor(serv.id)">
              <div class="column items-center justify-center q-ml-sm border-servicios-item">
                <q-img :src="serv.icon" style="width:35px;height:35px;" />
                <div class="row justify-center items-center text-grey-7"> {{serv.title}} </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="row q-gutter-sm">
        <div style="width:170px;height:300px; border-radius:20px" v-for="(item, index) in proveedores" :key="index" @click="$router.push('/proveedor/' + $route.params.id + '/' + item.id_proveedor)" >
          <div class="column full-width justify-center items-center">
            <div class="text-bold text-grey-7 q-pl-sm q-pr-sm" > * {{item.name}} * </div>
            <q-card style="width: 100%; height:260px" class="border-items" >
              <q-img style="width:100%;height:100%" :src="baseu + item.id_proveedor" />
              <div style="position:absolute; bottom:0px;border-top-left-radius:8px;border-top-right-radius:8px;border-bottom-left-radius:0px;border-bottom-right-radius:0px" class="row justify-center full-width bg-white" >
               <!-- <div class="text-h6 text-primary"> $1.200,00 </div>-->
                <q-btn class="gradiente-buttom full-width" push style="border-radius:7px" dense label="mas información" />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      busqueda: '',
      header: '',
      id: '',
      proveedores: [],
      servicios: [
        { title: 'Localización', id: 'localizacion', icon: 'icon_services/locacion.png', select: true },
        { title: 'Alimentos', id: 'alimentos', icon: 'icon_services/alimentos.png', select: false },
        { title: 'Bebidas', id: 'bebidas', icon: 'icon_services/bebidas.png', select: false },
        { title: 'Fotógrafo', id: 'fotografia', icon: 'icon_services/fotografia.png', select: false },
        { title: 'Vídeo', id: 'video', icon: 'icon_services/video.png', select: false },
        { title: 'Audio', id: 'audio', icon: 'icon_services/audio.png', select: false },
        { title: 'Música', id: 'musica', icon: 'icon_services/musica.png', select: false },
        { title: 'Iliminacion', id: 'iluminacion', icon: 'icon_services/iluminacion.png', select: false },
        { title: 'Invitación', id: 'invitacion', icon: 'icon_services/invitacion.png', select: false },
        { title: 'Recuerdos', id: 'recuerdos', icon: 'icon_services/recuerdos.png', select: false },
        { title: 'Decoración', id: 'decoracion', icon: 'icon_services/decoracion.png', select: false },
        { title: 'Mobiliaria', id: 'mobiliaria', icon: 'icon_services/mobiliaria.png', select: false },
        { title: 'Transporte', id: 'transporte', icon: 'icon_services/transporte.png', select: false },
        { title: 'Personas', id: 'personas', icon: 'icon_services/personas.png', select: false }
      ],
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },

      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '0px',
        backgroundColor: '#027be3',
        width: '0px',
        opacity: 0
      }
    }
  },
  computed: {},
  mounted () {
    this.baseu = env.apiUrl + 'file_proveedor/portada/'
    console.log(this.baseu, 'baseu')
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.header = this.id.charAt(0).toUpperCase() + this.id.slice(1)
      this.getRecord()
    }
  },
  methods: {
    async cambiarProveedor (id) {
      this.$router.push('/proveedores/' + id)
      this.id = id
      await this.getRecord()
    },
    async getRecord () {
      await this.$api.get('proveedores_servicios/' + this.id).then(res => {
        this.proveedores = res.map(v => {
          return {
            ...v,
            ...v.datos_proveedor
          }
        })
        console.log(this.proveedores, 'proveedores')
      })
    },
    ruta (id, header) {
      this.$router.push('/proveedor/' + header + '/' + id)
    }
  }
}
</script>
<style lang="scss" scoped>
.border-items {
  border: 1px solid $grey-4;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
.border-servicios-item {
  border: 0.5px solid $grey-4;
  border-radius: 12px;
  height: 85px;
  width: 85px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>
