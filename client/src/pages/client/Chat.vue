<template>
  <q-page>
    <div class="bg-primary row" style="height:100px">
      <div class="row items-center">
        <q-btn color="white" flat dense icon="keyboard_arrow_left" round @click="ruta()" />
        <q-avatar class="q-ml-sm" size="70px">
          <q-img :src="imgConcatenado" />
        </q-avatar>
        <div class="q-ml-md text-white text-bold" style="font-size:15px; max-width:180px"> {{usuario}} </div>
        <q-space />
        <div class="column" style="position:absolute;top: 20px; right:10px">
          <q-btn round push size="md" color="white" v-if="cotizarBtn" :disable="deshabilitarMsg" @click="dialog = true" >
            <q-img :src="'icons/cotizar_add.png'" style="height:35px;width:35px" />
          </q-btn>
          <div v-if="cotizarBtn" class="text-center text-white text-bold">Cotizar</div>
        </div>
      </div>
    </div>
    <div class="col full-width">
      <q-dialog v-model="dialog" :maximized="true" transition-show="slide-up" transition-hide="slide-down" >
        <enviar-cotizacion :carrito_form="data.carrito" />
      </q-dialog>
      <div class="q-pa-sm">
        <!--<q-chat-message
        :label="date"
        />-->
        <q-chat-message v-for="mens in this.data.messages" :key="mens.id" :name="mens.full_name" :avatar="mens.img ? baseu + mens.id : 'noimg.png'" :text="[mens.message]"
          :stamp="mens.stamp" :sent="mens.send" :bg-color="mens.send ? 'primary' : 'grey-4'" :text-color="mens.send ? 'white' : 'black'" size="100%"
        />
        <div id="fin"></div>
      </div>
      <q-footer class="bg-white row shadow-2">
        <q-input @keyup.enter="sendChat()" v-model="text" placeholder="Mensaje..." rounded class="q-pa-sm col-10" autogrow outlined />
        <q-icon href="#fin" @click="sendChat()" size="30px" name="send" color="primary" class="col-2" />
      </q-footer>
    </div>
  </q-page>
</template>
<script>
import moment from 'moment'
import EnviarCotizacion from '../../components/Cotizacion/EnviarCotizacion'
import env from '../../env'
export default {
  components: {
    EnviarCotizacion
  },
  data () {
    return {
      baseu: '',
      header: '',
      id_img: '',
      usuario: 'Usuario',
      rol: [],
      cotizarBtn: false,
      deshabilitarMsg: false,
      condicionesUso: false,
      dialog: false,
      cotizacion_id: '',
      text: '',
      date: moment().format('DD-MMMM-YYYY'),
      total: 0,
      imgConcatenado: 'noimg.png',
      proveedor: null,
      categorias: [
        { name: 'Locacion', list: [] },
        { name: 'Alimentos', list: [] },
        { name: 'Fotografia', list: [] }
      ],
      data: {
        datos_proveedor: {
          full_name: 'Proveedor'
        },
        datos_cliente: {
          full_name: 'Cliente'
        }
      }
    }
  },
  computed: {},
  mounted () {
    this.baseu = env.apiUrl + 'file_proveedor/perfil/'
    if (this.$route.params.id) {
      this.cotizacion_id = this.$route.params.id
      this.getinfo()
    }
  },
  methods: {
    remove (index, index2) {
    },
    add (index) {
    },
    async cotizar () {
      this.$q.loading.show()
      this.categorias = this.categorias.filter(v => v.list.length > 0).map(v => {
        return {
          id: v.name,
          list: v.list
        }
      })
      console.log(this.categorias)
      const form = {
        detallesServicios: this.categorias,
        total: this.total
      }
      await this.$api.post(`add_detail_services/${this.cotizacion_id}`, form).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.dialog = false
          this.$router.go(-1)
          this.$q.notify({
            message: 'Evento Creado con Exito',
            color: 'positive'
          })
        }
      })
    },
    async getinfo () {
      await this.$api.get('show_all_info_cotization/' + this.cotizacion_id).then(v => {
        if (v) {
          if (v.status > 1) {
            this.deshabilitarMsg = true
            if (v.status === 3) { this.deshabilitarMsg = false }
            /* this.$q.dialog({
              title: '¡Atención!',
              message: 'Este chat esta deshabilitado, la cotizacion ya ha sido enviada,aprobada,cotizada o rechazada por el cliente. Podra ver los mensajes pero no puede cotizar ni enviar mensajes en este chat'
            }).onOk(() => {

            }) */
          }
          this.data = v
          console.log('data', this.data)
          /* var services = v.datos_proveedor.detalles.servicios
          services = services.map(v => {
            return {
              name: v,
              list: [],
              perror: false,
              cerror: false,
              verror: false
            }
          })
          this.categorias = services
          console.log(v, this.categorias) */
        }
      })
      this.$api.get('user_info').then(res => {
        if (res) {
          console.log('user', res)
          this.rol = res.roles
          if (res.roles.some(v => v === 3)) {
            this.cotizarBtn = true
            this.usuario = this.data.datos_cliente.full_name
            this.id_img = this.data.datos_cliente._id
            this.imgConcatenado = this.data.datos_cliente.perfil ? this.baseu + this.id_img : 'noimg.png'
            this.proveedor = false
          } else {
            this.usuario = this.data.datos_proveedor.name
            this.id_img = this.data.datos_proveedor._id
            this.imgConcatenado = this.data.datos_proveedor.perfil ? this.baseu + this.id_img : 'noimg.png'
            this.proveedor = true
          }
        }
      })
    },
    ruta () {
      this.$router.go(-1)
    },
    async sendChat () {
      if (this.text !== '') {
        console.log(this.text)
        this.$q.loading.show()
        await this.$api.post('send_message/' + this.cotizacion_id, { message: this.text }).then(v => {
          this.$q.loading.hide()
          this.text = ''
          this.$api.get('show_all_info_cotization/' + this.cotizacion_id).then(v => {
            if (v) {
              this.data.messages = v.messages
            }
          })
        })
      }
    }
  }
}
</script>
<style>
</style>
