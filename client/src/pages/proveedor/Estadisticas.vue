<template>
  <q-page>
    <div class="fondo-estadisticas full-width">
      <div class="text-h6 absolute-top text-center text-white text-bold q-mt-sm">Estadisticas</div>
    </div>
    <q-btn icon="keyboard_arrow_left" flat round color="white" style="position:absolute;top:10px;left:10px" @click="$router.go(-1)" />
    <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md" style="height:400px">
      <div class="column">
        <div class="row items-center">
          <div class="row items-center">
            <q-icon name="visibility" color="black" size="lg" />
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Impresiones</div>
          </div>
          <q-space />
          <div class="bg-grey q-pa-xs text-white text-bold border-impression" >
            {{form.totalImpressions}}
          </div>
        </div>
        <bar-chart v-if="ejecutar" :data="chartDataImpression" :options="chartOptionsImpression" style="width:300px" class="q-mt-sm"></bar-chart>
      </div>
    </q-card>
    <div class="column q-ma-md">
      <q-card class="estilo-card-est q-pa-md no-shadow">
        <div class="row justify-between items-center">
          <div class="text-h6 text-grey-6"> Posición Global </div>
          <div class="row items-center estilo-borde-puntuacion">
            <q-icon name="star" color="orange" size="lg" />
            <div class="text-h6 text-grey-6 q-ml-sm q-mr-sm"> {{form.puntuacion}} </div>
          </div>
        </div>
        <q-list dense class="q-mt-md">
          <q-item>
            <q-item-section class="q-ml-lg" style="width:100%">
              <q-item-label class="text-grey-7">Calidad del Servicio</q-item-label>
            </q-item-section>

            <q-item-section side center class="q-ml-lg" style="width:150px">
              <q-rating disable v-model="form.calidadS" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Costo Beneficio</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating disable v-model="form.costoB" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Profesionalidad</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating disable v-model="form.profesionalidad" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Respuesta</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating disable v-model="form.respuesta" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Flexibilidad</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating disable v-model="form.flexibilidad" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>
        </q-list>
        <div>
          <q-btn label="ver opiniones" class="float-right gradiente-buttom q-mt-lg" push @click="$router.push('/opiniones_proveedor')" />
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md">
        <div class="row">
          <div class="row items-center">
            <q-icon name="favorite_border" color="black" size="lg" />
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Me Gusta</div>
          </div>
          <div class="border-likes" >
            {{form.like}}
          </div>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md">
        <div class="row">
          <div class="row items-center">
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Tiempo de Respuesta</div>
          </div>
          <div class="border-likes" >
            {{form.tiempoR}}
          </div>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md" style="height:360px">
        <div class="column">
          <div class="q-ml-md text-subtitle1 text-grey-7 text-bold"> Tipo de Evento Realizado </div>
          <pie-chart v-if="ejecutar" :data="chartData" :options="chartOptions" style="width:300px"></pie-chart>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md" @click="$router.push('/aprobacion_cotizacion')">
        <div class="row">
          <div class="row items-center">
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Cotizaciones Rechazadas</div>
          </div>
          <div class="border-likes" >
            {{form.cr}}
          </div>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md" @click="$router.push('/aprobacion_cotizacion')">
        <div class="row">
          <div class="row items-center">
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Cotizaciones Aprobadas</div>
          </div>
          <div class="border-likes" >
            {{form.ca}}
          </div>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md" @click="$router.push('/aprobacion_cotizacion')">
        <div class="row">
          <div class="row items-center">
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Cotizaciones Pagadas</div>
          </div>
          <div class="border-likes" >
            {{form.cp}}
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PieChart from '../PieChart'
import BarChart from '../proveedor/BarChart'
export default {
  components: {
    PieChart, BarChart
  },
  data () {
    return {
      ejecutar: false,
      chartOptionsImpression: {
        hoverBorderWidth: 20
      },
      chartDataImpression: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Impresiones',
            backgroundColor: ['#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE', '#008ADE'],
            data: [1, 1, 1, 1, 1, 1, 1]
          }
        ]
      },
      chartOptions: {
        hoverBorderWidth: 20
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['Celebraciones', 'Boda', 'Corporativo', 'Reunion', 'Convencion', 'Artistico', 'Espiritual', 'Deportivo'],
        datasets: [
          {
            label: 'Datos',
            backgroundColor: ['#004B78', '#0068A7', '#008ADE', '#31B1FF', '#75CBFF', '#B8E4FF', '#EDF8FF'],
            data: [1, 1, 1, 1, 1, 1, 1]
          }
        ]
      },
      form: {
        puntuacion: 4.9,
        like: 29,
        tiempoR: '00:00',
        ca: 25,
        cr: 24,
        cp: 10
      }
    }
  },
  mounted () {
    this.getEst()
  },
  methods: {
    getEst () {
      this.$api.get('estadisticas').then(res => {
        if (res) {
          this.form = res
          this.chartData.datasets[0].data = res.dataChar
          this.chartDataImpression.datasets[0].data = res.dataCharImpression
          this.ejecutar = true
          console.log(this.chartData, 'res')
        }
      })
    }
  }
}
</script>

<style>
.border-impression {
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
.border-likes {
  right: 10px;
  position: absolute;
  color: white;
  background: rgb(192, 192, 192);
  border: 1px solid rgb(192, 192, 192);
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 2px;
  top: 30%
}

.fondo-estadisticas {
  background: url('../../../public/nubeazul1.png');
  width: 100%;
  height: 150px;
  background-size: 100% 100%;
}
.estilo-card-est {
  border-radius: 20px;
  border: 2px solid rgb(192, 192, 192);
}

.estilo-borde-puntuacion {
  border: 1px solid rgb(192, 192, 192);
  padding: 3px;
}
</style>
