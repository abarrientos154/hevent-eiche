<template>
  <div>
    <div class="nube row justify-center items-center">
      <div class="q-mb-md">
        <q-img :src="perfilImg" class="estilo-img">
          <div class="absolute-center bg-transparent text-center" style="width: 100%">
            <div class="absolute-center" style="z-index:1">
              <q-file borderless v-model="perfil" class="button-camera-inicio-proveedor-perfil-perfil" @input="changePerfil()" accept=".jpg, image/*">
              </q-file>
            </div>
          </div>
        </q-img>
        <div class="text-center q-mt-sm text-white text-bold"> {{user.name}} </div>
      </div>
    </div>
    <div class="text-center text-primary text-h5 text-bold"> * Perfil * </div>
    <div class="column items-center justify-start q-mb-lg">
      <div v-for="(item, index) in opciones" :key="index" class="cursor-pointer q-mt-md column" style="font-size:18px" @click="ejecutar(item.ind, index)">
        <div class="text-grey-8">{{item.titulo}}</div>
        <q-separator />
      </div>
    </div>
    <q-dialog v-model="dialogos.editarDatos" :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <editar-datos class="q-mt-xl" />
    </q-dialog>
    <q-dialog v-model="dialogos.editarPerfil" :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <editar-perfil class="q-mt-xl" />
    </q-dialog>
    <q-dialog v-model="dialogos.editarPreguntas" :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <editar-preguntas class="q-mt-xl" />
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
import EditarDatos from '../../components/Proveedor/Perfil/EditarDatos'
import EditarPerfil from '../../components/Proveedor/Perfil/PerfilEmpresa'
import EditarPreguntas from '../../components/Proveedor/Perfil/PreguntasFrecuentes'
export default {
  components: {
    EditarDatos, EditarPerfil, EditarPreguntas
  },
  data () {
    return {
      form: {},
      baseu: '',
      dialogos: {
        editarDatos: false,
        editarPerfil: false,
        editarPreguntas: false
      },
      perfilImg: '',
      user: {},
      perfil: null,
      opciones: [
        { titulo: 'Editar Datos', dialog: true, ind: 0 },
        { titulo: 'Perfil de tu Empresa', dialog: true, ind: 1 },
        { titulo: 'Preguntas Frecuentes', dialog: true, ind: 2 },
        { titulo: 'Renovar Pago', url: '', dialog: false, ind: 3 },
        { titulo: 'Planes Disponibles', url: '/planes_disponibles', dialog: false, ind: 6 },
        { titulo: 'Notificaciones', dialog: true, ind: 4 },
        { titulo: 'Cerrar Sesión', accion: 'logout', dialog: false, ind: 5 }
      ]
    }
  },
  async mounted () {
    await this.getUser()
    this.baseu = env.apiUrl
    this.perfilImg = this.baseu + 'file_proveedor/perfil/' + this.user._id
  },
  methods: {
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
          console.log(this.perfilImg, 'portada img funcion')
          this.$router.go(this.$router.currentRoute)
        })
      }
    },
    async getUser () {
      await this.$api.get('users_perfil').then(res => {
        if (res) {
          this.user = res
          console.log(this.user, 'this user')
        }
      })
    },
    ejecutar (index, indOption) {
      console.log(this.opciones[indOption], 'ssss', index, 'indexxxxx')
      if (this.opciones[indOption].dialog) {
        if (index === 0) {
          this.dialogos.editarDatos = true
        } else if (index === 1) {
          this.dialogos.editarPerfil = true
        } else if (index === 2) {
          this.dialogos.editarPreguntas = true
        }
      } else if (this.opciones[indOption].url) {
        this.$router.push(this.opciones[indOption].url)
      } else if (this.opciones[indOption].accion === 'logout') {
        this.logout()
      }
    },
    logout () {
      this.$router.push('/login_proveedor')
    }
  }
}
</script>

<style>
.nube {
  background-image: url('../../../public/nubeazul2.png');
  width:100%;
  height: 300px;
  background-size: 100% 300px;
}

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

.estilo-img {
  width:120px;
  height:120px;
  border-radius:100px
}

.estilo-opciones {
  text-decoration: underline black;
}

.button-camera-inicio-proveedor-perfil-perfil {
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
</style>
