<template>
<div>
  <q-img :src="portadaImg" style="width: 100%;height:200px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;">
    <div class="absolute-center bg-transparent text-center" style="width: 100%">
      <q-avatar size="50px">
        <div class="absolute-center" style="z-index:1">
          <q-file borderless v-model="portada" class="button-camera" @input="changePortada()" accept=".jpg, image/*">
            <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
          </q-file>
        </div>
      </q-avatar>
    </div>
  </q-img>
  <div class="q-ml-lg row items-center">
      <div class="column items-center">
        <q-avatar size="90px">
          <div class="absolute-center" style="z-index:1">
            <q-file borderless v-model="perfil" class="button-camera" @input="changePerfil()" accept=".jpg, image/*" >
              <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
            </q-file>
          </div>
          <q-img :src="perfilImg ? perfilImg : 'noimg.png'" />
        </q-avatar>
      </div>
    <div class="column q-ml-md">
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
    <q-btn class="gradiente-buttom" label="editar anuncio" style="width:200px;border-radius:12px;height:50px" push to="/editar_anuncio" />
  </div>
</div>
</template>
<script>
import env from '../../env'
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
      perfilImg: '',
      perfil: '',
      portada: '',
      user: {},
      baseu: ''
    }
  },
  async mounted () {
    this.getRecord()
    await this.getUser()
    this.baseu = env.apiUrl
    this.portadaImg = this.baseu + 'file_proveedor/portada/' + this.user._id
    this.perfilImg = this.baseu + 'file_proveedor/perfil/' + this.user._id
    console.log(this.portadaImg, 'portada img mounted')
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
    changePerfilAndPortada () {
      if (this.portada) { this.portadaImg = URL.createObjectURL(this.portada) }
      if (this.perfil) { this.perfilImg = URL.createObjectURL(this.perfil) }
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
    async getUser () {
      await this.$api.get('users_perfil').then(res => {
        if (res) {
          this.user = res
          console.log(this.user, 'this user')
        }
      })
    },
    async changePortada () {
      if (this.portada) {
        var formData = new FormData()
        var files = []
        files[0] = this.portada
        formData.append('files', files[0])
        await this.$api.post('actualizar_file_proveedor/portada', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          console.log(res, 'respuesta')
          this.portadaImg = this.baseu + 'file_proveedor/portada/' + this.user._id
          console.log(this.portadaImg, 'portada img funcion')
          this.$router.go(this.$router.currentRoute)
        })
      }
    },
    async changePerfil () {
      if (this.perfil) {
        var formData = new FormData()
        var files = []
        files[0] = this.perfil
        formData.append('files', files[0])
        await this.$api.post('actualizar_file_proveedor/perfil', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          console.log(res, 'respuesta')
          this.perfilImg = this.baseu + 'file_proveedor/perfil/' + this.user._id
          console.log(this.perfilImg, 'perfil img funcion')
          this.$router.go(this.$router.currentRoute)
        })
      }
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
  color: #ffffff;
  background-color: #ffffff;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width:40px
}
</style>
