<template>
  <div>
    <div id="app">
      <calendar-view :show-date="showDate" class="theme-default" :items="eventos" @click-item="showDetailEvent">
        <calendar-view-header slot="header" slot-scope="t" :header-props="t.headerProps" @input="setShowDate" ></calendar-view-header>
      </calendar-view>
    </div>
    <q-dialog v-model="dialog">
      <q-card v-if="formEvent.datos_cliente" style="max-width: 400px; border-radius: 12px" class="full-width q-pa-md dialog-styl">
        <div class="text-h5 text-bold">{{formEvent.title}}</div>
        <div class="text-subtitle1 text-weight-medium"> {{formEvent.datos_cliente.full_name}} </div>
        <div class="text-subtitle2"> Inicio: {{formEvent.startDate}} </div>
        <div class="text-subtitle2"> Fin: {{formEvent.endDate}} </div>
        <div class="text-subtitle2"> Estatus:
          <q-badge color="primary">
            {{formEvent.status === 4 ? 'Pagado' : 'Finalizado'}}
          </q-badge>
        </div>
        <br>
        <div class="text-h6">Cotizaciones</div>
        <q-list bordered class="q-ma-sm" v-for="(item, index) in formEvent.cotisation" :key="index">
          <q-item-label class="q-mt-md text-bold">Cotisacion Nº {{index + 1}} </q-item-label>
          <div v-for="(serv, index2) in item.detallesServicios" :key="index2">
            <q-item-label header>* {{serv.id}}</q-item-label>
            <q-item v-for="(det, index3) in serv.list" :key="index3" class="item-styl q-mt-xs q-ml-lg">
              <q-item-section>
                <q-item-label> {{det.producto}} </q-item-label>
                <q-item-label caption> x{{det.cantidad}} </q-item-label>
                <q-item-label class="text-caption text-bold"> Valor: {{formatPrice(det.valor)}} </q-item-label>
                <q-item-label class="text-caption text-bold"> Total: {{formatPrice(det.valor * det.cantidad)}} </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="row q-mt-sm items-center">
            <div class="text-subtitle2">Total:</div>
            <div class="q-ml-sm text-bold text-h6"> {{formatPrice(item.total)}} </div>
          </div>
        </q-list>

        <q-card-actions align="center">
          <q-btn label="ok" color="primary" outline v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
require('vue-simple-calendar/static/css/default.css')
require('vue-simple-calendar/static/css/holidays-us.css')
export default {
  components: {
    CalendarView, CalendarViewHeader
  },
  data () {
    return {
      showDate: new Date(),
      eventos: [],
      formEvent: {},
      dialog: false
    }
  },
  mounted () {
    this.getEvent()
  },
  methods: {
    setShowDate (d) {
      this.showDate = d
      console.log(this.showDate, 'aaaa')
    },
    showDetailEvent (calendarItem, algo) {
      this.$api.get('event_by_id/' + calendarItem.id).then(res => {
        this.formEvent = res
        this.dialog = true
        console.log(this.formEvent, 'ressssssssssssssssssssssssssss')
      })
    },
    getEvent () {
      this.$api.get('events').then(res => {
        this.eventos = res
      })
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 67vh;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}

.dialog-styl {
  border-top: 4px solid rgb(4, 134, 255);
  border-bottom: 4px solid rgb(4, 134, 255);
}

.item-styl {
  border-left: 1px solid rgb(4, 134, 255);
  border-right: 1px solid rgb(4, 134, 255);
  border-top: 1px solid rgb(4, 134, 255);
  border-bottom: 1px solid rgb(4, 134, 255);
  border-radius: 10px
}
</style>
