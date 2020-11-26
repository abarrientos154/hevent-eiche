<template>
  <q-page>
    <div class="col full-width">
      <div header class="row">
        <div class="col-3 q-pl-md">
            <q-btn flat class="text-grey" round style="width: 50px" icon="keyboard_arrow_left" @click="$router.go(-1)"/>
        </div>
        <div class="col-5 q-pt-xs text-h6 text-primary text-bold text-center">{{header}}</div>
        <q-btn flat no-caps class="col-4 text-grey text-subtitle1" icon="tune" label="Filtros" />
      </div>
      <q-separator/>
      <div class="q-pl-md q-pt-sm text-subtitle2 text-grey-8"><u>{{ proveedores.length}} empresas</u></div>
      <div
        class="col full-width q-pa-md"
        v-for="(data, index) in proveedores"
        :key="index">
          <q-card
            class="shadow-8"
            style="width: 100%"
            >
              <q-img :src="index < img.length ? img[index] : 'example_1.jpg'" style="width: 100%">
                <q-card-actions flat vertical class="bg-transparent absolute-right">
                  <q-btn flat round color="red" icon="favorite_border" />
                  <q-btn flat round color="yellow" icon="star_border" />
                  <q-badge color="grey-7" text-color="white" label="Mi Elegido" />
                </q-card-actions>
              </q-img>
              <q-card-section horizontal class="row">
                <q-card-section class="col-6 items-start q-px-sm">
                    <div class="text-subtitle2 text-grey-8 text-start">{{ data.datos_proveedor.name ? data.datos_proveedor.name : 'Nombre Proveedor' }}</div>
                    <q-rating v-model="rating" :max="5" size="20px" />
                    <div class="row q-pt-xs">
                      <div class="col-1 items-start" >
                        <q-icon style="font-size: 16px;" class="text-primary" name="question_answer" />
                        <div class="text-caption text-grey">Desde</div>
                      </div>
                      <div class="col-11 q-pl-sm text-caption text-grey-7"># Comentarios</div>
                    </div>
                    <div v-if="data.menu_costo" class="q-pa-xs text-h6 text-primary text-start">$ {{ data.menu_costo ? data.menu_costo : '0000' }}</div>
                    <div class="row q-pt-xs">
                      <div class="col-2 items-start" >
                        <q-icon style="font-size: 20px;" class="text-primary" name="group" />
                      </div>
                      <div class="col-10 q-pl-sm text-caption text-grey-7" v-if="data.invitados">{{data.invitados ? data.invitados : '#'}} Invitados</div>
                    </div>
                </q-card-section>
                <q-card-section class="col-6 justify-end q-px-sm">
                    <div class="text-subtitle2 text-grey-8 text-end">{{data.datos_proveedor.city ? data.datos_proveedor.city : 'Ciudad'}}</div>
                    <div class="q-pa-xs text-subtitle2 text-grey-7">{{data.description ? data.description : 'Descripcion'}}</div>
                    <q-btn unelevated style="width: 100%" no-caps color="primary" label="Más Información" @click="ruta(data.datos_proveedor._id, header)" />
                </q-card-section>
                </q-card-section>
          </q-card>
        </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      header: '',
      id: '',
      rating: 1,
      img: ['example_1.jpg', 'example_2.jpg', 'example_3.jpg', 'example_4.jpg', 'example_5.jpg', 'example_7.jpg', 'example_7.jpg'],
      proveedores: []
    }
  },
  computed: {},
  mounted () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.header = this.id.charAt(0).toUpperCase() + this.id.slice(1)
      this.getRecord()
    }
  },
  methods: {
    async getRecord () {
      await this.$api.get('proveedores_servicios/' + this.id).then(res => {
        this.proveedores = res
        console.log(this.proveedores)
      })
    },
    ruta (id, header) {
      this.$router.push('/proveedor/' + header + '/' + id)
    }
  }
}
</script>
