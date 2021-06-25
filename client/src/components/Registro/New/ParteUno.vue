<template>
  <div>
    <div class="row justify-center">
      <img src="RegistroCliente/Mesa de trabajo 2.png" style="width: 100%;height:260px"/>
    </div>
    <div style="position:absolute; top:10px; left:5px" >
      <q-btn icon="keyboard_arrow_left" flat round color="white" style="position:absolute;top:5px;left:5px" @click="$router.push('login_proveedor')" />
    </div>
    <div class="text-center text-h6 text-primary">* Registro *</div>
    <q-separator inset />
    <div class="text-center text-subtitle1 text-grey-9"> * Datos de Acceso *</div>
    <div class="row q-pa-sm q-ml-md q-mr-md">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.username" class="input-border-new q-pa-sm" label="Usuario" borderless dense
          error-message="ingrese un Usuario valido" :error="$v.form.username.$error" @blur="$v.form.username.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input class="input-border-new q-pa-sm" :type="isPwd ? 'password' : 'text'" v-model="password" label="Contraseña" dense label-color="grey-14" borderless
        error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.password.$error" @blur="$v.password.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input class="input-border-new q-pa-sm" :type="isPwd ? 'password' : 'text'" v-model="repeatPassword" label="Confirmar Contraseña" dense label-color="grey-14" borderless
        error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
    </div>
    <q-separator inset />
    <div class="text-center q-mt-sm text-grey-9 text-subtitle1"> * Datos de Persona o Empresa * </div>
    <div class="row q-pa-sm q-ml-md q-mr-md">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.name" class="input-border-new q-pa-sm" label="Nombre de Persona o Empresa" borderless dense
          error-message="ingrese un Nombre de Persona o Empresa valido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.personaContacto" class="input-border-new q-pa-sm" borderless label="Persona Contacto" dense
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.email" class="input-border-new q-pa-sm" type="email" label="Email" dense borderless
          error-message="ingrese un email valido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-select v-model="pais" class="input-border-new q-pa-sm" label="Pais" style="height:45px" dense borderless :options="countriesP"
          error-message="el pais es requerido" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" @input="form.country = pais, prueba(), form.ciudad = null, ciudad = null"
          emit-value map-options
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
              <q-item-section avatar>
                <q-img :src="scope.opt.label !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg' " />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope" >
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" style="position:absolute;top:5px;left:0px;padding-bottom:10px" >
              <q-item-section avatar>
                <q-img :src="pais !== 'cl' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg'" style="width:30px;height:20px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div>
        <div class="row">
          <q-select borderless v-model="telCode" :options="countries" option-value="name" option-label="name" emit-value map-options
            style="width:120px" class="input-border-new-re-pro" @input="test()"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
                <q-item-section avatar>
                  <q-img :src="scope.opt.name !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg' " />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.name" />
                  <q-item-label caption>{{ scope.opt.dialCode }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope" class="row" >
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
                <q-item-section avatar>
                  <q-img :src="form.telCode !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg'" style="width:30px;height:20px" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.dialCode }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input v-model="form.telefono" class="input-border-new q-pa-sm q-ml-sm" style="width:150px" label="Telefono" dense borderless
            error-message="ingrese un telefono valido" :error="$v.form.telefono.$error" @blur="$v.form.telefono.$touch()"
          />
        </div>
      </div>
      <div>
        <div class="row">
          <q-select borderless v-model="celCode" :options="countries" option-value="name" option-label="name" emit-value map-options
            style="width:120px" class="input-border-new-re-pro" @input="test()"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
                <q-item-section avatar>
                  <q-img :src="scope.opt.name !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg' " />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.name" />
                  <q-item-label caption>{{ scope.opt.dialCode }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope" class="row" >
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
                <q-item-section avatar>
                  <q-img :src="form.celCode !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg'" style="width:30px;height:20px" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.dialCode }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input v-model="form.celular" class="input-border-new q-pa-sm q-ml-sm" style="width:150px" label="Celular" dense borderless
            error-message="ingrese un celular valido" :error="$v.form.celular.$error" @blur="$v.form.celular.$touch()"
          />
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-select borderless v-model="ciudad" :options="citiesF" option-value="value" option-label="label" map-options
          class="input-border-new-re-pro" style="padding-left:10px" @input="form.ciudad = ciudad" label="Ciudad"
        />
      </div>
      <div class="full-width">
        <google-map :center="center" :zoom="10" @getBounds="getBounds" @newPlace="handleNewPlace" :withoutDirection="false" />
      </div>
    </div>
    <q-separator inset class="q-mt-md" />
    <div class="text-center text-subtitle1 text-grey-9 q-mt-md"> * Registro de la cuenta bancaria * </div>
    <div class="row q-pa-sm q-ml-md q-mr-md">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.banco" class="input-border-new q-pa-sm" label="Banco" dense borderless
          error-message="ingrese una banco valida" :error="$v.form.banco.$error" @blur="$v.form.banco.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.numCuenta" class="input-border-new q-pa-sm" label="Numero de la cuenta" dense borderless
          error-message="ingrese un Numero de Cuenta valida" :error="$v.form.numCuenta.$error" @blur="$v.form.numCuenta.$touch()"
        />
      </div>
    </div>
    <div class="row justify-center q-gutter-xs q-mb-md">
      <div :class="cuenta === 'Ahorro' ? 'tipo-cuenta-on' : 'tipo-cuenta-off'" @click="changeTipoCuenta()">Ahorro</div>
      <div :class="cuenta === 'Corriente' ? 'tipo-cuenta-on' : 'tipo-cuenta-off'" @click="changeTipoCuenta()" >Corriente</div>
    </div>
    <div class="q-ma-sm">
      <p style="text-align:center"> Al seleccionar aceptar y continuar a continuación, aceptas las <a href="https://heventapp.com/terminos-y-condiciones/">Condiciones de uso</a> y la <a href="https://heventapp.com/politica-de-privacidad/">política de protección de datos de Hevent </a> </p>
    </div>
    <div class="row justify-center q-pa-sm">
      <q-btn class="button-border" style="height:45px; width:190px" color="primary" label="Aceptar y Continuar" @click="next()" />
    </div>
  </div>
