<template>
  <!--<q-page>
    <div class="col full-width">
      <div header class="row">
        <div class="col-3 q-pl-md">
            <q-btn flat class="text-grey" round style="width: 50px" icon="keyboard_arrow_left" @click="$router.go(-1)"/>
        </div>
        <div class="col-5 q-pt-xs text-h5 text-primary text-bold text-center">Mensajes</div>
      </div>
      <q-separator/>
      <div class="q-pr-md q-pt-sm text-subtitle2 text-right text-grey-8"><u>Tienes {{ chats.length ? chats.length : '#'}} Mensajes</u></div>
    <div class="q-pa-md q-gutter-md">
        <q-card class="my-card shadow-13 row" @click="entrar(chat._id)" v-for="(chat, index) in chats" :key="index">
            <div class="col-3">
              <div class="text-center text-primary text-bold text-subtitle1 q-pt-sm">{{chat.visto ? 'Leido' : 'Pendiente'}}</div>
              <q-icon size="60px" class="text-black q-px-md q-pb-xs" name="account_circle" />
            </div>
            <div class="col-9">
              <div class="text-primary text-bold text-center text-subtitle1 q-pt-sm">{{chat.full_name}}</div>
              <div class="text-center text-caption">{{chat.last_message}}</div>
              <div class="absolute-bottom text-primary text-subtitle1 text-right q-pr-sm">{{chat.created_at_message}}</div>
            </div>
        </q-card>
    </div>
    </div>
  </q-page>-->
  <div>
    <div class="fondo-toolbar">
      <div class="row justify-between items-center">
        <q-btn flat color="white" icon="menu" round class="q-mt-md q-ml-sm" />
        <div class="text-center text-bold text-white text-h6 q-mt-sm">Mensajes</div>
        <q-btn flat color="white" icon="search" round class="q-mr-sm" />
      </div>
    </div>
    <div class="q-ma-lg">
      <q-list>
        <div class="column" v-for="(chat, index) in chats" :key="index">
          <q-item class="q-mt-sm" v-ripple clickable @click="entrar(chat._id)">
            <q-item-section avatar>
              <q-avatar size="60px">
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
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      pointTotal: 4,
      date: '2019/02/01',
      chats: [],
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
    entrar (id) {
      this.$router.push('/chat/' + id)
    },
    getRecords () {
      this.$api.get('get_chats').then(res => {
        if (res) {
          console.log('chat', res)
          this.chats = res
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
