<template>
  <q-page>
    <div  class="fondo-opiniones">
      <div class="text-center text-white text-bold text-h6 q-pt-lg">Opiniones</div>
    </div>
    <q-btn icon="keyboard_arrow_left" flat round color="white" style="position:absolute;top:10px;left:10px" @click="$router.go(-1)" />
    <div class="q-mb-md q-mt-md" v-if="data.length > 0">
    <q-list class="q-mt-sm q-mb-lg">
      <div v-for="(item, index) in data" :key="index">
        <q-item class="q-mt-md" v-ripple clickable @click="dialog = true, form = item">
          <q-item-section center avatar v-if="baseu">
            <q-avatar>
              <q-img :src="item.usuario.perfil ? baseu + item.usuario._id : 'noimg.png'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{item.usuario.full_name}}</q-item-label>
            <q-item-label caption lines="5">{{item.opinion}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="column">
              <q-item-label caption>{{item.created_at}}</q-item-label>
              <div class="row justify-end q-mt-md items-center">
                <div class="text-subtitle1 text-bold"> {{item.puntuacion}} </div>
                <q-icon name="star" color="orange" class="q-ml-sm" size="30px" />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
  <div v-else>
    <div class="absolute-center text-subtitle1">
      Actualmente sin opiniones...
    </div>
  </div>
  <q-dialog v-model="dialog" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
    <q-card class="full-width nube-opinion q-mt-xl" style="margin-top:70%">
      <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
        <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
      </div>
      <div class="row justify-center" style="margin-top:30%">
        <q-item v-if="baseu">
          <q-item-section avatar>
            <q-img :src="form.usuario.perfil ? baseu + form.usuario._id : 'noimg.png'" style="border-radius:100%; width:70px;height:70px" />
          </q-item-section>

          <q-item-section class="text-primary text-subtitle1">
            <q-item-label> * {{form.usuario.full_name}} *  </q-item-label>
            <q-item-label caption class="q-ml-sm"> {{form.created_at}} </q-item-label>

          </q-item-section>

        </q-item>
      </div>
      <div class="row justify-center">
        <div class="q-pa-sm row justify-center items-center estilo-puntuacion">
          <div>
            <q-icon name="start" color="orange" size="md" />
          </div>
          <div class="text-h6 text-grey-6"> {{form.puntuacion}} </div>
        </div>
      </div>
      <q-list dense>
          <q-item>
            <q-item-section class="q-ml-lg" style="width:100%">
              <q-item-label class="text-grey-7">Calidad del Servicio</q-item-label>
            </q-item-section>

            <q-item-section side center class="q-ml-lg" style="width:150px">
              <q-rating v-model="form.calidadS" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Costo Beneficio</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating v-model="form.costoB" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Profesionalidad</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating v-model="form.profesionalidad" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Respuesta</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating v-model="form.respuesta" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="q-ml-lg" style="width:150px">
              <q-item-label class="text-grey-7">Flexibilidad</q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-rating v-model="form.flexibilidad" size="1.5em" class="q-ml-md" color="primary" />
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-ma-md text-grey-7" style="font-size:11px">
          <p>
            {{form.opinion}}
          </p>
        </div>
    </q-card>
  </q-dialog>
  </q-page>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      data: [],
      form: {},
      baseu: null,
      dialog: false
    }
  },
  async mounted () {
    await this.consultar()
    this.baseu = env.apiUrl + 'file_proveedor/perfil/'
  },
  methods: {
    async consultar () {
      this.$q.loading.show()
      await this.$api.get('opiniones').then(res => {
        this.$q.loading.hide()
        this.data = res
        this.data = res.map(v => {
          return {
            ...v
          }
        })
        console.log(this.data, 'asdasdas')
        this.form = this.data[0]
      })
    }
  }
}
</script>

<style>
.fondo-opiniones {
  background: url('../../../public/nubeazul1.png');
  width: 100%;
  height: 150px;
  background-size: 100% 100%;
}
.nube-opinion {
  background: url('../../../public/nube9.png');
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
</style>
