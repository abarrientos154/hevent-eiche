<template>
  <q-page>
    <div class="col full-width">
      <div header class="text-h6 text-primary text-bold text-center">Proveedores</div>
      <q-separator/>
      <q-item>
        <q-tabs dense narrow-indicator no-caps v-model="optionBtn" align="justify" active-color="primary" class="text-grey full-width" >
        <q-tab name="buscar" icon="search" icon-size="lg" label="Buscar" />
        <q-tab name="favoritos" icon="favorite_border" label="Favoritos" />
        <q-tab name="mensajes" icon="question_answer" label="Mensajes" />
      </q-tabs>
      </q-item>
      <q-separator/>

      <div v-if="optionBtn == 'buscar'">
        <q-item>
          <q-item-section class="col text-h6 text-primary">
            ¿ Qué Buscas ?
          </q-item-section>
          <q-item-section dense class="col-auto text-subtitle2 text-blue-7">
            <u>Buscar empresas</u>
          </q-item-section>
        </q-item>
        <q-list
          separator
        >
          <q-item
            v-ripple
            clickable
            v-for="(search, index) in showServicios"
            :key="index"
            @click="ir(search.id)">
              <q-item-section class="q-px-xs" avatar>
                <q-icon size="md" class="text-grey-8" :name="search.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="q-pa-xs text-subtitle1 text-grey-8 text-start">{{ search.title }}</q-item-label>
              </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div v-if="optionBtn == 'favoritos'">
        <q-item>
          <q-item-section class="col text-h6 text-primary">
            Mis favoritos
          </q-item-section>
        </q-item>
        <div class="row q-gutter-sm justify-center" style="width: 100%">
          <div
            v-for="(favorite, index) in searchItem"
            :key="index">
              <div class="q-py-xs q-px-sm items-center">
                <q-card clickable v-ripple class="bg-grey-4" style="width: 150px; height: 90px">
                  <q-icon size="xl" class="text-grey-8 absolute-center" :name="favorite.icon" />
                    <!-- <q-img
                          :src="favorite.img"
                          style="height: 170px; width: 110px"
                        ></q-img> -->
                </q-card>
                <div class="text-center text-subtitle1">{{ favorite.name }}</div>
                <div class="text-center text--body2 text-blue-7">{{guardados}}</div>
              </div>
          </div>
        </div>
      </div>

      <div v-if="optionBtn == 'mensajes'">
        <q-item>
          <q-item-section class="col text-h6 text-primary">
            Mensajes
          </q-item-section>
          <q-item-section dense class="col-auto text-subtitle2 text-grey-8">
            <u>Tienes {{ chats.length ? chats.length : '#'}} Mensajes</u>
          </q-item-section>
        </q-item>
        <div class="q-px-md q-gutter-sm q-py-sm">
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
    </div>
  </q-page>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      optionBtn: 'buscar',
      id: '',
      guardados: '0 guardados',
      showServicios: [
        { title: 'Localización', id: 'localizacion', icon: 'home' },
        { title: 'Alimentos', id: 'alimentos', icon: 'fastfood' },
        { title: 'Bebidas', id: 'bebidas', icon: 'local_bar' },
        { title: 'Fotógrafo', id: 'fotografo', icon: 'camera_alt' },
        { title: 'Vídeo', id: 'video', icon: 'videocam' },
        { title: 'Audio', id: 'audio', icon: 'mic' },
        { title: 'Música', id: 'musica', icon: 'audiotrack' },
        { title: 'Iluminación', id: 'iluminacion', icon: 'emoji_objects' },
        { title: 'Invitaciones', id: 'invitaciones', icon: 'drafts' },
        { title: 'Recordatorios', id: 'recordatorios', icon: 'card_giftcard' },
        { title: 'Decoración', id: 'decoracion', icon: 'local_florist' },
        { title: 'Mobiliario', id: 'mobiliario', icon: 'deck' },
        { title: 'Parqueadero', id: 'parqueadero', icon: 'drive_eta' },
        { title: 'Personal', id: 'personal', icon: 'person' },
        { title: 'Wifi', id: 'wifi', icon: 'wifi' }
      ],
      chats: [],
      mensajes: [
        {
          name: 'Nombre del proveedor',
          img: '~assets/logo_quasar.png',
          description: 'Claro que tenemos el modelo que deseas ven y mira'
        },
        {
          name: 'Nombre del proveedor',
          img: '~assets/logo_quasar.png',
          description: 'Cuentame todo sobre el evento que deseas realizar'
        }
      ]
    }
  },
  validations: {
    form: {
      title: { required },
      description: { required }
    }
  },
  computed: {},
  mounted () {
    this.getRecords()
    if (this.$route.params.id) {
      this.optionBtn = this.$route.params.id
      console.log(this.optionBtn)
    }
  },
  methods: {
    getRecords () {
      this.$api.get('get_chats').then(res => {
        if (res) {
          console.log(res)
          this.chats = res
        }
      })
    },
    entrar (id) {
      this.$router.push('/chat/' + id)
    },
    ir (id) {
      this.$router.push('/proveedores/' + id)
    }
  }
}
</script>
