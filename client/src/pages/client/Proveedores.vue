<template>
  <q-page class="q-pa-sm">
    <div class="col full-width">
      <div header class="column">
        <div class="row">
          <div class="col-3">
              <q-btn flat color="primary" round style="width: 50px" icon="keyboard_arrow_left" @click="$router.go(-1)"/>
          </div>
          <q-space />
          <q-btn flat round color="red" icon="favorite" />
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
        <q-scroll-area horizontal class="bg-grey-1 full-width" style="height:100px" >
          <div class="row no-wrap">
            <div v-for="(serv, index) in servicios" :key="index" style="width:90px; height:40px" class="q-mt-lg" @click="$router.push('/proveedores/' + serv.id)">
              <div class="column items-center">
                <q-img :src="serv.icon" style="width:35px;height:35px" />
                <div class="row justify-center items-center text-grey-7"> {{serv.title}} </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>

      <div class="col full-width q-pa-md" v-for="(data, index) in proveedores" :key="index">
        <q-card class="shadow-8" style="width: 100%" >

        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      busqueda: '',
      header: '',
      id: '',
      proveedores: [],
      servicios: [
        { title: 'Localización', id: 'localizacion', icon: 'icon_services/locacion.png', select: false },
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
      ]
    }
  },
  computed: {},
  mounted () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.header = this.id.charAt(0).toUpperCase() + this.id.slice(1)
      this.getRecord()
    }
  },
  methods: {
    async getRecord () {
      await this.$api.get('proveedores_servicios/' + this.id).then(res => {
        this.proveedores = res
        console.log(this.proveedores)
      })
    },
    ruta (id, header) {
      this.$router.push('/proveedor/' + header + '/' + id)
    }
  }
}
</script>
