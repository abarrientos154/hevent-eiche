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
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-select v-model="pais" class="input-border-new q-pa-sm" label="Pais" style="height:45px" dense borderless :options="countriesP"
          error-message="el pais es requerido" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" @input="form.country = pais, form.ciudad = null, ciudad = null"
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
          <q-select disable borderless v-model="telCode" :options="countries" option-value="name" option-label="name" emit-value map-options
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
                  <q-img :src="pais !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg'" style="width:30px;height:20px" />
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
          <q-select disable borderless v-model="celCode" :options="countries" option-value="name" option-label="name" emit-value map-options
            style="width:120px" class="input-border-new-re-pro" @input="test()"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
                <q-item-section avatar>
                  <q-img :src="scope.opt.name !== 'cl' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg' " />
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
                  <q-img :src="pais !== 'cl' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg'" style="width:30px;height:20px" />
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
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input disable v-model="form.direccionCad" class="input-border-new q-pa-sm" label="Dirección" dense borderless
          error-message="ingrese una direccion valida" :error="$v.form.direccionCad.$error" @blur="$v.form.direccionCad.$touch()"
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
      <q-btn class="gradiente-buttom" style="height:45px; width:150px" push label="Guardar" @click="save()" />
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
      tel: null,
      cel: null,
      repeatPassword: '',
      pais: null,
      ciudad: null,
      countriesP: [{ label: 'Chile', value: 'cl' }, { label: 'Colombia', value: 'co' }],
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
        },
        {
          label: 'Medellin',
          value: 6,
          paisCode: 'co'
        }
      ],
      telCode: null,
      celCode: null
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
        direccionCad: { required },
        banco: { required },
        numCuenta: { required },
        country: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  mounted () {
    this.getInfo()
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
  methods: {
    test () {
      this.form.telCode = this.telCode
      this.form.celCode = this.celCode
    },
    getInfo () {
      this.$api.get('users_perfil').then(res => {
        this.form = res
        this.pais = this.form.country
        this.cuenta = this.form.tipoCuenta
        this.telCode = this.form.country === 'cl' ? '+56' : '+57'
        this.celCode = this.form.country === 'cl' ? '+56' : '+57'
        this.ciudad = this.form.ciudad
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
    async save () {
      this.form.country = this.pais
      this.$v.$touch()
      console.log(this.$v.form.$error, 'form', this.$v.password.$error, 'passs', this.$v.repeatPassword.$error)
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.form.password = this.password
        this.form.tipoCuenta = this.cuenta
        this.$q.loading.show()
        await this.$api.put('editar_datos_proveedor', this.form).then(res => {
          this.$q.loading.hide()
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
