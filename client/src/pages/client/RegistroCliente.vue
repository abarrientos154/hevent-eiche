<template>
  <div>
    <div class="row justify-center">
      <img src="RegistroCliente/Mesa de trabajo 2.png" style="width: 100%;height:260px"/>
    </div>
    <div class="row justify-center text-h6 text-primary">Registro</div>
    <div class="q-ma-lg">
      <div>
        <q-input class="input-border-new q-pa-xs" label-color="grey-14" v-model="form.full_name" dense label="Nombre completo" borderless
          error-message="ingrese el nombre" :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
        />
      </div>
      <div>
        <div class="row">
          <q-select borderless class="input-border-new q-pa-xs q-pt-sm" v-model="form.telCode" use-input input-debounce="0" :options="countries" @filter="filterFn" style="width: 80px"
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
          <q-input v-model="form.phone" class="input-border-new q-pa-sm q-ml-sm" style="width:200px" label="Telefono" dense borderless
            error-message="ingrese un telefono valido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"
          />
        </div>
      </div>
      <div>
        <q-input class="input-border-new q-pa-sm" label-color="grey-14" type="email" v-model="form.email" dense label="Correo electrónico" borderless
          error-message="ingrese el email" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"
        />
      </div>
      <div>
        <q-input class="input-border-new q-pa-sm" :type="isPwd ? 'password' : 'text'" v-model="password" label="Contraseña" dense label-color="grey-14" borderless
        error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.password.$error" @blur="$v.password.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input class="input-border-new q-pa-sm" :type="isPwd ? 'password' : 'text'" v-model="repeatPassword" label="Confirmar Contraseña" dense label-color="grey-14" borderless
        error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="text-center q-ma-sm">
      <q-btn color="primary" class="q-mr-sm button-border" style="width:200px" :loading="loading" type="submit" label="Registrarte" @click="agregar">
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
            Cargando...
        </template>
      </q-btn>
    </div>
    <q-separator class="q-mt-xs" size="2px" inset/>
    <div class="text-center text-subtitle2 q-mt-sm">Registrarse con</div>
    <div class="row justify-between q-mr-xl q-ml-xl">
      <q-btn class="q-ma-sm" round color="with" style="width: 40px; height: 40px">
        <img src="icons/Iconos_Redes.png" style="width: 20px; height: 20px"/>
      </q-btn>
      <q-btn class="q-ma-sm" round color="indigo-10" style="width: 40px; height: 40px">
        <img src="icons/Iconos_Redes_1.png" style="width: 30px; height: 30px"/>
      </q-btn>
      <q-btn class="q-ma-sm" round color="grey" style="width: 40px; height: 40px">
        <img src="icons/Iconos_Redes_2.png" style="width: 30px; height: 30px"/>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      countriesOptions: [],
      countries: [],
      password: '',
      repeatPassword: '',
      isPwd: false,
      loading: false
    }
  },
  validations: {
    form: {
      full_name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      phone: { required },
      email: { required, email }
    },
    repeatPassword: { sameAsPassword: sameAs('password') },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) }
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
    },
    agregar () {
      console.log(this.form, 'aaaaaaaaaaaaaaaaaaaaaaaaa')
      this.$v.$touch()
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.form.password = this.password
        this.$api.post('registrar_cliente', this.form).then(res => {
          if (res) {
            console.log('ejecutado o guardado correctamente')
            this.$router.push('/login')
          }
        })
      }
    }
  }
}
</script>

<style>

</style>>
