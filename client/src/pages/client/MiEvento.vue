<template>
  <q-page>
    <div class="col full-width">
      <div header class="bg-primary">
        <div class="q-pt-xs text-subtitle2 text-white text-center">Somos tus mejores aliados para organizar tu evento</div>
      </div>
      <q-img
          src="example_7.jpg"
          style="width: 100%"
          img-class="my-custom-image"
        >
          <div class="col items-center q-pb-sm bg-transparent text-center" style="width: 100%">
            <div class="row justify-center">
                <q-input class="text-h6 text-white" color="white" borderless style="width:180px" v-model="form.title" dark placeholder="Nombre del Evento"
                  @input="saveData"
                />
            </div>
            <div class="row justify-center q-pb-sm q-gutter-sm">
                <q-input dark borderless class="col-5 q-pl-md" v-model="form.startDate" type="date" @input="saveData" />
                <q-input dark borderless class="col-5 q-pl-md" v-model="form.endDate" type="date" @input="saveData" />
            </div>
            <q-btn outline no-caps class="text-white" color="dark" label="Camiar Foto" />
          </div>
          <div class="row absolute-bottom q-py-md">
            <div class="col-11 text-center text-h6 text-white">Cuenta regresiva</div>
            <q-icon class="col-1 text-right text-white" name="cloud" style="font-size: 1.4em;" />
          </div>
        </q-img>
        <q-item class="row">
            <q-item-section class="col-7">
                <q-input outlined bottom-slots v-model="form.organizador" label="Organizador" >
                    <template v-slot:before>
                    <q-icon class="text-primary" name="account_circle" style="font-size: 1.4em;" />
                    </template>
                </q-input>
                <q-input class="q-pl-md" outlined bottom-slots v-model="form.co_organizador" label="Co-organizador" >
                    <template v-slot:before>
                    <q-icon class="text-grey" name="account_circle" style="font-size: 1.4em;" />
                    </template>
                </q-input>
            </q-item-section>
            <q-item-section class="col-5">
                <div class="text-center">
                    <q-icon center class="text-primary" name="group" style="font-size: 3.4em;" />
                </div>
                 <q-input outlined bottom-slots type="number" v-model="form.invidatos" label="# De Invitados" />
            </q-item-section>
        </q-item>

        <div class="row">
            <div class="col-9 q-pl-sm">
                <div class="text-primary text-h6 text-center text-bold">Escoger Proveedor</div>
                <q-input outlined bottom-slots v-model="empresa" label="Buscar Empresa">
                    <template v-slot:append>
                    <q-icon v-if="empresa !== ''" name="close" @click="empresa = ''" class="cursor-pointer" />
                    <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <div class="col-3 column items-center q-px-sm ">
                <q-icon class="text-yellow" name="star" style="font-size: 3.4em;" />
                <q-badge color="primary" class="text-subtitle2" text-color="white" label="Mis Elegidos" />
            </div>
        </div>

        <div class="row q-gutter-xs q-px-xs q-pt-sm justify-around" style="width: 100%">
            <div
            class="col-3"
            v-for="(card, index) in showServicios"
            :key="index">
                <div class="q-py-xs items-center">
                    <q-card class="q-px-md q-py-sm bg-grey-3" style="height: 100px">
                        <q-icon center class="text-grey absolute-center" :name="card.icon" @click="ir(card.id)" style="font-size: 3em;" />
                    </q-card>
                    <div class="text-center text-caption text-grey-8">{{card.title}}</div>
                </div>
            </div>
        </div>

        <q-item class="q-pt-md">
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
              <q-icon size="60px" class="text-black q-px-md q-pb-xs" name="account_circle" />
            </div>
            <div class="col-9">
              <div class="text-primary text-bold text-center text-subtitle1 q-pt-sm">{{chat.full_name}}</div>
              <div class="text-center text-caption">{{chat.last_message}}</div>
            </div>
        </q-card>
        </div>

        <q-item class="row q-pt-md">
          <q-item-section class="col-6 text-primary items-center">
            <div class="text-h6">Presupuesto</div>
            <div class="text-caption">En Pesos Colombianos</div>
          </q-item-section>
          <q-item-section class="col-6">
              <div class="row">
                <div class="col-2 text-primary text-h4">$</div>
                <div class="col-10 text-grey text-h4">{{formatPrice(cotisations.totalCotisaciones)}}</div>
              </div>
          </q-item-section>
        </q-item>
        <q-list
          separator
        >
        <q-separator />
          <q-item
            v-ripple
            clickable
            v-for="(presupuesto, index) in showServicios"
            :key="index">
              <q-item-section class="q-px-xs" avatar>
                <q-icon size="md" class="text-grey-8" :name="presupuesto.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="q-pa-xs text-subtitle1 text-grey-8 text-start">{{ presupuesto.title }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="q-pr-md text-subtitle1 text-grey-8 text-right">{{formatPrice(presupuesto.total)}}</q-item-label>
              </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
        <div class="row q-py-md">
            <div class="col-9 text-center text-h5 text-primary">Total</div>
            <div class="col-3 q-pr-md text-h6 text-bold text-grey-8 text-right">{{formatPrice(cotisations.totalCotisaciones)}}</div>
        </div>

        <div class="q-px-sm q-pb-md">
            <q-btn no-caps class="text-subtitle1" style="width: 100%" color="primary" label="Pagar" @click="showRangos = true" :disable="cotisations.pay" />
        </div>
        <q-dialog v-model="showRangos">
          <q-card style="border-radius:12px" class="q-pa-lg">
            <div class="text-subtitle1">Confirme su pago</div>
            <q-card-actions align="center" class="q-mt-md">
              <q-btn label="Salir" color="negative" v-close-popup />
              <q-btn label="confirmar pago" color="positive" icon="done" v-close-popup @click="confirmarPago" />
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>
  </q-page>
