<template>
  <div>
    <div class="nube row justify-center items-center">
      <q-btn icon="menu" flat style="position:absolute; top:5px;left:5px" color="white" round />
      <div class="q-mb-md">
        <q-img :src="perfilImg" class="estilo-img">
          <div class="absolute-center bg-transparent text-center" style="width: 100%">
            <q-avatar size="50px">
              <div class="absolute-center" style="z-index:1">
                <q-file borderless v-model="perfil" class="button-camera" @input="changePerfil()" accept=".jpg, image/*">
                  <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
                </q-file>
              </div>
            </q-avatar>
          </div>
        </q-img>
        <div class="text-center q-mt-sm text-white text-bold">Cambiar Foto</div>
      </div>
    </div>
    <div class="text-center text-primary text-h5 text-bold"> * Perfil * </div>
    <div class="column items-center justify-start q-mb-lg">
      <div v-for="(item, index) in opciones" :key="index" class="cursor-pointer q-mt-md column" style="font-size:18px" @click="ejecutar(index)">
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
        { titulo: 'Editar Datos', dialog: true },
        { titulo: 'Perfil de tu Empresa', dialog: true },
        { titulo: 'Preguntas Frecuentes', dialog: true },
        { titulo: 'Renovar Pago', url: '', dialog: false },
        { titulo: 'Notificaciones', dialog: true },
        { titulo: 'Cerrar Sesión', accion: 'logout', dialog: false }
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
    ejecutar (index) {
      console.log(this.opciones[index], 'ssss')
      if (this.opciones[index].dialog) {
        if (index === 0) {
          this.dialogos.editarDatos = true
        } else if (index === 1) {
          this.dialogos.editarPerfil = true
        } else if (index === 2) {
          this.dialogos.editarPreguntas = true
        }
      } else if (this.opciones[index].url) {
        this.$router.push(this.opciones[index].url)
      } else if (this.opciones[index].accion === 'logout') {
        this.logout()
      }
    },
    logout () {
      this.$router.push('/login')
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
</style>
