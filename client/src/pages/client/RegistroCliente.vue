<template>
  <div>
    <div class="row justify-center">
      <img src="RegistroCliente/Mesa de trabajo 2.png" style="width: 100%;height:260px"/>
      <q-btn icon="keyboard_arrow_left" flat round color="white" style="position:absolute;top:5px;left:5px" @click="$router.push('login_cliente')" />
    </div>
    <div class="row justify-center text-h6 text-primary">Registro</div>
    <div class="q-ma-lg">
      <div>
        <q-input class="input-border-new q-pa-xs" label-color="grey-14" v-model="form.full_name" dense label="Nombre completo" borderless
          error-message="ingrese el nombre" :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
        />
      </div>
      <div>
      <div class="row items-center justify-center">
        <q-select borderless v-model="telCode" :options="countries" option-value="name" option-label="name" emit-value map-options
          style="width:120px" class="input-border-new-re" @input="test()"
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
        <q-input v-model="form.phone" class="input-border-new q-pa-sm q-ml-sm" style="width:150px" label="Telefono" dense borderless
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
      <div>
        <p style="text-align:center">Al seleccionar aceptar y continuar, aceptas las condiciones de uso y la política de protección de datos de Hevent </p>
      </div>
    </div>
    <div class="text-center q-ma-sm">
      <q-btn color="primary" class="q-mr-sm button-border" style="width:240px" :loading="loading" type="submit" label="Aceptar y Continuar" @click="agregar">
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
            Cargando...
        </template>
      </q-btn>
    </div>
    <q-separator class="q-mt-xs" size="2px" inset/>
    <div class="text-center text-subtitle2 q-mt-sm">Registrarse con</div>
    <div class="row justify-around q-mr-xl q-ml-xl">
      <!--<GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="google-login-r shadow-3">
        <img src="iconos2/Iconos_Redes.png" style="width: 25px; height: 25px"/>
      </GoogleLogin> -->
      <q-btn  round color="indigo-10" style="width: 40px; height: 40px" @click="logInWithFacebook">
        <img src="iconos2/Iconos_Redes_1.png" style="width: 20px; height: 20px"/>
      </q-btn>
      <!--
      <q-btn class="q-ma-sm" round color="grey" style="width: 40px; height: 40px">
        <img src="iconos2/Iconos_Redes_2.png" style="width: 30px; height: 30px"/>
      </q-btn> -->
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
// import GoogleLogin from 'vue-google-login'
export default {
  components: {
    // GoogleLogin
  },
  data () {
    return {
      params: {
        client_id: '884216182035-jv4iotpbk91ra4b4be7enrhpahgp4oco.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      form: {},
      telCode: '',
      obj: {},
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
      password: '',
      repeatPassword: '',
      isPwd: true,
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
  async mounted () {
    await this.loadFacebookSDK(document, 'script', 'facebook-jssdk')
    await this.initFacebook()
    this.getCountries()
    this.telCode = 'Colombia'
  },
  methods: {
    getCountries () {
      /* this.$api.get('countries').then(res => {
        this.countries = res
        console.log(this.countries, 'countrie')
      }) */
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
        this.form.telCode = this.telCode
        this.$api.post('registrar_cliente', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Registrado Correctamente, ya puedes iniciar sesion',
              color: 'positive'
            })
            console.log('ejecutado o guardado correctamente')
            this.$router.push('/login_cliente')
          }
        })
      }
    },
    async logoutFB () {
      await this.loadFacebookSDK(document, 'script', 'facebook-jssdk')
      await this.initFacebook()
      console.log(window.FB, 'asdasd')
      await window.FB.logout(function (response) {
        // user is now logged out
        console.log(response, 'sresponse')
      })
    },
    async obtenerMailFacebook () {
      var vm = this
      await window.FB.api('/me?fields=id,email,name', function (response) {
        console.log(response.email, 'EMAILLLLL')
        if (response) {
          vm.form.email = response.email
          vm.form.full_name = response.name
          vm.registrarFBGOOGLE()
        }
      })
    },
    async logInWithFacebook () {
      var vm = this
      await window.FB.login(function (response) {
        if (response.authResponse) {
          console.log('You are logged in &amp cookie set!', response)
          vm.form.password = response.authResponse.userID
          vm.obtenerMailFacebook()
        } else {
          this.$q.notify({
            message: 'Hubo un error',
            color: 'negative'
          })
        }
      },
      {
        scope: 'email',
        return_scopes: true
      }
      )
      return false
    },
    async initFacebook () {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '2796504267249031',
          cookie: true,
          xfbml: true,
          version: 'v10.0'
        })
      }
    },
    async loadFacebookSDK (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    },
    onFailure (error) {
      console.log('OH NOES', error)
      this.$q.notify({
        message: 'Ha ocurrido un error',
        color: 'negative'
      })
    },
    onSuccess (googleUser) {
      const profile = googleUser.getBasicProfile() // etc etc
      console.log(profile, 'asdasd')
      this.form.email = profile.Rt
      this.form.password = profile.GS
      this.form.full_name = profile.Ue
      this.registrarFBGOOGLE()
    },
    async registrarFBGOOGLE () {
      this.$q.loading.show()
      await this.$api.post('registrar_cliente', this.form).then(res => {
        if (res) {
          console.log('ejecutado o guardado correctamente')
          this.$router.push('/login_cliente')
        }
      })
      this.$q.loading.hide()
    },
    test () {
      console.log(this.form, 'formmm')
      this.form.telCode = this.telCode
    }
  }
}
</script>

<style>
.input-border-new-re {
  background: #e1f5ff;
  border: 0px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 0px;
}
.google-login-r {
  /* This is where you control how the button looks. Be creative! */
  padding: 8px 8px;
  border-radius: 100%;
  background-color: #ffffff;
  border: 0px solid white;
}
</style>
