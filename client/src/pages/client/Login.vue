<template>
  <div>
    <div class="animated-body row justify-center">
      <img src="400x400/002.png" alt="Logo HEvent" style="width: 100%;height:240px">
    </div>
    <div>
      <div class="row justify-center text-h6 text-primary">Iniciar Sesión</div>
      <q-separator class="q-mt-xs" size="2px" inset />
    </div>

    <div class="column q-ma-sm q-gutter-sm">
      <q-input class="input-border" label-color="grey-14" type="email" v-model="form.email" dense label="Correo electrónico" borderless>
        <template v-slot:prepend>
          <q-icon class="q-pa-sm" name="mail" color="primary"></q-icon>
        </template>
      </q-input>
      <q-input class="input-border" :type="isPwd ? 'password' : 'text'" v-model="form.password" label="Contraseña" dense label-color="grey-14" borderless>
        <template v-slot:prepend>
          <q-icon name="vpn_key" color="primary" class="q-pa-sm" />
        </template>
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center">
      <label @click="modal = true">¿Olvide contraseña?</label>
    </div>
    <q-dialog v-model="modal" style="width:100%">
      <q-card style="border-radius:35px" class="nube">
        <div class="row justify-end q-mr-md q-mt-md">
          <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
        </div>
        <div class="q-ma-lg row justify-center">
          <label class="text-h6 q-mb-xs">Restablecer contraseña</label>
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="email" v-model="email" dense label="correo@gmail.com" borderless/>
          <q-btn color="primary" class="q-mr-sm button-border" style="width:200px" type="submit" label="Enviar correo" @click="enviarCorreo()"/>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal2" style="width:100%">
      <q-card style="border-radius:35px" class="nube">
        <div class="row justify-end q-mr-md q-mt-md">
          <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
        </div>
        <div class="q-mr-lg q-ml-lg q-mb-lg row justify-center">
          <label class="text-h6 q-mb-xs">Restablecer contraseña</label>
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="email" v-model="email" dense label="email escrito" borderless/>
          <div class="text-caption text-center q-mr-sm text-grey">Comprueba si has recibido un email con información sobre como restablecer la contraseña</div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalRestablecer" style="width:100%">
      <q-card style="border-radius:35px" class="nubeRestablecer">
        <div class="row justify-end q-mr-md q-mt-md">
          <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
        </div>
        <div class="q-mr-lg q-ml-lg q-mb-lg q-mt-xl row justify-center">
          <label class="text-h6 q-mb-xs">Restablecer contraseña</label>
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="password" v-model="pass" dense label="Introduzca su nueva contrasena" borderless/>
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="password" v-model="repeatPass" dense label="Repita su contrasena" borderless/>
        </div>
        <div class="row justify-center items-center q-ma-lg">
          <q-btn label="Restablecer" color="primary" class="full-width" push @click="restablecerContra()" />
        </div>
      </q-card>
    </q-dialog>
    <!-- <div class="row justify-center q-mt-md">
      <div class="row">
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

        <q-input v-model="form.phone" class="input-border-new q-pa-sm q-ml-sm" style="width:200px" label="Telefono" dense borderless
        error-message="ingrese un telefono valido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
      </div>
    </div>
    <div class="text-center text-caption q-ml-md q-mr-md">Te enviaremos un mensaje para confirmar tu número. Sujeto a las tarifas para mensajes y datos</div> -->
    <div class="row justify-center">
     <q-btn color="primary" class="q-ma-sm button-border" style="width:150px" label="Siguiente" @click="logearse()"/>
    </div>
    <div class=" text-center text-subtitle2 ">Iniciar Sesión con</div>
    <div class="row justify-between q-mr-xl q-ml-xl q-mt-sm q-mb-sm">
      <q-btn  round color="with" style="width: 40px; height: 40px">
        <img src="icons/Iconos_Redes.png" style="width: 20px; height: 20px"/>
      </q-btn>
      <q-btn  round color="indigo-10" style="width: 40px; height: 40px">
        <img src="icons/Iconos_Redes_1.png" style="width: 20px; height: 20px"/>
      </q-btn>
      <q-btn  round color="grey" style="width: 40px; height: 40px">
        <img src="icons/Iconos_Redes_2.png" style="width: 20px; height: 20px"/>
      </q-btn>
      <!--<q-btn  round color="primary" style="width: 40px; height: 40px" to="/verificacion_correo">
        <img src="icons/Iconos_Redes_3.png" style="width: 20px; height: 20px"/>
      </q-btn> -->
      <q-btn  round color="light-blue" style="width: 40px; height: 40px" to="/slider_proveedor">
        <img src="icons/Iconos_Redes_4.png" style="width: 20px; height: 20px"/>
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
import { mapMutations } from 'vuex'
import { required, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: null,
      modalRestablecer: false,
      modal: false,
      modal2: false,
      pass: null,
      repeatPass: null,
      isPwd: true,
      form: {},
      telCode: '',
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
      ]
    }
  },
  validations () {
    return {
      repeatPass: { sameAsPassword: sameAs('pass') },
      pass: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  async mounted () {
    if (this.$route.params.code) {
      await this.verificarCode()
    }
    this.telCode = 'Colombia'
  },
  methods: {
    ...mapMutations('generals', ['login']),
    restablecerContra () {
      this.$v.$touch()
      if (!this.$v.pass.$error && !this.$v.repeatPass.$error) {
        this.$api.put('actualizar_pass/' + this.$route.params.code, { password: this.pass }).then(res => {
          if (res) {
            this.modalRestablecer = false
            this.$q.notify({
              message: 'Contrasena Restablecida con Exito',
              color: 'positive'
            })
          }
        })
      }
    },
    verificarCode () {
      this.$api.get('code_verification/' + this.$route.params.code).then(res => {
        if (res) {
          this.modalRestablecer = true
        } else {
          this.modal2 = false
          this.modal = false
        }
      })
    },
    enviarCorreo () {
      this.$q.loading.show({
        message: 'Espere...'
      })
      this.$api.get('email_send/' + this.email).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.modal = false
          this.modal2 = true
        }
      })
    },
    logearse () {
      this.$q.loading.show({
        message: 'Iniciando sesión'
      })
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const client = res.HEV_SESSION_INFO.roles.find(value => value === 2)
          if (!client) {
            this.login(res)
            this.$router.push('inicio_proveedor')
          } else {
            this.login(res)
            this.$router.push('inicio_cliente')
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
        this.$q.loading.hide()
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
</style>
