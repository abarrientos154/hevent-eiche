<template>
  <q-page v-if="data.length > 0" class="q-pb-lg">
    <div class="absolute-top-center text-center full-width q-mt-sm text-h6 text-white" style="position: absolute">Eventos Realizados</div>
    <q-btn icon="arrow_back_ios" flat dense color="white" style="position: absolute" class="q-mt-sm q-ml-sm" @click="$router.go(-1)" />
    <img src="nubeazul1.png" height="170px" width="100%" />
    <div class="row full-width justify-around q-gutter-sm q-gutter-y-md q-pr-xs q-mt-sm">
      <q-card v-for="(item, index) in data" :key="index" style="width:45%;min-width:150px;height:185px;border-radius:12px"
        class="bg-primary" @click="$router.push('/mi_evento/' + item._id)"
      >
        <div class="text-center q-mt-sm text-white"> {{item.name}} </div>
        <div class="bordes-abajo bg-grey-5 no-border">
          <q-img :src="item.img ? baseu + item._id : 'evento.jpg'" class="no-box-shadow bordes-abajo no-border" style="height:80px;width:100%" />
        </div>
        <div class="column items-center text-white bg-grey-5 q-pt-sm" style="height:59px">
          <div class="text-black text-bold"> {{item.date}} </div>
          <div class="text-black text-bold"># Invitados: {{item.invitados}}</div>
        </div>
      </q-card>
    </div>
  </q-page>
  <q-page v-else>
    <div class="absolute-top-center text-center full-width q-mt-sm text-h6 text-white" style="position: absolute">Eventos Realizados</div>
    <q-btn icon="arrow_back_ios" flat dense color="white" style="position: absolute" class="q-mt-sm q-ml-sm" @click="$router.go(-1)" />
    <img src="nube300x160.jpg" height="170px" width="100%" />
    <div class="absolute-center">
      <img src="sin_eventos_realizados.jpg" alt="sin eventos" @click="$router.push('/inicio_cliente/crear_evento')">
    </div>
  </q-page>
</template>

<script>
import env from '../../../env'
export default {
  data () {
    return {
      data: [],
      baseu: ''
    }
  },
  mounted () {
    this.getData()
    this.baseu = env.apiUrl + 'file_event/'
  },
  methods: {
    getData () {
      this.$api.get('events_by_user').then(res => {
        this.data = res
      })
    }
  }
}
</script>

<style scoped>
.bordes-abajo {
 border-bottom-right-radius: 15px;
 border-bottom-left-radius: 15px;
}
</style>
