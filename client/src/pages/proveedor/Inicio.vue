<template>
<div>
  <div class="full-width">
    <div class="fondo-para-nube" style="width:100%;height:200px">
    </div>
    <q-img :src="portadaImg" class="absolute-top" style="width:100%;height:200px;z-index:-1">
    </q-img>
    <div class="absolute-center bg-transparent text-center" style="width: 100%;position: absolute;top:100px">
      <div class="absolute-center">
        <q-file borderless v-model="portada" class="button-camera-inicio-proveedor" @input="changePortada()" accept=".jpg, image/*">
        </q-file>
      </div>
    </div>
  </div>
  <div class="q-ml-lg row items-center">
      <div class="column items-center">
        <q-avatar size="90px">
          <div class="absolute-center" style="z-index:1">
            <q-file borderless v-model="perfil" class="button-camera-inicio-proveedor-perfil" @input="changePerfil()" accept=".jpg, image/*" >

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
        { name: 'Calendario', icon: 'iconos2/calendario.png', ruta: '/calendario_eventos' },
        { name: 'Mensajes', icon: 'iconos2/mensajes.png', ruta: '/chats_proveedor' },
        { name: 'Cotizaciones', icon: 'iconos2/cotizar_add.png', ruta: '/aprobacion_cotizacion' },
        { name: 'Estadísticas', icon: 'iconos2/estadisticas.png', ruta: '/estadisticas' }
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
.button-camera-inicio-proveedor {
  text-decoration: none;
  padding: 0px;
  font-weight: 540;
  font-size: 0px;
  background-image: url('../../../public/icons/editar_foto.png');
  background-size: 110% 110%;
  background-repeat: no-repeat;
  border-radius: 200px;
  height:80px;
  width:80px
}

.button-camera-inicio-proveedor-perfil {
  text-decoration: none;
  padding: 0px;
  font-weight: 540;
  font-size: 0px;
  background-image: url('../../../public/icons/editar_foto.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 200px;
  height:60px;
  width:60px
}

.img-nube-forma-style {
  width: 100%;
  height:200px;
  border: 30px solid;
  border-image: url('../../../public/prueba.png');
  border-image-slice: 100;
  background-image: url('../../../public/example_5.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.fondo-para-nube {
  background-image: url('../../../public/prueba.png');
  background-size: 100% 100%;
  z-index: 1
}
</style>
