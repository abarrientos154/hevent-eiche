<template>
  <div v-if="!chatsOption.length > 0">
    <div class="fondo-toolbar">
      <div>
        <div class="text-center text-bold text-white text-h6" style="position:absolute;top:10px;left:40%">Mensajes</div>
        <q-btn flat color="white" icon="search" round class="q-mr-sm" style="position:absolute;top:10px;right:5px" >
          <q-menu style="min-width: 300px">
            <q-input v-model="buscar" outlined autofocus class="q-ma-sm" dense placeholder="buscar..." @input="filtrar()" >
              <template v-slot:append>
                <q-icon v-if="buscar === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="buscar = ''" />
              </template>
            </q-input>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div class="q-ma-lg">
      <q-list>
        <div class="column" v-for="(chat, index) in chats" :key="index">
          <q-item class="q-mt-sm" v-ripple clickable @click="entrar(chat._id)">
            <q-item-section avatar>
              <q-avatar size="75px">
                <q-img :src="baseu + chat.id_usuario" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-grey-6 text-bold"> {{chat.full_name}} </q-item-label>
              <q-item-label class="text-grey-6" caption> {{chat.last_message}} </q-item-label>
            </q-item-section>
            <q-item-section side center v-if="!chat.visto">
              <div class="bg-primary" style="width:10px;height:10px; border-radius:100px"></div>
            </q-item-section>
          </q-item>
          <q-separator inset class="q-mt-md" />
        </div>
      </q-list>
    </div>
  </div>
  <q-page v-else :class="rol === 2 ? 'mensaje-usuario' : 'mensaje-proveedor' ">
  </q-page>
</template>
<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      buscar: '',
      slide: 1,
      pointTotal: 4,
      date: '2019/02/01',
      chats: [],
      chatsOption: [],
      form: {},
      rol: null
    }
  },
  validations: {
  },
  computed: {

  },
  mounted () {
    this.getRecords()
    this.baseu = env.apiUrl + 'file_proveedor/perfil/'
    const user = JSON.parse(this.$q.localStorage.getItem('HEV_SESSION_INFO'))
    this.rol = user.roles[0]
    console.log(this.rol, 'rolll')
  },
  methods: {
    filtrar () {
      const needle = this.buscar.toLowerCase()
      this.chats = this.chatsOption.filter(v => v.full_name.toLowerCase().indexOf(needle) > -1)
    },
    entrar (id) {
      this.$router.push('/chat/' + id)
    },
    getRecords () {
      this.$api.get('get_chats').then(res => {
        if (res) {
          console.log('chat', res)
          this.chats = res
          this.chatsOption = res
          console.log(this.chats, 'sdasdasd')
        }
      })
    }
  }
}
</script>

<style>
.fondo-toolbar {
   background-image: url('../../../public/nube1.png');
   width:100%;
   height: 150px;
   background-size: 100% 250px;
}

.mensaje-usuario {
   background-image: url('../../../public/mensaje_usuario.jpg');
   width:100%;
   height: 100%;
   background-size: 100% 100%;
}

.mensaje-proveedor {
   background-image: url('../../../public/mensaje_proveedor.jpg');
   width:100%;
   height: 100%;
   background-size: 100% 100%;
}
</style>