</template>
<script>
// import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      chats: [],
      empresa: '',
      rangosFecha: {},
      showRangos: false,
      cotisations: [],
      showServicios: [
        { title: 'Locación', id: 'localizacion', icon: 'home', total: 0 },
        { title: 'Alimentos', id: 'alimentos', icon: 'fastfood', total: 0 },
        { title: 'Bebidas', id: 'bebidas', icon: 'local_bar', total: 0 },
        { title: 'Fotógrafo', id: 'fotografo', icon: 'camera_alt', total: 0 },
        { title: 'Vídeo', id: 'video', icon: 'videocam', total: 0 },
        { title: 'Audio', id: 'audio', icon: 'mic', total: 0 },
        { title: 'Música', id: 'musica', icon: 'audiotrack', total: 0 },
        { title: 'Iluminación', id: 'iluminacion', icon: 'emoji_objects', total: 0 },
        { title: 'Invitaciones', id: 'invitaciones', icon: 'drafts', total: 0 },
        { title: 'Recordatorios', id: 'recordatorios', icon: 'card_giftcard', total: 0 },
        { title: 'Decoración', id: 'decoracion', icon: 'local_florist', total: 0 },
        { title: 'Mobiliario', id: 'mobiliario', icon: 'deck', total: 0 },
        { title: 'Parqueadero', id: 'parqueadero', icon: 'drive_eta', total: 0 },
        { title: 'Personal', id: 'personal', icon: 'person', total: 0 },
        { title: 'Wifi', id: 'wifi', icon: 'wifi', total: 0 }
      ]
    }
  },
  validations: {
    /* form: {
      title: { required },
      eventDate: { required }
    } */
  },
  computed: {
  },
  mounted () {
    this.getRecords()
    this.getCotisations()
    const algo = JSON.parse(localStorage.getItem('HEV_DATA_EVENT'))
    this.form = algo != null ? algo : {}
    console.log(this.form, 'asdsadasd')
  },
  methods: {
    saveData () {
      console.log(this.form, 'form')
      localStorage.setItem('HEV_DATA_EVENT', JSON.stringify(this.form))
    },
    ir (id) {
      this.$router.push('/proveedores/' + id)
    },
    entrar (id) {
      this.$router.push('/chat/' + id)
    },
    getRecords () {
      this.$api.get('get_chats').then(res => {
        if (res) {
          console.log(res)
          this.chats = res
        }
      })
    },
    async getCotisations () {
      this.$q.loading.show()
      await this.$api.get('quotes_by_status_approve').then(res => {
        this.$q.loading.hide()
        if (res) {
          console.log(res, 'cotisationssss')
          this.cotisations = res
          for (var j of this.showServicios) {
            for (var i in this.cotisations.cotisasiones) {
              for (const h in this.cotisations.cotisasiones[i].detallesServicios) {
                console.log(h)
                var servicio = this.cotisations.cotisasiones[i].detallesServicios.find(v => v.id === j.id)
                console.log(servicio, 'servicio')
                if (servicio) {
                  for (var k of servicio.list) {
                    j.total = j.total + (k.cantidad * k.valor)
                  }
                }
              }
            }
          }
        }
      })
      this.$q.loading.hide()
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    async confirmarPago () {
      this.$q.loading.show()
      await this.$api.put('pay_quotes/' + this.cotisations.cotisasiones[0].event_id, this.form).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.showDialogInfo = false
          this.$q.notify({
            message: 'Evento Creado Con Exito',
            color: 'positive'
          })
          this.getRecords()
          this.getCotisations()
          this.showRangos = false
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>
