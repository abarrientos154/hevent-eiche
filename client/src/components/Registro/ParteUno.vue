<template>
  <div class="column">
    <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
      <div class="animated-body row justify-center" v-show="show">
        <img src="400x400/002.png" style="width: 100%;height:260px">
      </div>
    </animation-transition>
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.email" type="email" label="Email" outlined dense
          error-message="ingrese un email valido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="password" label="Contraseña" outlined dense
          error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.password.$error" @blur="$v.password.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="repeatPassword" label="Repita su Contraseña" outlined dense
          error-message="las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()"
        />
      </div>
    </div>
    <div class="row">
      <q-btn @click="$router.push('/login')" color="primary" push label="Ya Tengo Cuenta" flat/>
      <q-space />
      <q-btn @click="next()" color="primary" push label="Siguiente" glossy/>
    </div>
  </div>
</template>

<script>
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import { AnimationVueTransition, AnimationVueTransitionType } from 'vue-animation'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition
  },
  props: ['form', 'panel'],
  data () {
    return {
      repeatPassword: '',
      password: '',
      options_roles: [
        { label: 'Proveedor', value: 3 },
        { label: 'Cliente', value: 2 }
      ],
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        email: { required, email },
        birthdate: { required },
        roles: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    async onSubmit () {
      this.$q.loading.show()
      this.$v.$touch()
      if (!this.$v.$error) {
        await this.$api.post('register', this.form).then(res => {
          if (res) {
            this.$router.go(-1)
            this.$q.notify({
              message: 'Ya formas parte de Hevent, Bienvenido',
              color: 'positive'
            })
          }
        })
      }
      this.$q.loading.hide()
    },
    test () {
      console.log(this.form)
    },
    async next () {
      if (this.panel.panel === 'parte_uno') {
        this.$q.loading.show()
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
}
</script>

<style>

</style>
