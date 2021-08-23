<template>
  <div v-if="data.length > 0">
    <div  class="fondo-toolbar">
      <div class="text-center text-white text-bold text-h6 q-pt-lg">Cotizaciones</div>
    </div>
    <q-btn icon="keyboard_arrow_left" flat round color="white" style="position:absolute;top:10px;left:10px" @click="$router.go(-1)" />
    <div class="row justify-center q-ma-sm">
      <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pr-sm" v-for="(item, index) in data" :key="index" style="border-radius:8px;margin-top:8px;margin-bottom:8px">
        <q-item class="q-mt-xs q-mb-xs q-ma-sm" clickable v-ripple @click="showDialogInfo = true, indexSelect = index, cotisacion_id = item._id, esCliente = item.rolAuth === 2 ? true : false">
          <q-item-section avatar>
            <q-avatar size="75px">
              <q-img :src="item.rolAuth === 2 ? baseu + item.datos_proveedor._id : baseu + item.datos_cliente._id " />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.rolAuth === 2 ? item.datos_proveedor.name : item.datos_cliente.full_name}}</q-item-label>
            <q-item-label caption> {{item.status}} </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="info" flat color="secondary" round/>
          </q-item-section>
        </q-item>
        <q-separator inset />
      </div>
    </div>
    <q-dialog v-model="showDialogInfo" position="bottom" transition-show="slide-up" transition-hide="slide-down" >
      <aprobar-cotizacion :cotisacion_id="cotisacion_id" @aprobar="aprobar" @negar="negar" :esCliente="esCliente" />
    </q-dialog>
  </div>
  <div v-else>
   <q-img src="error.png">
      <p class="text-subtitle1 text-center row justify-center text-grey-9" style="position:absolute;bottom:12%;width:100%">Aun no tienes cotizaciones,</p>
      <p class="text-subtitle1 text-center text-grey-9 row justify-center" style="position:absolute;bottom:8%;width:100%">pero pronto un usuario te contactara</p>
   </q-img>
  </div>
</template>

<script>
import AprobarCotizacion from '../../components/Cotizacion/AprobarCotizacion'
import env from '../../env'
export default {
  components: {
    AprobarCotizacion
  },
  data () {
    return {
      baseu: '',
      data: [],
      showDialogInfo: false,
      indexSelect: 0,
      cotisacion_id: '',
      esCliente: false
    }
  },
  async mounted () {
    await this.getRecord()
  },
  methods: {
    async getRecord () {
      await this.$api.get('get_cotisation_in_status').then(res => {
        this.data = res.map(v => {
          return {
            carrito: v.carrito,
            cliente_id: v.cliente_id,
            created_at: v.created_at,
            datos_cliente: v.datos_cliente,
            datos_proveedor: v.datos_proveedor,
            event_id: v.event_id,
            proveedor_id: v.proveedor_id,
            rolAuth: v.rolAuth,
            statusVal: v.status,
            status: v.status === 1 ? 'Esperando Aprobación' : v.status === 2 ? 'Aprobado por ' + v.datos_cliente.full_name : v.status === 3 ? 'Rechazado' : v.status === 4 ? `Cotizacion pagada el ${v.fechaPagado}` : `Cotizacion pagada el ${v.fechaPaagado}`,
            _id: v._id
          }
        })
        console.log(this.data, 'dataa')
        this.baseu = env.apiUrl + 'file_proveedor/perfil/'
      })
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    async negar () {
      this.$q.loading.show()
      await this.$api.put('desapprove_quote/' + this.data[this.indexSelect]._id).then(res => {
        if (res) {
          this.showDialogInfo = false
          this.$q.notify({
            message: 'Solicitud Desaprobada con Exito',
            color: 'positive'
          })
          this.getRecord()
        }
      })
      this.$q.loading.hide()
    },
    async aprobar () {
      this.$q.loading.show()
      await this.$api.put('approve_quote/' + this.data[this.indexSelect]._id).then(res => {
        if (res) {
          this.showDialogInfo = false
          this.$q.notify({
            message: 'Solicitud Aprobada con Exito',
            color: 'positive'
          })
          this.getRecord()
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style lang="scss">
 .item-servicios {
   border-left:6px solid $primary;
   border-right:6px solid $primary;
   margin-left:30px;
   border-radius: 12px;
   background-color: $grey-1 ;
 }

 .button-border {
   border-radius: 12px;
 }

 .fondo-toolbar {
   background-image: url('../../../public/nube1.png');
   width:100%;
   height: 150px;
   background-size: 100% 250px;
 }

</style>
