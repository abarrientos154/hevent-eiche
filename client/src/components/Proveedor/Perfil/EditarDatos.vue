<template>
  <q-card class="full-width nube-editar-datos q-pb-xl">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>
    <div class="text-h5 text-grey-8 q-mt-xl q-ml-xl text-bold text-grey-7" style="margin-top:120px">Editar Datos</div>
    <q-separator color="grey" inset />
    <div class="text-center text-subtitle1 text-grey-9 q-mt-lg"> * Datos de Acceso *</div>
    <div class="row q-pa-sm q-ml-md q-mr-md">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.username" class="input-border-new q-pa-sm" label="Usuario" borderless dense
          error-message="ingrese un Usuario valido" :error="$v.form.username.$error" @blur="$v.form.username.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="password" class="input-border-new q-pa-sm" borderless label="Contraseña" dense
          error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.password.$error" @blur="$v.password.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="repeatPassword" class="input-border-new q-pa-sm" borderless label="Repita su Contraseña" dense
          error-message="las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()"
        />
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
      <div>
        <div class="row">
          <q-select borderless class="input-border-new q-pa-sm q-pt-sm" v-model="form.telCode" use-input input-debounce="0" :options="countries" @filter="filterFn" style="width: 80px"
            emit-value map-options option-value="name" option-label="name"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin Resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">
              <div class="text-bold q-mt-sm" style="margin-top:12px">{{ scope.opt.dialCode }}</div>
            </template>
          </q-select>
          <q-input v-model="form.telefono" class="input-border-new q-pa-sm q-ml-sm" style="width:200px" label="Telefono" dense borderless
            error-message="ingrese un telefono valido" :error="$v.form.telefono.$error" @blur="$v.form.telefono.$touch()"
          />
        </div>
      </div>
      <div>
        <div class="row">
          <q-select borderless class="input-border-new q-pa-sm q-pt-sm" v-model="form.celCode" use-input input-debounce="0" :options="countries" @filter="filterFn" style="width: 80px"
            emit-value map-options option-value="name" option-label="name"
          >
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
          <q-input v-model="form.celular" class="input-border-new q-pa-sm q-ml-sm" style="width:200px" label="Celular" dense borderless
            error-message="ingrese un celular valido" :error="$v.form.celular.$error" @blur="$v.form.celular.$touch()"
          />
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.ciudad" class="input-border-new q-pa-sm" label="Ciudad" dense borderless
          error-message="ingrese una ciudad valida" :error="$v.form.ciudad.$error" @blur="$v.form.ciudad.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.direccion" class="input-border-new q-pa-sm" label="Dirección" dense borderless
          error-message="ingrese una direccion valida" :error="$v.form.direccion.$error" @blur="$v.form.direccion.$touch()"
        />
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
    <div class="row justify-center q-pa-sm">
      <q-btn class="button-border" style="height:45px; width:150px" color="primary" label="Guardar" @click="save()" />
    </div>
  </q-card>
</template>

<script>
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      cuenta: 'Ahorro',
      password: '',
      countriesOptions: [],
      countries: [],
      tel: null,
      cel: null,
      repeatPassword: ''
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
        numCuenta: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  mounted () {
    this.getCountries()
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$api.get('users_perfil').then(res => {
        this.form = res
        this.cuenta = this.form.tipoCuenta
      })
    },
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
    save () {
      this.$v.$touch()
      console.log(this.$v.form.$error, 'form', this.$v.password.$error, 'passs', this.$v.repeatPassword.$error)
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.form.password = this.password
        this.form.tipoCuenta = this.cuenta
        this.$api.put('editar_datos_proveedor', this.form).then(res => {

        })
      }
    }
  }
}
</script>

<style>
.nube-editar-datos {
  background: url('../../../../public/nube9.png');
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
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
</style>
