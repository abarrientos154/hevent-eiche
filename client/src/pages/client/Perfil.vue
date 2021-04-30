<template>
  <q-page>
    <div class="nube-perfil-cliente row justify-center items-center">
      <div class="q-mb-md">
        <q-img :src="user.perfil ? perfilImg : 'noimg.png'" class="estilo-img">
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
    <div class="column items-center justify-start q-mb-lg text-left">
      <div v-for="(item, index) in opciones" :key="index" class="cursor-pointer q-mt-md text-left" style="font-size:18px" @click="ejecutar(item.val)">
        <div v-if="item.visible" class="column">
          <div class="text-grey-8 text-left">{{item.titulo}}</div>
          <q-separator />
        </div>
      </div>
    </div>
    <q-dialog v-model="dialogos.editarP" style="height:300px" >
      <editar-perfil />
    </q-dialog>

    <q-dialog v-model="dialogos.pass" >
      <editar-contra />
    </q-dialog>

    <q-dialog v-model="dialogos.notificaciones" >
      <editar-notifi />
    </q-dialog>

    <!-- <q-dialog v-model="dialogos.eventosR" >
      <eventos-realizados />
    </q-dialog> -->
  </q-page>
</template>

<script>
import env from '../../env'
import EditarPerfil from '../../components/cliente/perfil/Datos'
import EditarContra from '../../components/cliente/perfil/Pass'
import EditarNotifi from '../../components/cliente/perfil/Notificaciones'
// import EventosRealizados from '../../components/cliente/perfil/EventosRealizados.vue'
export default {
  components: {
    EditarPerfil, EditarContra, EditarNotifi //, EventosRealizados
  },
  data () {
    return {
      form: {},
      perfilImg: null,
      perfil: null,
      user: {},
      dialogos: {
        editarP: false,
        pass: false,
        notificaciones: false,
        eventosR: false
      },
      opciones: [
        { titulo: 'Editar Perfil', visible: true, val: 0 },
        { titulo: 'Modificar Contraseña', visible: true, val: 1 },
        { titulo: 'Eventos Realizados', visible: true, val: 4 },
        { titulo: 'Notificaciones', visible: false, val: 2 },
        { titulo: 'Cerrar Sesión', visible: true, val: 3 }
      ]
    }
  },
  async mounted () {
    await this.getUser()
    this.baseu = env.apiUrl
    this.perfilImg = this.baseu + 'file_proveedor/perfil/' + this.user._id
    console.log(this.$router.currentRoute, 'asdas')
  },
  methods: {
    ejecutar (ind) {
      console.log(ind, 'asd')
      if (ind === 0) { this.dialogos.editarP = true }
      if (ind === 1) { this.dialogos.pass = true }
      if (ind === 2) { this.dialogos.notificaciones = true }
      if (ind === 3) {
        this.$router.push('/login_cliente')
      }
      if (ind === 4) {
        this.$router.push('/eventos_realizados')
      }
    },
    async changePerfil () {
      if (this.perfil) {
        var formData = new FormData()
        var files = []
        files[0] = this.perfil
        formData.append('files', files[0])
        await this.$api.post('actualizar_file_cliente', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
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
    }
  }
}
</script>

<style>
.nube-perfil-cliente {
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
