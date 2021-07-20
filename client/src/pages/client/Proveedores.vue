<template>
  <q-page class="q-pa-sm">
    <div class="col full-width">
      <div header class="column">
        <div class="row">
          <div class="col-3">
            <q-btn flat color="primary" round style="width: 50px" icon="keyboard_arrow_left" @click="$router.go(-1)"/>
          </div>
          <q-space />
          <q-btn flat round color="grey" icon="favorite_border" @click="$router.push('/proveedores_me_gustan')" />
        </div>
        <div class="row justify-center">
          <div>
            <q-input class="input-border q-pl-sm" label-color="grey-14" type="email" v-model="busqueda" dense label="¿Que estas Buscando?" borderless style="width:300px"
              @input="filtrarInput()"
            />
          </div>
          <q-btn flat round color="black" icon="tune" @click="filterModal = true" />
        </div>
      </div>
      <div class="column">
        <div class="text-center text-h6 text-grey-6 q-mt-md"> Escoger Proveedores </div>
        <q-scroll-area horizontal class="bg-white full-width" style="height:120px" :thumb-style="thumbStyle" :content-style="contentStyle"
          :content-active-style="contentActiveStyle" >
          <div class="row no-wrap bg-white fit">
            <div v-for="(serv, index) in servicios" :key="index" style="width:90px; height:40px;" class="q-mt-lg q-ml-md" @click="cambiarProveedor(serv.id, index)">
              <div class="column items-center justify-center q-ml-sm border-servicios-item" :class="serv.select ? 'bg-cyan-1': 'bg-white'">
                <q-img :src="serv.icon" style="width:35px;height:35px;" />
                <div class="row justify-center items-center text-grey-7"> {{serv.title}} </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="row q-gutter-sm justify-around">
        <div style="width:160px;height:300px; border-radius:20px" v-for="(item, index) in proveedores" :key="index" @click="masInformacion(item.id_proveedor)" >
          <div class="column full-width justify-center items-center">
            <div class="text-bold text-grey-7 q-pl-sm q-pr-sm" > * {{item.name}} * </div>
            <q-card style="width: 100%; height:260px" class="border-items" >
              <q-img style="width:100%;height:100%" :src="baseu + item.id_proveedor" />
              <div style="position:absolute; bottom:0px;border-top-left-radius:8px;border-top-right-radius:8px;border-bottom-left-radius:0px;border-bottom-right-radius:0px" class="row justify-center full-width bg-white" >
               <div class="text-h6 text-primary" v-if="item.pyr.pyr[0].qvalmin"> ${{item.pyr.pyr[0].qvalmin}} </div>
                <q-btn class="gradiente-buttom full-width" push style="border-radius:7px" dense label="mas información" />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="filterModal" class="window-width">
      <q-card class="full-width q-pa-lg text-bold">
        <div class="column">
          <div class="text-h6">Filtros:</div>
          <div class="row q-gutter-x-md">
            <q-radio v-model="filterRB" val="re" label="Relevancia" />
            <q-radio v-model="filterRB" val="mayorp" label="Mayor Precio" />
            <q-radio v-model="filterRB" val="menorp" label="Menor Precio" />
          </div>
        </div>
        <q-separator inset class="q-ma-sm" />
        <div class="column">
          <div class="text-h6">Ubicacion:</div>
          <div>
            <q-select borderless v-model="country" :options="optionsCountry" label="Paises" class="input-border-new-re-pro" emit-value map-options
              @input="filterCheck = []"
            />
          </div>
          <div class="row q-gutter-x-md" v-if="country">
            <q-checkbox v-model="filterCheck" v-for="(item, index) in optionsCities" :key="index" :label="item.label" :val="item.value" />
          </div>
        </div>
        <q-card-actions>
          <q-btn label="Cancelar" flat color="negative" style="width:45%" v-close-popup />
          <q-btn label="Filtrar" push color="primary" style="width:45%" @click="filtrar()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import env from '../../env'
