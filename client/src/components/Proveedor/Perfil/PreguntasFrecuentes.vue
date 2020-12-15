<template>
  <q-card class="full-width nube-editar-datos q-pb-xl">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>
    <div class="text-h5 text-grey-8 q-mt-xl q-ml-xl text-bold text-grey-7" style="margin-top:120px">Editar</div>
    <q-separator class="q-mt-sm" inset />

    <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
      <q-tab-panel name="servicios">
        <servicios :form="form" :servicios="servicios" :user="user" />
      </q-tab-panel>

      <q-tab-panel name="preguntas">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import Servicios from '../Perfil/PreguntasFrecuentes/Servicios'
export default {
  components: {
    Servicios
  },
  data () {
    return {
      panel: 'servicios',
      form: {
        checks: []
      },
      servicios: [],
      user: {}
    }
  },
  async mounted () {
    await this.getInfo()
    this.getServicios()
    this.getChecks()
  },
  methods: {
    test () {
      console.log(this.form, 'this form')
    },
    async getInfo () {
      await this.$api.get('users_perfil').then(res => {
        this.user = res
      })
    },
    getServicios () {
      this.$api.get('servicios').then(res => {
        this.servicios = res
        console.log(res, 'res')
      })
    },
    getChecks () {
      this.$api.get('obtener_check_servicios_perfil/' + this.user._id).then(res => {
        this.form.checks = res
        console.log(res, 'res checks servicios_perfil')
      })
    }
  }
}
</script>

<style>

</style>>
