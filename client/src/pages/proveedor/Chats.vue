<template>
  <div v-if="chatsOption.length > 0">
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
                <q-img :src="'noimg.png'" />
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
  <div v-else>
   <q-img src="error.png">
      <p class="text-subtitle1 text-center row justify-center text-grey-9" style="position:absolute;bottom:12%;width:100%">Aun no tienes mensajes,</p>
      <p class="text-subtitle1 text-center text-grey-9 row justify-center" style="position:absolute;bottom:8%;width:100%">pero pronto un usuario te contactara</p>
   </q-img>
  </div>
</template>
<script>
export default {
  data () {
    return {
      buscar: '',
      slide: 1,
      pointTotal: 4,
      date: '2019/02/01',
      chats: [],
      chatsOption: [],
      form: {}
    }
  },
  validations: {
  },
  computed: {

  },
  mounted () {
    this.getRecords()
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
</style>
