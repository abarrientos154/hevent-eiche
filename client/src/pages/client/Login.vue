<template>
  <div>
    <div class="animated-body row justify-center">
      <img src="400x400/002.png" alt="Logo HEvent" style="width: 100%;height:260px">
    </div>
    <div>
      <div class="row justify-center text-h6 text-primary">Iniciar Sesión</div>
      <q-separator class="q-mt-xs" size="2px" inset />
    </div>
    <div class="row justify-center q-mt-md">
      <div class="row">
        <q-select borderless class="input-border-new q-pa-sm q-pt-sm" v-model="form.telCode" use-input input-debounce="0" :options="countries" @filter="filterFn" style="width: 80px"
         emit-value map-options option-value="name" option-label="name">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <div class="text-bold q-mt-sm" style="margin-top:12px">{{ scope.opt.dialCode }}</div>
          </template>
        </q-select>
        <q-input v-model="form.phone" class="input-border-new q-pa-sm q-ml-sm" style="width:200px" label="Telefono" dense borderless
        error-message="ingrese un telefono valido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
      </div>
    </div>
    <div class="text-center text-caption">Te enviaremos un mensaje para confirmar tu número. Sujeto a las tarifas para mensajes y datos</div>
    <div class="row justify-center">
     <q-btn color="primary" class="q-ma-sm button-border" style="width:150px" label="Siguiente"/>
    </div>
    <div class=" text-center text-subtitle2 ">Iniciar Sesión con</div>
    <div class="row justify-between q-ma-xs">
      <q-btn class="q-ma-sm" round color="with" style="width: 50px; height: 50px">
        <img src="icons/Iconos_Redes.png" style="width: 30px; height: 30px"/>
      </q-btn>
      <q-btn class="q-ma-sm" round color="indigo-10" style="width: 50px; height: 50px">
        <img src="icons/Iconos_Redes_1.png" style="width: 30px; height: 30px"/>
      </q-btn>
      <q-btn class="q-ma-sm" round color="grey" style="width: 50px; height: 50px">
        <img src="icons/Iconos_Redes_2.png" style="width: 30px; height: 30px"/>
      </q-btn>
      <q-btn class="q-ma-sm" round color="primary" style="width: 50px; height: 50px" to="/verificacion_correo">
        <img src="icons/Iconos_Redes_3.png" style="width: 30px; height: 30px"/>
      </q-btn>
      <q-btn class="q-ma-sm" round color="light-blue" style="width: 50px; height: 50px">
        <img src="icons/Iconos_Redes_4.png" style="width: 30px; height: 30px"/>
      </q-btn>
    </div>
    <div class="text-center text-caption">Si eres un proveedor, ingresa el icono de la caja</div>
    <q-separator class="q-mt-xs" size="2px" inset/>
    <div class="column items-center">
      <div class="text-subtitle2 q-mt-sm">¿No tienes una cuenta?</div>
      <q-btn color="primary" class="q-ma-sm button-border" style="width:150px" label="Registrarte" to="/registro_cliente"/>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      countriesOptions: [],
      countries: []
    }
  },
  validations: {
    form: {
      phone: { required }
    }
  },
  mounted () {
    this.getCountries()
    this.form.telCode = 'Chile'
  },
  methods: {
    getCountries () {
      this.$api.get('countries').then(res => {
        this.countriesOptions = res
        this.countries = res
      })
    },
    filterFn (val, update) {
      console.log(val, 'ballllllllll')
      if (val === '') {
        update(() => {
          this.countries = this.countriesOptions

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.countries = this.countriesOptions.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style>

</style>>
