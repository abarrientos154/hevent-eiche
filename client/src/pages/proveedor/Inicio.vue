<template>
  <q-page>
    <div class="col full-width">
      <q-img
          src="example_7.jpg"
          style="width: 100%"
          img-class="my-custom-image"
        >
          <div class="absolute-center bg-transparent text-center" style="width: 100%">
            <div class="text-white text-h6">{{usuario ? usuario : 'Nombre del Proveedor'}}</div>
            <q-btn outline no-caps class="text-white" color="dark" label="Editar Perfil" to="/perfil_proveedor" />
          </div>
        </q-img>
        <div class="row q-py-lg q-gutter-md justify-center" style="width: 100%">
            <div
            class="col-5"
            v-for="(card, index) in rutas"
            :key="index">
                <div class="q-py-xs q-px-sm items-center">
                    <q-card class="q-px-md q-py-sm bg-grey-3" >
                        <div class="text-center">
                            <q-icon center class="text-primary" :name="card.icon" @click="$router.push(card.ruta)" style="font-size: 4.4em;" />
                        </div>
                        <div class="text-center text-subtitle1 text-grey-8">{{card.name}}</div>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      usuario: '',
      rutas: [
        { name: 'Calendario', icon: 'today', ruta: '/calendario_eventos' },
        { name: 'Mensajes', icon: 'mail_outline', ruta: '/chats_proveedor' },
        { name: 'Opiniones', icon: 'psychology', ruta: '' },
        { name: 'Estadísticas', icon: 'insert_chart_outlined', ruta: '' }
      ]
    }
  },
  validations: {
  },
  computed: {},
  mounted () {
    this.getRecord()
  },
  methods: {
    async getRecord () {
      await this.$api.get('proveedores_perfil').then(res => {
        if (res) {
          this.usuario = res.form.user_data.full_name
          console.log(this.usuario)
        }
      })
    }
  }
}
</script>
