<template>
<div>
  <q-img :src="portadaImg ? portadaImg : 'portada_proveedor.png'" style="width: 100%;height:200px">
    <div class="absolute-center bg-transparent text-center" style="width: 100%">
      <q-avatar size="50px">
        <div class="absolute-center" style="z-index:1">
          <q-file borderless v-model="portada" class="button-camera" @input="perfilAndPortada()" :filter="checkFileType" @rejected="onRejected" accept=".jpg, image/*">
            <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
          </q-file>
        </div>
      </q-avatar>
    </div>
  </q-img>
  <div class="q-ml-lg row items-center">
    <div>
      <q-avatar size="100px">
        <img src="noimg.png" style="width: 70px;height:70px">
      </q-avatar>
    </div>
    <div class="column">
      <div class="text-grey-7 text-bold text-subtitle1"> {{user.name}} </div>
    </div>
  </div>
  <div class="row q-gutter-lg q-mt-sm">
    <div class="row justify-around col-5" v-for="(ruta, index) in rutas" :key="index">
      <div @click="$router.push(ruta.ruta)">
        <div class="column items-center">
          <q-avatar square>
            <q-img :src="ruta.icon" />
          </q-avatar>
          <div>{{ruta.name}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-center q-mt-xl q-mb-lg">
    <q-btn color="primary" label="editar anuncio" style="width:200px;border-radius:12px;height:50px" push />
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      usuario: '',
      rutas: [
        { name: 'Calendario', icon: 'icons/calendario.png', ruta: '/calendario_eventos' },
        { name: 'Mensajes', icon: 'icons/mensajes.png', ruta: '/chats_proveedor' },
        { name: 'Cotizaciones', icon: 'icons/cotizar_add.png', ruta: '/aprobacion_cotizacion' },
        { name: 'Estadísticas', icon: 'icons/estadisticas.png', ruta: '' }
      ],
      portadaImg: '',
      portada: '',
      user: {}
    }
  },
  validations: {
  },
  computed: {},
  mounted () {
    this.getRecord()
    this.getUser()
  },
  methods: {
    async getRecord () {
      await this.$api.get('proveedores_perfil').then(res => {
        if (res) {
          this.usuario = res.form.user_data.full_name
          console.log(this.usuario)
        }
      })
    },
    perfilAndPortada () {
      if (this.portada) { this.portadaImg = URL.createObjectURL(this.portada) }
    },
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: 'Las Imagenes deben ser de tipo png, jpg, jpeg'
      })
    },
    getUser () {
      this.$api.get('users_perfil').then(res => {
        if (res) {
          this.user = res
          console.log(this.user, 'this user')
        }
      })
    }
  }
}
</script>

<style>
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: #0016b0;
  background-color: #ffffff;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width:40px
}

</style>