const cities = [
  {
    label: 'Antofagasta',
    value: 1,
    paisCode: 'cl'
  },
  {
    label: 'Santiago',
    value: 2,
    paisCode: 'cl'
  },
  {
    label: 'Concepcion',
    value: 3,
    paisCode: 'cl'
  },
  {
    label: 'Cali',
    value: 4,
    paisCode: 'co'
  },
  {
    label: 'Bogota',
    value: 5,
    paisCode: 'co'
  }
]
export default {
  data () {
    return {
      proveedoresT: [],
      country: null,
      optionsCountry: [
        {
          label: 'Colombia',
          value: 'co'
        },
        {
          label: 'Chile',
          value: 'cl'
        }
      ],
      checksByCities: [],
      filterCheck: [],
      filterRB: 're',
      filterModal: false,
      baseu: '',
      busqueda: '',
      header: '',
      id: '',
      proveedores: [],
      servicios: [
        { title: 'Locación', id: 'localizacion', icon: 'icon_services/locacion.png', select: true },
        { title: 'Alimentos', id: 'alimentos', icon: 'icon_services/alimentos.png', select: false },
        { title: 'Bebidas', id: 'bebidas', icon: 'icon_services/bebidas.png', select: false },
        { title: 'Fotógrafo', id: 'fotografia', icon: 'icon_services/fotografia.png', select: false },
        { title: 'Vídeo', id: 'video', icon: 'icon_services/video.png', select: false },
        { title: 'Audio', id: 'audio', icon: 'icon_services/audio.png', select: false },
        { title: 'Música', id: 'musica', icon: 'icon_services/musica.png', select: false },
        { title: 'Iluminación', id: 'iluminacion', icon: 'icon_services/iluminacion.png', select: false },
        { title: 'Invitación', id: 'invitacion', icon: 'icon_services/invitacion.png', select: false },
        { title: 'Recuerdos', id: 'recuerdos', icon: 'icon_services/recuerdos.png', select: false },
        { title: 'Decoración', id: 'decoracion', icon: 'icon_services/decoracion.png', select: false },
        { title: 'Mobiliario', id: 'mobiliaria', icon: 'icon_services/mobiliaria.png', select: false },
        { title: 'Transporte', id: 'transporte', icon: 'icon_services/transporte.png', select: false },
        { title: 'Personal', id: 'personas', icon: 'icon_services/personas.png', select: false }
      ],
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },

      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '0px',
        backgroundColor: '#027be3',
        width: '0px',
        opacity: 0
      }
    }
  },
  computed: {
    optionsCities () {
      if (this.country) {
        return cities.filter(v => v.paisCode === this.country)
      } else {
        return false
      }
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'file_proveedor/portada/'
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.header = this.id.charAt(0).toUpperCase() + this.id.slice(1)
      this.getRecord()
      this.actualizarSelectSer()
    }
  },
  methods: {
    actualizarSelectSer () {
      const ind = this.servicios.findIndex(v => v.id === this.id)
      this.cambiarProveedor(this.id, ind)
    },
    filtrarInput () {
      if (this.busqueda === '') {
        this.filtrar()
      } else {
        // const needle = this.busqueda.toLowerCase()
        const fil = this.proveedores.filter(v => v.name.toLowerCase().indexOf(this.busqueda.toLowerCase()) > -1)
        // const fil = this.proveedores.filter(v => v.name >= this.busqueda)
        this.proveedores = fil
      }
    },
    async verificarCiudad (valueCity) {
      for (const j of this.filterCheck) {
        console.log('verificarCiudad', j, valueCity)
        if (j === valueCity) {
          return true
        }
      }
      return false
    },
    async filtrar () {
      console.log(this.country, this.filterCheck, this.filterRB)
      this.$q.loading.show()
      this.proveedores = this.proveedoresT
      var newFilter = []
      var filtradoRB = []
      if (this.country && this.filterCheck.length > 0) {
        if (this.filterRB === 'mayorp') {
          filtradoRB = this.proveedores.sort((a, b) => (a.pyr.pyr[0].qvalmax + b.pyr.pyr[0].qvalmax))
        } else if (this.filterRB === 'menorp') {
          filtradoRB = this.proveedores.sort((a, b) => (a.pyr.pyr[0].qvalmin - b.pyr.pyr[0].qvalmin))
        } else if (this.filterRB === 're') {
          filtradoRB = this.proveedores.sort((a, b) => (a.plan_id > b.plan_id) ? -1 : ((b.plan_id > a.plan_id) ? 0 : -1))
        }
        this.proveedores = filtradoRB
        newFilter = []
        for (const j of this.proveedores) {
          if (await this.verificarCiudad(j.ciudad.value)) { newFilter.push(j) }
          console.log(newFilter, 'newFilter', await this.verificarCiudad(j.ciudad.value), 'asd')
        }
        this.proveedores = newFilter
      } else if (this.country) {
        console.log('else country')
        if (this.filterRB === 'mayorp') {
          filtradoRB = this.proveedores.sort((a, b) => (a.pyr.pyr[0].qvalmax + b.pyr.pyr[0].qvalmax))
        } else if (this.filterRB === 'menorp') {
          filtradoRB = this.proveedores.sort((a, b) => (a.pyr.pyr[0].qvalmin - b.pyr.pyr[0].qvalmin))
        } else if (this.filterRB === 're') {
          filtradoRB = this.proveedores.sort((a, b) => (a.plan_id > b.plan_id) ? -1 : ((b.plan_id > a.plan_id) ? 0 : -1))
        }
        this.proveedores = filtradoRB
        newFilter = []
        for (const j of this.proveedores) {
          if (j.country === this.country) { newFilter.push(j) }
        }
        this.proveedores = newFilter
      } else {
        if (this.filterRB === 'mayorp') {
          filtradoRB = this.proveedores.sort((a, b) => (a.pyr.pyr[0].qvalmax + b.pyr.pyr[0].qvalmax))
        } else if (this.filterRB === 'menorp') {
          filtradoRB = this.proveedores.sort((a, b) => (a.pyr.pyr[0].qvalmin - b.pyr.pyr[0].qvalmin))
        } else if (this.filterRB === 're') {
          filtradoRB = this.proveedores.sort((a, b) => (a.plan_id > b.plan_id) ? -1 : ((b.plan_id > a.plan_id) ? 0 : -1))
        }
        this.proveedores = filtradoRB
      }
      console.log(this.proveedores, 'proveedores resultado filtrado')
      this.$q.loading.hide()
    },
    async masInformacion (id) {
      this.$q.loading.show()
      await this.$api.post('impressions/' + id).then(res => {
        this.$q.loading.hide()
        console.log(res, 'res impresiones')
      })
      this.$router.push('/proveedor/' + this.$route.params.id + '/' + id)
    },
    async cambiarProveedor (id, ind) {
      console.log(id, ind, 'id ind')
      this.$router.push('/proveedores/' + id)
      this.id = id
      const indexSelect = this.servicios.findIndex(v => v.select)
      this.servicios[indexSelect].select = false
      this.servicios[ind].select = true
      await this.getRecord()
    },
    async getRecord () {
      await this.$api.get('proveedores_servicios/' + this.id).then(res => {
        this.proveedores = res.map(v => {
          return {
            ...v,
            ...v.datos_proveedor
          }
        })
        // ordenar proveedores por plan premiun, estandar y por ultimo los basicos
        const ordenar = this.proveedores.sort((a, b) => (a.plan_id > b.plan_id) ? -1 : ((b.plan_id > a.plan_id) ? 0 : -1))
        this.proveedores = ordenar
        this.proveedoresT = ordenar
        console.log(this.proveedores, 'proveedores')
      })
    },
    ruta (id, header) {
      this.$router.push('/proveedor/' + header + '/' + id)
    }
  }
}
</script>
<style lang="scss" scoped>
.border-items {
  border: 1px solid $grey-4;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
.border-servicios-item {
  border: 0.5px solid white;
  border-radius: 12px;
  height: 85px;
  width: 85px;
  padding-right: 5px;
  padding-left: 5px;
}

.input-border-new-re-pro {
  background: #e1f5ff;
  border: 0px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 10px;
}
</style>