</template>

<script>
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import GoogleMap from '../../../components/GoogleMap'
export default {
  props: ['form', 'panel'],
  components: {
    GoogleMap
  },
  data () {
    return {
      ciudad: null,
      pais: 'co',
      countriesP: [{ label: 'Chile', value: 'cl' }, { label: 'Colombia', value: 'co' }],
      markers: [],
      center: { lat: -33.44750385220407, lng: -70.66966424231235 },
      telCode: '',
      celCode: '',
      cuenta: 'Ahorro',
      password: '',
      repeatPassword: '',
      isPwd: true,
      countriesOptions: [],
      countries: [
        {
          name: 'Chile',
          dialCode: '+56',
          code: 'CL'
        },
        {
          name: 'Colombia',
          dialCode: '+57',
          code: 'CO'
        }
      ],
      cities: [
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
      ],
      tel: null,
      cel: null
    }
  },
  computed: {
    citiesF () {
      if (this.pais) {
        return this.cities.filter(v => v.paisCode === this.pais)
      } else {
        return []
      }
    }
  },
  validations () {
    return {
      form: {
        username: { required },
        name: { required },
        email: { required, email },
        telefono: { required },
        celular: { required },
        ciudad: { required },
        direccion: { required },
        banco: { required },
        numCuenta: { required },
        country: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  mounted () {
    // this.getCountries()
    this.telCode = 'Colombia'
    this.celCode = 'Colombia'
    this.form.country = 'co'
    this.form.tipoCuenta = 'Ahorro'
  },
  methods: {
    prueba () {
    },
    getBounds (bounds, center) {
      console.log(center, 'center')
    },
    handleNewPlace (place, coordinates) {
      console.log('handleNewPlace', coordinates, 'PLACE', place)
      this.form.ubicacion = coordinates
      this.form.direccionCad = place
      console.log(this.form, 'formmmmmmmmmmmmmmmmmmmmmmm')
    },
    test () {
      this.form.telCode = this.telCode
      this.form.celCode = this.celCode
    },
    getCountries () {
      this.$api.get('countries').then(res => {
        this.countriesOptions = res
        this.countries = res
      })
    },
    filterFn (val, update) {
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
    },
    changeTipoCuenta () {
      this.cuenta = this.cuenta === 'Ahorro' ? 'Corriente' : 'Ahorro'
      this.form.tipoCuenta = this.cuenta
    },
    async next () {
      this.$q.loading.show()
      this.$v.$touch()
      this.$v.form.email.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      if (!this.$v.form.email.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        await this.$api.get('validate_email/' + this.form.email).then(res => {
          if (res) {
            this.form.password = this.password
            this.panel.panel = 'parte_dos'
          }
        })
      }
      this.$q.loading.hide()
    }
  }
}
</script>
<style>
.background-unot {
  background: url('../../../../public/RegistroCliente/Mesa de trabajo 2.png');
  height: 250px;
  background-size: 100% 100%;
}

.tipo-cuenta-on {
  background-color: rgb(4, 174, 233);
  color: white;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 3px;
  padding-left: 20px;
  padding-right: 20px;
}

.tipo-cuenta-off {
  background-color: rgb(239, 250, 255);
  color: rgb(172, 180, 180);
  border: 1px solid grey;
  border-radius: 6px;
  padding: 3px;
  padding-left: 20px;
  padding-right: 20px;
}

.input-border-new-re-pro {
  background: #e1f5ff;
  border: 0px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 0px;
}

</style>
