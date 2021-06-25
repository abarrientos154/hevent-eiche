<template>
  <div>
    <div class="row justify-center">
      <img src="Pagina52/Mesa de trabajo 2.png" style="width: 100%;height:400px"/>
      <q-btn icon="keyboard_arrow_left" flat round color="white" style="position:absolute;top:5px;left:5px" to="/login_cliente" />
    </div>
    <div class="text-subtitle2 text-center text-primary">Iniciar Sesión</div>
    <div class="q-mt-sm">
      <div>
        <q-input class="input-border-new q-pa-sm q-ml-xl q-mr-xl" label-color="grey-14" type="email" v-model="form.email"
          dense label="Correo electrónico" borderless
        />
      </div>
      <div>
        <q-input class="input-border-new q-pa-sm q-ml-xl q-mr-xl" :type="isPwd ? 'password' : 'text'" v-model="form.password" label="Contraseña" dense label-color="grey-14" borderless>
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-between q-mr-xl q-ml-xl">
     <q-checkbox size="xs" v-model="shape" val="xs" label="Recordar" />
     <label @click="modal = true">¿Olvide contraseña?</label>
    </div>
    <div class="text-center q-ma-sm">
      <q-btn color="primary" class="q-mr-sm button-border" style="width:200px" :loading="loading" @click="onSubmit()" label="Iniciar Sesión">
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
            Cargando...
        </template>
      </q-btn>
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
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="password" v-model="pass" dense label="Introduzca su nueva contrasena" borderless
            :error="$v.pass.$error"
          />
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="password" v-model="repeatPass" dense label="Repita su contrasena" borderless
            :error="$v.repeatPass.$error"
          />
        </div>
        <div class="row justify-center items-center q-ma-lg">
          <q-btn label="Restablecer" color="primary" class="full-width" push @click="restablecerContra()" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { required, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      modalRestablecer: false,
      email: null,
      form: {},
      shape: [],
      modal: false,
      modal2: false,
      password: '',
      repeatPassword: '',
      isPwd: false,
      loading: false,
      pass: null,
      repeatPass: null,
      proveedorId: ''
    }
  },
  validations () {
    return {
      repeatPass: { sameAsPassword: sameAs('pass') },
      pass: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  async mounted () {
    if (this.$route.params.ref) {
      this.pruebaWompi()
    }
    if (this.$route.params.code) {
      await this.verificarCode()
    }
    if (this.$route.params.reFlow) {
      this.verificarFlow()
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async backToPayPlan (id) {
      if (!id) {
        var proveedor = await this.infoProviderByReference()
        console.log(proveedor, 'proveedor')
        id = proveedor._id
      }
      this.$q.dialog({
        title: 'Eleccion de Plan!',
        message: 'Desea volver al modulo de eleccion de planes?'
      }).onOk(() => {
        this.$router.push('/planes_disponibles/' + id)
      })
    },
    async verificarFlow () {
      this.$q.loading.show({
        message: 'Confirmando Transaccion. Por Favor Espere...'
      })
      console.log('verificar flow')
      await this.$api.post('verificar_flow_ref/' + this.$route.params.reFlow).then(res => {
        console.log(res, 'res flow')
        this.$q.loading.hide()
        if (res) {
          if (res.status === 2) {
            this.aprobarProveedor(this.$route.params.reFlow)
          } else {
            this.$q.dialog({
              title: '¡Atención!',
              message: 'Ha ocurrido un error al procesar su pago.'
            }).onOk(() => {
              this.backToPayPlan()
            })
          }
        } else {
          this.$q.dialog({
            title: '¡Atención!',
            message: 'Ha ocurrido un Error'
          }).onOk(() => {
          })
        }
      })
      // this.aprobarProveedor(this.$route.params.reFlow)
    },
    async aprobarProveedor (ref) {
      this.$q.loading.show({
        message: 'Confirmando Transaccion. Por Favor Espere...'
      })
      await this.$api.put('proveedor_aprobado/' + ref).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.$q.notify({
            message: 'Ya puedes Iniciar Sesion, Bienvenido',
            color: 'positive'
          })
        }
      })
    },
    async infoProviderByReference () {
      this.$q.loading.show()
      var res = null
      if (this.$route.params.ref) {
        res = await this.$api.get('get_provider_by_reference/' + this.$route.params.ref)
      } else if (this.$router.params.reFlow) {
        res = await this.$api.get('get_provider_by_reference/' + this.$route.params.reFlow)
      }
      this.$q.loading.hide()
      return res
    },
    async pruebaWompi () {
      this.$q.loading.show({
        message: 'Confirmando Transaccion. Por Favor Espere...'
      })
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.$WKPriv
        }
      }
      await this.$axios.get(env.wompiUrl + `transactions?reference=${this.$route.params.ref}`, config).then(res => {
        this.$q.loading.hide()
        console.log(res, 'ress')
        if (res.data.data.length > 0) {
          console.log(res.data.data[0], 'ressssss')
          if (res.data.data[0].status === 'ERROR') {
            this.$q.dialog({
              title: '¡Atención!',
              message: 'Ocurrio un error con la transaccion, Por Favor contacte con algun administrador'
            }).onOk(() => {
            })
          } else if (res.data.data[0].status === 'APPROVED') {
            this.aprobarProveedor(this.$route.params.ref)
          } else if (res.data.data[0].status === 'DECLINED') {
            this.$q.dialog({
              title: '¡Atención!',
              message: 'Su pago ha sido declinado. Por Favor contacte con algun administrador'
            }).onOk(() => {
              this.backToPayPlan()
            })
          }
        } else {
          this.$q.dialog({
            title: '¡Atención!',
            message: 'Referencia Invalida o No Encontrada. Por Favor contacte con algun administrador'
          }).onOk(() => {
          })
        }
      })
    },
    async restablecerContra () {
      // alert(this.$route.params.code)
      this.$v.$touch()
      if (!this.$v.pass.$error && !this.$v.repeatPass.$error) {
        this.$q.loading.show()
        await this.$api.put('actualizar_pass/' + this.$route.params.code, { password: this.pass }).then(res => {
          this.$q.loading.hide()
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
    async verificarCode () {
      // alert(this.$route.params.code)
      this.$q.loading.show()
      await this.$api.get('code_verification/' + this.$route.params.code).then(res => {
        this.$q.loading.hide()
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
    onSubmit () {
      // this.loading = true
      console.log(this.form, 'form')
      this.$q.loading.show({
        message: 'Iniciando sesión'
      })
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const client = res.HEV_SESSION_INFO.roles.find(value => value === 2)
          console.log(res, 'ressssss', client)
          if (!client) {
            if (res.HEV_SESSION_INFO.status === 0) {
              this.$q.dialog({
                title: '¡Atención!',
                message: 'Su cuenta esta a la espera para aprobar su pago'
              }).onOk(() => {
                this.backToPayPlan(res.HEV_SESSION_INFO.user_id)
              })
            } else if (res.HEV_SESSION_INFO.status === 2) {
              this.$q.dialog({
                title: '¡Atención!',
                message: 'Su cuenta esta a la espera para aprobar su pago por cambio de plan'
              }).onOk(() => {
                this.backToPayPlan(res.HEV_SESSION_INFO.user_id)
              })
            } else if (res.HEV_SESSION_INFO.status === 1) {
              this.login(res)
              this.$router.push('/inicio_proveedor')
            }
          } else {
            this.login(res)
            this.$router.push('/inicio_cliente')
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style scoped>
.nube {
  background: url('../../../public/nube8.png');
  width: 100%;
  height: 220px;
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
.nubeRestablecer {
  background: url('../../../public/nube8.png');
  width: 100%;
  height: 350px;
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
</style>>
