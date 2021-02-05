<template>
  <q-page>
    <div class="fondo-estadisticas full-width">
      <div class="text-h6 absolute-top text-center text-white text-bold q-mt-sm">Estadisticas</div>
    </div>
    <div class="column q-ma-md">
      <q-card class="estilo-card-est q-pa-md no-shadow">
        <div class="row justify-between items-center">
          <div class="text-h6 text-grey-6"> Posición Global </div>
          <div class="row items-center estilo-borde-puntuacion">
            <q-icon name="star" color="orange" size="lg" />
            <div class="text-h6 text-grey-6 q-ml-sm q-mr-sm"> {{form.puntuacion}} </div>
          </div>
        </div>
        <div>
          <q-btn label="ver opiniones" class="float-right gradiente-buttom q-mt-lg" push />
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

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md" style="height:300px">
        <div class="column">
          <div class="q-ml-md text-subtitle1 text-grey-7 text-bold"> Tipo de Evento Realizado </div>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md">
        <div class="row">
          <div class="row items-center">
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Cotizaciones Rechazadas</div>
          </div>
          <div class="border-likes" >
            {{form.cr}}
          </div>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md">
        <div class="row">
          <div class="row items-center">
            <div class="q-ml-md text-subtitle1 text-grey-7 text-bold">Cotizaciones Aprobadas</div>
          </div>
          <div class="border-likes" >
            {{form.ca}}
          </div>
        </div>
      </q-card>

      <q-card class="estilo-card-est q-pa-md no-shadow q-mt-md">
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

export default {
  data () {
    return {
      form: {
        puntuacion: 4.9,
        like: 29,
        tiempoR: '00:42',
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
    }
  }
}
</script>

<style>
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
  height: 220px;
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
